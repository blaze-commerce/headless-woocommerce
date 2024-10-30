import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { BlockAttributes } from '@src/lib/block/types';
import { useSearchContext } from '@src/context/search-context';
import { cn } from '@src/lib/helpers/helper';
import { Content } from '@src/components/blocks/content';
import { NoResultsBoundary } from '@src/components/header/search/no-results-boundary';
import { NoResults } from '@src/components/header/search/no-results';

type SearchHitsContainerProps = {
  block: ParsedBlock;
};

export const SearchHitsContainer = ({ block }: SearchHitsContainerProps) => {
  const attribute = block.attrs as BlockAttributes;

  return (
    <div
      className={cn(
        'flex flex-col overflow-auto h-[calc(100vh-100px)] xl:h-[calc(100vh-200px)] px-6',
        attribute.className
      )}
    >
      <NoResultsBoundary fallback={<NoResults />}>
        <Content content={block.innerBlocks} />
      </NoResultsBoundary>
    </div>
  );
};
