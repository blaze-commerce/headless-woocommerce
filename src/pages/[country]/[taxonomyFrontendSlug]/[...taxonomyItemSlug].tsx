import { Dictionary } from '@reduxjs/toolkit';
import { isArray, isEmpty, merge, reduce } from 'lodash';
import { GetStaticProps } from 'next';

import { TaxonomyItemPage } from '@src/components/content/taxonomy-item-page';
import { defaultLayout } from '@src/components/layouts/taxonomy';
import { SiteInfo } from '@src/lib/typesense/site-info';
import { generatePathsByCountry, getPageParams } from '@src/lib/helpers';
import { Country, getDefaultRegion } from '@src/lib/helpers/country';
import { TaxonomyPaths } from '@src/types';
import { getCanonicalHref, parseJsonValue, updateCanonicalLink } from '@src/lib/helpers/helper';
import { TaxonomyPathsParams } from '@src/lib/types/taxonomy';
import TSTaxonomy, {
  buildStaticPathParams,
  getDefaultSortBy,
  getProducts,
  getSubTaxonomies,
  getTaxonomyPopularProducts,
} from '@src/lib/typesense/taxonomy';
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

  const defaultRegion = getDefaultRegion();
  const countries = [defaultRegion?.baseCountry || Country.Australia.code];

  const slugPaths = await buildStaticPathParams(1);

  const paths = generatePathsByCountry<TaxonomyPaths>(countries, slugPaths);

  return {
    paths,
    // fallback: process.env.NODE_ENV == 'development',
    fallback: true,
  };
};

export const getTaxonomyItemPageProps = async (
  taxonomyFrontendSlug: string,
  taxonomyItemSlug: string | string[],
  country: string
) => {
  const pageParams = isArray(taxonomyItemSlug) ? getPageParams(taxonomyItemSlug) : null;

  let page = 1;
  let termSlug = taxonomyItemSlug[taxonomyItemSlug.length - 1];
  if (pageParams) {
    page = pageParams;
    termSlug = taxonomyItemSlug[taxonomyItemSlug.length - 3];
  }

  if (!isArray(taxonomyItemSlug)) {
    termSlug = taxonomyItemSlug;
  }

  const wpTaxSlug = TSTaxonomy.taxonomyUrlSlugToWpTaxonomySlug(taxonomyFrontendSlug);
  const taxonomyData = await TSTaxonomy.getPageData(wpTaxSlug, termSlug);

  let seoFullHead = taxonomyData?.seoFullHead ? taxonomyData.seoFullHead : '';
  const currentCanonicalHref = getCanonicalHref(seoFullHead);

  if (pageParams && currentCanonicalHref) {
    seoFullHead = updateCanonicalLink(seoFullHead, `${currentCanonicalHref}page/${pageParams}/`);
  }

  const metaDatas = reduce<MetaData, Dictionary<string>>(
    taxonomyData?.metaData || [],
    (previousObject, currentObject) => {
      previousObject[currentObject.name] = currentObject.value;

      return previousObject;
    },
    {}
  );

  const defaultSortBy = getDefaultSortBy();

  const defaultQueryVars = TSTaxonomy.getDefaultTsQueryVars();
  const taxonomyProductQueryVars: ITSTaxonomyProductQueryVars = {
    ...defaultQueryVars,
    // taxonomySlug: wpTaxSlug,
    sortBy: defaultSortBy?.value as string,
    termSlug: termSlug,
    page,
  };

  const tsFetchedData = await getProducts(taxonomyProductQueryVars);
  const tsTaxonomiesData = await getSubTaxonomies(taxonomyProductQueryVars.termSlug as string);
  const popularProducts = await getTaxonomyPopularProducts(wpTaxSlug, termSlug);

  const filterOptionContent = await SiteInfo.find('product_filters_content');
  const contents = parseJsonValue(filterOptionContent?.value as string);

  const categoriesSiteInfo = await SiteInfo.find('category_page_default_banner');
  const defaultBanner = parseJsonValue(categoriesSiteInfo?.value as string);

  return {
    props: {
      country,
      taxonomyDescription: taxonomyData?.description ?? '',
      fullHead: seoFullHead,
      categoryName: taxonomyData?.name ?? '',
      popular: popularProducts ?? [],
      hero: {
        sourceUrl:
          taxonomyData?.bannerThumbnail || taxonomyData?.thumbnail?.src || defaultBanner?.url || '',
        name: taxonomyData?.name ?? '',
        subtitle: metaDatas?.subtitle ?? null,
      },
      tsFetchedData: tsFetchedData || null,
      subCategories: tsTaxonomiesData || null,
      taxonomyData,
      defaultSortBy,
      contents,
    },
    revalidate: 43200, // Refresh the generated page every 12 hours,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const params = context.params!;
  const { country } = params;
  const { taxonomyFrontendSlug, taxonomyItemSlug } = params as TaxonomyPathsParams['params'];

  const data = await getTaxonomyItemPageProps(
    taxonomyFrontendSlug,
    taxonomyItemSlug,
    country as string
  );

  if (isEmpty(data.props.taxonomyData)) {
    return {
      notFound: true,
    };
  }

  return data;
};
