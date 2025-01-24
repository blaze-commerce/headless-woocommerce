import { ParsedBlock } from '@src/components/blocks';
import { getBlockName } from '@src/lib/block';
import { Content } from '@src/components/blocks/content';
import { BlockAttributes } from '@src/lib/block/types';
import { useContentContext } from '@src/context/content-context';
import { useWishListStorage } from '@src/lib/hooks';

type NoWishlistContainerProps = {
  block: ParsedBlock;
};

export const NoWishlistContainer = ({ block }: NoWishlistContainerProps) => {
  const { type } = useContentContext();
  const { getWishList } = useWishListStorage();
  const blockName = getBlockName(block);
  if ('NoWishlistContainer' !== blockName && block.innerBlocks) {
    return null;
  }
  const wishList = getWishList();
  const hasWishlist = Object.keys(wishList).map(Number).length > 0 ? true : false;
  if (hasWishlist) {
    return null;
  }
  const attributes = block.attrs as BlockAttributes;

  return (
    <div className={attributes.className}>
      <Content
        type={type}
        content={block.innerBlocks}
      />
    </div>
  );
};
