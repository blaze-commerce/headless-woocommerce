import { ResultCount } from '@src/components/category/filter/result-count';
import { useContentContext } from '@src/context/content-context';

export const TaxonomyResultsCount = () => {
  const { data } = useContentContext();

  return (
    <ResultCount
      pageNo={data?.data?.pageInfo?.page}
      productCount={data?.data?.pageInfo?.totalFound}
    />
  );
};
