import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { useFetchRecentlyViewedProducts } from '@src/lib/hooks';

type RecentlyViewedProductCollectionProps = {
  block: ParsedBlock;
};

export const RecentlyViewedProductCollection = ({
  block,
}: RecentlyViewedProductCollectionProps) => {
  const { data: recentlyViewedProducts, loading: fetchingRecentlyViewedProducts } =
    useFetchRecentlyViewedProducts();

  const blockName = getBlockName(block);
  if (
    'RecentlyViewedProducts' !== blockName ||
    fetchingRecentlyViewedProducts ||
    !recentlyViewedProducts ||
    recentlyViewedProducts.length === 0
  ) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;
  return (
    <div className={attributes.className}>
      <Content
        type="products"
        globalData={recentlyViewedProducts}
        content={block.innerBlocks}
      />
    </div>
  );
};
