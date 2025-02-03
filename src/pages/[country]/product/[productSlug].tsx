import { Dictionary } from '@reduxjs/toolkit';
import { isEmpty, keyBy } from 'lodash';
import type { GetStaticPropsContext } from 'next';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import SINGLEPRODUCT_TEMPLATE from '@public/single-product.json';
import Head from 'next/head';

import { cn } from '@src/lib/helpers/helper';
import { singleProductLayout } from '@src/components/layouts/single-product';
import { NotFound } from '@src/components/not-found';
import { PageSeo } from '@src/components/page-seo';
import { Content } from '@src/components/blocks/content';
import { ProductContextProvider } from '@src/context/product-context';
import { getProductReviews, getProductStats } from '@src/lib/reviews/yotpo';
import { SiteInfo } from '@src/lib/typesense/site-info';
import { Country, getDefaultRegion } from '@src/lib/helpers/country';
import { Product as ProductModel, ProductTypesenseResponse } from '@src/models/product';
import { ProductReviews } from '@src/models/product/reviews';
import { ProductDialogs } from '@src/models/product/types';
import { ProductPaths, ProductPathsParams } from '@src/types';
import { getProductsByIds } from '@src/lib/typesense/product';
import { SkeletonProductPage } from '@src/components/skeletons/product-page';
import { parseJsonValue } from '@src/lib/helpers/helper';
import { MainContentWrapper } from '@src/components/content/main-content-wrapper';

type Props = {
  getLayout?: () => void;
  product: ProductTypesenseResponse;
  additionalData: {
    dialogs: ProductDialogs;
    attributeDisplayType: Dictionary<string>;
    review: Dictionary<string | boolean>;
    descriptionAfterContent?: string;
  };
  linkedProducts: {
    crossSellProducts: ProductModel[];
    relatedProducts: ProductModel[];
    upsellProducts: ProductModel[];
  };
  customer: ProductReviews;
};

export const getStaticPaths: GetStaticPaths<ProductPathsParams<string>> = async () => {
  if (
    process.env.SKIP_BUILD_STATIC_GENERATION == 'true' ||
    process.env.NEXT_PUBLIC_MAINTENANCE == 'true'
  ) {
    return {
      paths: [],
      fallback: true,
    };
  }
  let paths: ProductPaths<string>[] = [];
  if (process.env.NODE_ENV !== 'development') {
    const products = await ProductModel.findAll();
    const defaultRegion = getDefaultRegion();
    const countries = [defaultRegion?.baseCountry || Country.Australia.code];

    countries.forEach((country) => {
      const countryProductPaths: ProductPaths<string>[] = products?.map((product) => {
        return {
          params: {
            productSlug: product.slug as string,
            country,
          },
        };
      });

      paths = paths.concat(countryProductPaths);
    });
  }

  return {
    fallback: true,
    paths,
  };
};

export const getProductStaticProps = async (slug: string) => {
  const product = await ProductModel.findOneRaw({ slug });
  if (isEmpty(product)) {
    return {
      props: {
        product: null,
      },
    };
  }

  const siteInfoData = await SiteInfo.findMultiple([
    'attribute_display_type',
    'product_page_information_1',
    'product_page_information_2',
    'product_page_information_3',
    'hide_review_tab',
    'description_after_content',
    'judgeme_settings',
  ]);

  const keyedSiteInfoData = keyBy(siteInfoData, 'name');

  const information_1 = parseJsonValue(keyedSiteInfoData?.product_page_information_1?.value);
  const information_2 = parseJsonValue(keyedSiteInfoData?.product_page_information_2?.value);
  const information_3 = parseJsonValue(keyedSiteInfoData?.product_page_information_3?.value);
  const description_after_content = keyedSiteInfoData?.description_after_content?.value as String;
  const judgeme_settings = parseJsonValue(keyedSiteInfoData?.judgeme_settings?.value);

  const additionalData = {
    dialogs: [
      {
        title: information_1.title ? information_1.title : 'Returns',
        icon: information_1.icon ? information_1.icon : '',
        content: information_1.content ? information_1.content : '',
        link: information_1.link ? information_1.link : '',
      },
      {
        title: information_2.title ? information_2.title : 'Privacy Policy',
        icon: information_2.icon ? information_2.icon : '',
        content: information_2.content ? information_2.content : '',
        link: information_2.link ? information_2.link : '',
      },
      {
        title: information_3.title ? information_3.title : 'Warranty',
        icon: information_3.icon ? information_3.icon : '',
        content: information_3.content ? information_3.content : '',
        link: information_3.link ? information_3.link : '',
      },
    ],
    attributeDisplayType: JSON.parse(keyedSiteInfoData?.attribute_display_type?.value),
    review: {
      hideReviewTab: keyedSiteInfoData?.hide_review_tab?.value === 'true',
    },
    descriptionAfterContent: description_after_content ? description_after_content : '',
    judgme: judgeme_settings,
  };

  let customer = {};
  if (product.id) {
    customer = {
      reviews: await getProductReviews(product.id),
      stats: await getProductStats(product.id),
    };
  }

  const crossSellProducts = await getProductsByIds(product.crossSellProducts);
  const relatedProducts = await getProductsByIds(product.relatedProducts);
  const upsellProducts = await getProductsByIds(product.upsellProducts);

  const props = {
    product,
    additionalData,
    customer,
    linkedProducts: {
      crossSellProducts,
      relatedProducts,
      upsellProducts,
    },
  };

  return {
    props,
    revalidate: 43200, // Refresh the generated page every 12 hours,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  return getProductStaticProps(params?.productSlug as string);
};

export const ProductPage = (props: Props) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback && isEmpty(props)) {
    return (
      <MainContentWrapper>
        <SkeletonProductPage />
      </MainContentWrapper>
    );
  }

  if (isEmpty(props.product)) {
    return <NotFound />;
  }

  const product = ProductModel.buildFromResponse(props.product);

  return (
    <ProductContextProvider
      product={product}
      additionalData={props.additionalData}
      customer={props.customer}
      linkedProducts={props.linkedProducts}
      key={product.id}
    >
      {product.seoFullHead ? (
        <PageSeo seoFullHead={product.seoFullHead} />
      ) : (
        <Head>
          <title>{product.name}</title>
          <meta
            name="description"
            content={product.description}
          />
        </Head>
      )}
      <main
        className={cn('single-product container mx-auto p-4', {
          'out-of-stock': product.isOutOfStock,
          'simple-product': product.productType === 'simple',
          'variation-product': product.hasVariations,
          'bundle-product': product.hasBundle,
          'composite-product': product.isComposite,
          'has-addons': product.hasAddons(),
          'featured-product': product.isFeatured,
        })}
      >
        <Content content={SINGLEPRODUCT_TEMPLATE} />
      </main>
    </ProductContextProvider>
  );
};

ProductPage.getLayout = singleProductLayout;

export default ProductPage;
