import { GetServerSideProps } from 'next';

import { TaxonomyItemPage } from '@src/components/content/taxonomy-item-page';
import { defaultLayout } from '@src/components/layouts/taxonomy';
import { SiteInfo } from '@src/lib/typesense/site-info';
import { parseJsonValue } from '@src/lib/helpers/helper';
import TSTaxonomy, { getProducts } from '@src/lib/typesense/taxonomy';
import { ITSTaxonomyProductQueryVars } from '@src/lib/typesense/types';

export default TaxonomyItemPage;
TaxonomyItemPage.getLayout = defaultLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const searchQuery = query.s as string;
  const country = query.country as string;

  if (!searchQuery) {
    return {
      redirect: {
        destination: '/shop',
        permanent: true,
      },
    };
  }

  const defaultSortBy = TSTaxonomy.sortOptions()[0];
  const defaultQueryVars = TSTaxonomy.getDefaultTsQueryVars();
  const taxonomyProductQueryVars: ITSTaxonomyProductQueryVars = {
    ...defaultQueryVars,
    sortBy: defaultSortBy?.value as string,
    searchQuery: searchQuery,
  };

  const tsFetchedData = await getProducts(taxonomyProductQueryVars);

  const filterOptionContent = await SiteInfo.find('product_filters_content');
  const contents = parseJsonValue(filterOptionContent?.value as string);

  return {
    props: {
      country,
      fullHead: '',
      categoryName: 'Search Results',
      tsFetchedData: tsFetchedData ?? null,
      searchQuery: searchQuery ?? null,
      defaultSortBy,
      hero: {
        name: `Search Results for: ${searchQuery}`,
      },
      contents,
    },
  };
};
