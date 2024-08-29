import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { Content } from '@src/components/blocks/content';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';

type GridProps = {
  block: ParsedBlock;
};

export const Grid = ({ block }: GridProps) => {
  // we just make sure that the block name is correct and innterblocks is not empty otherwise
  if ('generateblocks/grid' !== block.blockName && !block.innerBlocks) {
    return null;
  }

  const attribute = block.attrs as BlockAttributes;

  return (
    <div className={cn('flex flex-wrap', `_${attribute.uniqueId}`, attribute.className)}>
      <Content content={block.innerBlocks} />
    </div>
  );
};
