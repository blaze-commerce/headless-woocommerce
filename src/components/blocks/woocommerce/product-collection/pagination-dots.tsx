import { ParsedBlock } from '@src/components/blocks';
import { getSvgContent } from '@src/components/blocks/outermost/IconBlock';
import { RealWooCommerceProductCollectionQueryResponse } from '@src/components/blocks/woocommerce/product-collection/real-product-collection';
import { Spinner } from '@src/components/svg/spinner';
import { useContentContext } from '@src/context/content-context';
import { getBlockByName, getBlockName } from '@src/lib/block';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { BlockAttributes } from '@src/lib/block/types';
import { ITSTaxonomyProductQueryVars } from '@src/lib/typesense/types';

export const ProductCollectionPaginationDots = ({ block }: { block: ParsedBlock }) => {
  const MAX_DOTS = 4;
  const { type, data } = useContentContext();
  const blockName = getBlockName(block);
  if (
    'PaginationDots' !== blockName ||
    typeof data === 'undefined' ||
    'products-query-response' !== type
  ) {
    return null;
  }

  const attribute = block.attrs as BlockAttributes;
  const activeDot = getBlockByName(block.innerBlocks, 'ActiveDot');
  const inActiveDot = getBlockByName(block.innerBlocks, 'InactiveDot');

  const queryResponse = data as RealWooCommerceProductCollectionQueryResponse;
  const {
    loading,
    queryState: [queryVars, setQueryVars],
    data: queryData,
  } = queryResponse;

  const dotsCount = Math.min(queryData?.pageInfo?.totalPages ?? 0, MAX_DOTS);

  // Since there is no active and inactive dot then no need to show anything
  if (!activeDot || !inActiveDot) {
    return null;
  }

  const handlePagination = (page: number) => {
    setQueryVars((prev: ITSTaxonomyProductQueryVars) => {
      return {
        ...prev,
        page: page,
      };
    });
  };

  return (
    <div className={attribute.className}>
      {loading && <Spinner className="w-4 m-0" />}

      {Array.from({ length: dotsCount }, (_, i) => {
        const pageNumber = i + 1;

        return (
          <button
            key={pageNumber}
            onClick={() => handlePagination(pageNumber)}
          >
            <ReactHTMLParser
              html={getSvgContent(
                pageNumber == queryVars.page ? activeDot.innerHTML : inActiveDot.innerHTML
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
