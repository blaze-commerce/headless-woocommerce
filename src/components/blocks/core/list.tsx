import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { Content } from '@src/components/blocks/content';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';

type ListProps = {
  block: ParsedBlock;
};

export const List = ({ block }: ListProps) => {
  if ('core/list' !== block.blockName && !block.innerBlocks[0]) {
    return null;
  }

  const attribute = block.attrs as BlockAttributes;
  return (
    <ul
      className={cn(
        `_${attribute.uniqueId} list-inside`,
        attribute.ordered ? 'list-decimal ' : 'list-disc',
        attribute.className
      )}
    >
      <Content content={block.innerBlocks} />
    </ul>
  );
};
