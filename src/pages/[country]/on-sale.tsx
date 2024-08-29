import { ParsedUrlQuery } from 'querystring';

import { GetStaticProps } from 'next';

import { TaxonomyItemPage } from '@src/components/content/taxonomy-item-page';
import { defaultLayout } from '@src/components/layouts/default';
import { SiteInfo } from '@src/lib/typesense/site-info';
import { Country } from '@src/lib/helpers/country';
import { RegionalData } from '@src/types';
import { meta } from '@src/lib/constants/meta';
import { parseJsonValue } from '@src/lib/helpers/helper';
import TSTaxonomy, { getProducts } from '@src/lib/typesense/taxonomy';
import { ITSTaxonomyProductQueryVars } from '@src/lib/typesense/types';
import { getPageBySlug } from '@src/lib/typesense/page';

interface Props {
  country: string;
}

interface Params extends ParsedUrlQuery {
  country: string;
}

TaxonomyItemPage.getLayout = defaultLayout;

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
  const regionsRequest = await SiteInfo.find('currencies');
  let currencies: RegionalData[];
  try {
    currencies = JSON.parse(regionsRequest?.value as string);
  } catch (error) {
    currencies = [];
  }
  const countries = currencies.map((currency) => currency.baseCountry) || [Country.Australia.code];

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
  const defaultSortBy = TSTaxonomy.sortOptions()[0];
  const pageData = await getPageBySlug('shop');
  const defaultQueryVars: ITSTaxonomyProductQueryVars = TSTaxonomy.getDefaultTsQueryVars();
  const taxonomyProductQueryVars: ITSTaxonomyProductQueryVars = {
    ...defaultQueryVars,
    sortBy: defaultSortBy?.value as string,
    onSale: 'true',
  };

  const tsFetchedData = await getProducts(taxonomyProductQueryVars);

  const title = 'Sale';

  const filterOptionContent = await SiteInfo.find('product_filters_content');
  const contents = parseJsonValue(filterOptionContent?.value as string);

  const categoriesSiteInfo = await SiteInfo.find('category_page_default_banner');
  const defaultBanner = parseJsonValue(categoriesSiteInfo?.value as string);

  return {
    props: {
      country,
      fullHead: meta(title),
      categoryName: title,
      popular: [],
      hero: {
        name: title,
        sourceUrl: pageData?.thumbnail?.src || defaultBanner?.url || '',
      },
      tsFetchedData: tsFetchedData || null,
      defaultSortBy,
      contents,
    },
    revalidate: 43200, // Refresh the generated page every 12 hours,
  };
};
