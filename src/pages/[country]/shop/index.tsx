import { ParsedUrlQuery } from 'querystring';
import siteData from '@public/site.json';

import { GetStaticProps } from 'next';

import { TaxonomyItemPage } from '@src/components/content/shop';
import { shopLayout } from '@src/components/layouts/shop';
import { SiteInfo } from '@src/lib/typesense/site-info';
import { getAllBaseContries } from '@src/lib/helpers/country';
import TSTaxonomy, { getProducts } from '@src/lib/typesense/taxonomy';
import { ITSTaxonomyProductQueryVars } from '@src/lib/typesense/types';
import { getPageBySlug } from '@src/lib/typesense/page';
import { meta } from '@src/lib/constants/meta';

interface Props {
  country: string;
}

interface Params extends ParsedUrlQuery {
  country: string;
}

TaxonomyItemPage.getLayout = shopLayout;

export default TaxonomyItemPage;

export const getStaticPaths = async () => {
  if (
    process.env.SKIP_BUILD_STATIC_GENERATION == 'true' ||
    process.env.NEXT_PUBLIC_MAINTENANCE == 'true'
  ) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const countries = getAllBaseContries();
  const paths = countries.map((country) => ({
    params: {
      country,
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
  const pageData = await getPageBySlug(siteData.shopPageSlug);
  const defaultQueryVars: ITSTaxonomyProductQueryVars = TSTaxonomy.getDefaultTsQueryVars();

  const tsFetchedData = await getProducts(defaultQueryVars);

  const filterOptionContent = await SiteInfo.find('product_filters_content');
  let contents;
  try {
    contents = JSON.parse(filterOptionContent?.value as string);
  } catch (e) {
    contents = [];
  }
  return {
    props: {
      country,
      fullHead: pageData?.seoFullHead || meta('Shop'),
      categoryName: pageData?.name || null,
      popular: [],
      hero: {
        name: pageData?.name || null,
        sourceUrl: pageData?.thumbnail?.src || '',
      },
      tsFetchedData: tsFetchedData ?? null,
      contents,
      searchQuery: '*',
    },
    revalidate: 43200, // Refresh the generated page every 12 hours,
  };
};
