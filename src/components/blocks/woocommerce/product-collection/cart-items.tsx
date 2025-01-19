import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { useSiteContext } from '@src/context/site-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';

type CartItemsProductCollectionProps = {
  block: ParsedBlock;
};

export const CartItemsProductCollection = ({ block }: CartItemsProductCollectionProps) => {
  const { cart } = useSiteContext();
  const blockName = getBlockName(block);
  if ('CartItems' !== blockName || !cart) {
    return null;
  }

  const hasCartItems = cart !== null && cart?.products?.length > 0 ? true : false;

  if (!hasCartItems) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;
  return (
    <div className={attributes.className}>
      <Content
        type="product-cart-items"
        globalData={cart.products}
        content={block.innerBlocks}
      />
    </div>
  );
};
