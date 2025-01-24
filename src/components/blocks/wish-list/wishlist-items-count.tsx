import { ParsedBlock } from '@src/components/blocks';
import { getBlockName } from '@src/lib/block';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { useWishListStorage } from '@src/lib/hooks';
type WishlistItemsCountProps = {
  block: ParsedBlock;
};
export const WishlistItemsCount = ({ block }: WishlistItemsCountProps) => {
  const blockName = getBlockName(block);
  const { getWishList } = useWishListStorage();
  const wishList = getWishList();
  if ('WishlistItemsCount' !== blockName) {
    return null;
  }

  const wishlisItemCount = Object.keys(wishList).map(Number).length || 0;
  const theContent: string = block.innerHTML;
  const content = theContent.replace('{{wishlisItemCount}}', String(wishlisItemCount));

  return <ReactHTMLParser html={content} />;
};
