import getCurrencySymbol from 'currency-symbol-map';
import HTMLReactParser from 'html-react-parser';
import { isEmpty } from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { AddToCartForm } from '@src/features/product/add-to-cart-form';
import { BreadCrumbs } from '@src/features/product/breadcrumbs';
import { YouMayAlsoLike } from '@src/features/product/you-may-also-like';

import { ProductPrice } from '@src/features/product/product-price';
import { ProductGallery } from '@src/features/product/product-gallery';
import { ProductDialogs } from '@src/features/product/product-dialogs';
import { ProductSaleBadge } from '@src/features/product/product-sale-badge';
import { ProductBrand } from '@src/features/product/product-brand';
import { ProductSideTabs } from '@src/features/product/product-side-tabs';
import { ProductTitle } from '@src/features/product/product-title';
import { ProductCategories } from '@src/features/product/product-categories';
import { ProductSKU } from '@src/features/product/product-sku';
import { ProductStockStatus } from '@src/features/product/product-stock-status';
import { ProductNotifyMe } from '@src/features/product/product-notify-me';
import { CompositeComponents } from '@src/features/product/composite';
import { GiftCardForm } from '@src/features/product/gift-card/gift-card-form';
import { Variant } from '@src/features/product/variant';
import { PageSeo } from '@src/components/page-seo';
import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import { ProductShortDescription } from '@src/features/product/product-short-description';
import { ProductTaxonomy } from '@src/models/product/types';
import { Settings } from '@src/models/settings';
import { Store } from '@src/models/settings/store';
import { formatTextWithNewline } from '@src/lib/helpers/helper';
import {
  generatePreviousBreadcrumbs,
  generateProductBreadcrumbs,
} from '@src/lib/helpers/breadcrumb';
import { FrequentlyBoughtTogether } from '@src/features/product/frequently-bougth-together';
('@src/models/product');
import { AfterPay } from '@src/features/product/afterpay';
import { Divider } from '@src/components/common/divider';

const BusinessReviewsBundle = dynamic(
  () =>
    import('@src/features/product/reviews/business-reviews-bundle/index').then(
      (mod) => mod.BusinessReviewsBundle
    ) as Promise<React.ComponentType>
);

const ProductTabs = dynamic(() =>
  import('@src/features/product/product-tabs').then((mod) => mod.ProductTabs)
);

const RecentlyViewed = dynamic(() =>
  import('@src/features/product/recently-viewed').then((mod) => mod.RecentlyViewed)
);

export const Product = () => {
  const {
    product,
    actions: { loadCompositeComponents, onAttributeSelect, setHasLoaded },
    additionalData,
  } = useProductContext();
  const { settings, currentCurrency } = useSiteContext();
  const { query } = useRouter();

  const { store } = settings as Settings;

  let taxonomyData: ProductTaxonomy | null = null;

  if (query?.category) {
    taxonomyData = generatePreviousBreadcrumbs(
      product?.taxonomies as ProductTaxonomy[],
      query?.category as string
    ) as ProductTaxonomy;
  }

  if (isEmpty(taxonomyData)) {
    taxonomyData = generateProductBreadcrumbs(
      product?.taxonomies as ProductTaxonomy[]
    ) as ProductTaxonomy;
  }

  useEffect(() => {
    loadCompositeComponents();
    setTimeout(() => {
      setHasLoaded();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (product?.isGiftCard) {
      const currencySymbol = getCurrencySymbol(currentCurrency);
      const priceHtml = `${currencySymbol}${product?.price?.[currentCurrency]}`;

      onAttributeSelect('attribute_gift-card-amount', priceHtml);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!product) return null;

  const { breadcrumb = '/' } = store as Store;

  return (
    <>
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

      <div className="basis-full md:px-4">
        <BreadCrumbs
          className="flex mt-6 mb-10"
          separator={breadcrumb}
          crumbs={(taxonomyData as ProductTaxonomy)?.breadcrumbs}
          productName={product?.name}
        />
      </div>
      <ProductGallery />
      <div className="lg:basis-6/12 2xl:basis-[43%] lg:mb-20 w-full md:px-4 md:py-6">
        <div className="rounded border px-4 py-6 border-[#F3EADE] space-y-4">
          <ProductTitle />
          <ProductBrand />
          {/* Review Stars */}
          {/* <div className="flex flex-row items-start space-x-10 my-2">
            <ProductRatingCount />
            {product?.metaData?.productLabel && !settings?.isAdditionalWarningMessageEnabled && (
              <div className="single-product-label">{renderProductLabel()}</div>
            )}
          </div> */}
          {/* Product Price */}
          <div className="flex flex-row items-center space-x-2">
            <ProductSaleBadge />
            <ProductPrice />
          </div>
          {/* In Stock */}
          <ProductStockStatus />
          <Divider />
          <ProductNotifyMe />
          <ProductShortDescription />
          {/* <BundleInfo /> */}
          {/* Variants */}
          <Variant />
          <CompositeComponents />
          <GiftCardForm />
          {/* Quantity And Add to cart button */}
          <AddToCartForm />
          {/* Categories */}
          <ProductCategories />
          {/* SKU */}
          <ProductSKU />
          {additionalData?.descriptionAfterContent && (
            <div className="mb-4 border-b pb-4">
              {HTMLReactParser(formatTextWithNewline(additionalData.descriptionAfterContent))}
            </div>
          )}
          <Divider />
          <ProductDialogs />
          <ProductSideTabs />
          <Divider />
          <AfterPay />
        </div>
      </div>
      <div className="w-full md:px-4 space-y-12">
        <ProductTabs />
        {/* 
        <Content content={PRODUCT_DATA} />
        <FrequentlyBoughtTogether />
         */}
        <BusinessReviewsBundle />
        <YouMayAlsoLike />
        <RecentlyViewed />
      </div>
    </>
  );
};
