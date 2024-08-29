import { ParsedUrlQuery } from 'querystring';

import cleanDeep from 'clean-deep';
import { find, get } from 'lodash';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import regionSettings from '@public/region.json';
import siteSettings from '@public/site.json';
import { ContentBlocks } from '@src/components/content-blocks';
import { PageSeo } from '@src/components/page-seo';
import { defaultLayout } from '@src/components/layouts/default';
import { HomeContextProvider } from '@src/context/home-context';
import { getLatestReviews } from '@src/lib/reviews/yotpo';
import { Page, PageTypesenseResponse } from '@src/lib/typesense/page';
import { SiteInfo } from '@src/lib/typesense/site-info';
import { Country, getDefaultCountry } from '@src/lib/helpers/country';
import { Product, ProductTypesenseResponse } from '@src/models/product';
import type { NextPageWithLayout } from '@src/pages/_app';
import { ContentBlock, RegionalData } from '@src/types';
import { splitStringToArray } from '@src/lib/helpers/helper';
import { YotpoReviews } from '@src/lib/types/reviews';
import { sortedProducts } from '@src/lib/helpers/product';

interface Props {
  country: string;
  contents: ContentBlock[];
  baseCountry: string;
  featuredProducts?: ProductTypesenseResponse[];
  otherProducts?: ProductTypesenseResponse[];
  title?: string;
  seoFullHead?: string;
  homepageReviews?: YotpoReviews[];
  blogPosts: PageTypesenseResponse[];
}

interface Params extends ParsedUrlQuery {
  country: string;
}

export const getStaticPaths = async () => {
  const multicurrencyData = await SiteInfo.find('currencies');
  let parsedMulticurrencyData;
  try {
    parsedMulticurrencyData = JSON.parse(multicurrencyData?.value as string);
  } catch (error) {
    parsedMulticurrencyData = undefined;
  }
  const currencies: RegionalData[] = parsedMulticurrencyData || [
    {
      countries: [Country.Australia.code],
      baseCountry: Country.Australia.code,
      currency: Country.Australia.currency,
    },
  ];

  const paths = currencies.map((currency) => ({
    params: {
      country: currency.baseCountry,
    },
  }));

  return {
    paths,
    fallback: process.env.NODE_ENV === 'development',
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const params = context.params!;
  const { country } = params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contents: any = siteSettings.homepageLayout;

  const textBlock = find(contents, ['blockId', 'text']);
  const baseCountry = textBlock?.metaData
    ? Object.keys(textBlock?.metaData)?.[0]
    : getDefaultCountry();

  let featuredProducts: ProductTypesenseResponse[] = [];
  const featuredProductsConfig = find(contents, ['blockId', 'products']);
  if (featuredProductsConfig) {
    const productIds = splitStringToArray(
      featuredProductsConfig.metaData[baseCountry as string].productId,
      featuredProductsConfig.metaData[country]?.productId
    );

    featuredProducts = sortedProducts(
      (await Product.findMultipleBy(
        'productId',
        productIds as number[]
      )) as ProductTypesenseResponse[],
      productIds as number[]
    );
  }

  let otherProducts: ProductTypesenseResponse[] = [];
  const otherProductsConfig = find(contents, ['blockId', 'otherProducts']);
  if (otherProductsConfig) {
    const productIds = splitStringToArray(
      otherProductsConfig.metaData[baseCountry as string].productId,
      otherProductsConfig.metaData[country]?.productId
    );

    otherProducts = sortedProducts(
      (await Product.findMultipleBy(
        'productId',
        productIds as number[]
      )) as ProductTypesenseResponse[],
      productIds as number[]
    );
  }

  let customerReviews: YotpoReviews[] = [];
  const customerReviewsConfig = find(contents, ['blockId', 'customerReviews']);
  if (customerReviewsConfig) {
    const reviewProductIds = splitStringToArray(
      customerReviewsConfig.metaData[baseCountry as string].productId,
      customerReviewsConfig.metaData[country].productId
    );

    customerReviews = await getLatestReviews(reviewProductIds as number[]);
  }

  const shopName = process.env.NEXT_PUBLIC_SHOP_NAME as string;

  const homePageSeoFullHead = await SiteInfo.find('homepage_seo_fullhead');

  const title = shopName ? `Home - ${shopName}` : 'Home';

  const blogPosts = await Page.find(20);

  return {
    props: {
      country,
      contents,
      featuredProducts: cleanDeep(featuredProducts) as ProductTypesenseResponse[],
      otherProducts: cleanDeep(otherProducts) as ProductTypesenseResponse[],
      baseCountry: baseCountry as string,
      title,
      seoFullHead: homePageSeoFullHead?.value || '',
      homepageReviews: customerReviews,
      blogPosts,
    },
    revalidate: 43200, // Refresh the generated page every 12 hours,
  };
};

const Home: NextPageWithLayout<Props> = ({
  contents,
  featuredProducts,
  otherProducts,
  baseCountry,
  title,
  seoFullHead,
  homepageReviews,
  blogPosts,
}) => {
  const renderSeo = () => {
    if (!seoFullHead)
      return (
        <Head>
          <title>{title}</title>
          <meta
            name="description"
            content="Generated by create next app"
          />
        </Head>
      );

    return <PageSeo seoFullHead={seoFullHead} />;
  };

  return (
    <>
      {renderSeo()}
      <HomeContextProvider
        homepageReviews={homepageReviews}
        blogPosts={blogPosts}
      >
        <ContentBlocks
          blocks={contents}
          baseCountry={baseCountry}
          featuredProducts={featuredProducts}
          otherProducts={otherProducts}
        />
      </HomeContextProvider>
    </>
  );
};

Home.getLayout = defaultLayout;

export default Home;
