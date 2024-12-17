import { Dictionary } from '@reduxjs/toolkit';
import { reduce } from 'lodash';
import { GetStaticProps } from 'next';

import { TaxonomyItemPage } from '@src/components/content/taxonomy-item-page';
import { defaultLayout } from '@src/components/layouts/default';
import { SiteInfo } from '@src/lib/typesense/site-info';
import { generatePathsByCountry } from '@src/lib/helpers';
import { Country } from '@src/lib/helpers/country';
import { RegionalData, TaxonomyPaths } from '@src/types';
import { TaxonomyPathsParams } from '@src/lib/types/taxonomy';
import TSTaxonomy, { getProducts, getTaxonomyPopularProducts } from '@src/lib/typesense/taxonomy';
import { ITSTaxonomyProductQueryVars, MetaData } from '@src/lib/typesense/types';

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
  const slugPaths = await TSTaxonomy.buildStaticPathParams(1);

  const paths = generatePathsByCountry<TaxonomyPaths>(countries, slugPaths);

  return {
    paths,
    fallback: process.env.NODE_ENV === 'development',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const params = context.params!;
  const { country } = params;
  const { taxonomyItemSlug } = params as TaxonomyPathsParams['params'];

  const taxonomyData = await TSTaxonomy.getPageData(
    'product_brand',
    taxonomyItemSlug[taxonomyItemSlug.length - 1]
  );

  const metaDatas = reduce<MetaData, Dictionary<string>>(
    taxonomyData?.metaData || [],
    (previousObject, currentObject) => {
      previousObject[currentObject.name] = currentObject.value;

      return previousObject;
    },
    {}
  );

  const defaultSortBy = TSTaxonomy.sortOptions()[1];

  const defaultQueryVars = TSTaxonomy.getDefaultTsQueryVars();
  const taxonomyProductQueryVars: ITSTaxonomyProductQueryVars = {
    ...defaultQueryVars,
    // taxonomySlug: wpTaxSlug,
    sortBy: defaultSortBy?.value as string,
    termSlug: taxonomyItemSlug[taxonomyItemSlug.length - 1],
  };

  const tsFetchedData = await getProducts(taxonomyProductQueryVars);

  const popularProducts = await getTaxonomyPopularProducts(
    'product_brand',
    taxonomyItemSlug[taxonomyItemSlug.length - 1]
  );

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
      taxonomyDescription: taxonomyData?.description ?? '',
      fullHead: taxonomyData?.seoFullHead ?? '',
      categoryName: taxonomyData?.name ?? '',
      popular: popularProducts ?? [],
      hero: {
        sourceUrl: taxonomyData?.bannerThumbnail || taxonomyData?.thumbnail?.src || '',
        name: taxonomyData?.name ?? '',
        subtitle: metaDatas?.subtitle ?? null,
      },
      tsFetchedData: tsFetchedData || null,
      taxonomyData,
      defaultSortBy,
      contents,
    },
    revalidate: 43200, // Refresh the generated page every 12 hours,
  };
};
