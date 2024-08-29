import { ParsedUrlQuery } from 'querystring';

import { GetStaticProps } from 'next';

import { TaxonomyMainPage } from '@src/components/content/taxonomy-main-page';
import { defaultLayout } from '@src/components/layouts/default';
import { SiteInfo } from '@src/lib/typesense/site-info';
import { Country } from '@src/lib/helpers/country';
import { RegionalData } from '@src/types';
import { meta } from '@src/lib/constants/meta';
import TSTaxonomy from '@src/lib/typesense/taxonomy';
import { getPageBySlug } from '@src/lib/typesense/page';

interface Props {
  country: string;
}

interface Params extends ParsedUrlQuery {
  country: string;
}

TaxonomyMainPage.getLayout = defaultLayout;

export default TaxonomyMainPage;

export const getStaticPaths = async () => {
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

  const taxonomies = await TSTaxonomy.getTaxonomiesPageData(1, 'brand');

  const pageData = await getPageBySlug('brands');

  return {
    props: {
      country,
      taxonomies,
      hero: {
        name: pageData?.name || null,
        sourceUrl: pageData?.thumbnail?.src || '',
      },
      fullHead: pageData?.seoFullHead || meta('Brands'),
    },
    revalidate: 43200, // Refresh the generated page every 12 hours,
  };
};
