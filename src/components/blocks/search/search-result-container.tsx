import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { BlockAttributes } from '@src/lib/block/types';
import { useSearchContext } from '@src/context/search-context';
import { cn } from '@src/lib/helpers/helper';
import { Content } from '@src/components/blocks/content';

type SearchResultContainerProps = {
  block: ParsedBlock;
};

export const SearchResultContainer = ({ block }: SearchResultContainerProps) => {
  const { shouldRenderSearchResult } = useSearchContext();

  const attribute = block.attrs as BlockAttributes;

  if (!shouldRenderSearchResult) {
    return null;
  }

  return (
    <div
      className={cn(
        ' rounded-xl mt-2 w-screen max-w-[1465px] absolute md:-right-1 z-20 shadow-lg border left-0  bg-white',
        attribute.className
      )}
    >
      <Content content={block.innerBlocks} />
    </div>
  );
};
