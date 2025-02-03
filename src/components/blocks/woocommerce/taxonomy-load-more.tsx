import { LoadMoreButton } from '@src/components/category/load-more-button';
import { useContentContext } from '@src/context/content-context';
import { ITSTaxonomyProductQueryVars } from '@src/lib/typesense/types';
import { ParsedBlock } from '@src/components/blocks';
import { isEmpty } from 'lodash';

export const TaxonomyLoadMore = ({ block }: { block: ParsedBlock }) => {
  const { data } = useContentContext();
  const { loading, queryState } = data;
  const pageInfo = data?.data?.pageInfo;
  const [, setTsQueryVars] = queryState;

  const loadMoreItems = () => {
    setTsQueryVars((prevProps: ITSTaxonomyProductQueryVars) => {
      if (pageInfo.nextPage) {
        const newProps: ITSTaxonomyProductQueryVars = {
          ...prevProps,
          page: pageInfo.nextPage,
          appendProducts: true,
        };

        return newProps;
      }

      return prevProps;
    });
  };

  const shoulShowLoadMore = !isEmpty(pageInfo) && pageInfo.nextPage > 0;

  if (shoulShowLoadMore && !loading) {
    return (
      <LoadMoreButton
        className={block.attrs.className}
        loadMoreItems={loadMoreItems}
      />
    );
  }

  return null;
};
