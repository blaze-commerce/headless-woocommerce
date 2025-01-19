import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { useWishListStorage } from '@src/lib/hooks';
import { useFetchProducts } from '@src/lib/hooks/product';

type WishlistProductCollectionProps = {
  block: ParsedBlock;
};

export const WishlistProductCollection = ({ block }: WishlistProductCollectionProps) => {
  const { getWishList } = useWishListStorage();
  const wishList = getWishList();

  const { loading, data } = useFetchProducts(Object.keys(wishList).map(Number));

  const blockName = getBlockName(block);
  if ('WishlistProducts' !== blockName || loading || !data || data.length === 0) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;
  return (
    <div className={attributes.className}>
      <Content
        type="products"
        globalData={data}
        content={block.innerBlocks}
      />
    </div>
  );
};
