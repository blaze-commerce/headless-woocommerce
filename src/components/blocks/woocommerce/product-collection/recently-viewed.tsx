import { ParsedBlock } from '@src/components/blocks';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';

type RecentlyViewedProductCollectionProps = {
  block: ParsedBlock;
};

export const RecentlyViewedProductCollection = ({
  block,
}: RecentlyViewedProductCollectionProps) => {
  const blockName = getBlockName(block);
  if ('RecentlyViewedProducts' !== blockName) {
    return null;
  }
  const attributes = block.attrs as BlockAttributes;
  return (
    <div className={attributes.className}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>
  );
};
