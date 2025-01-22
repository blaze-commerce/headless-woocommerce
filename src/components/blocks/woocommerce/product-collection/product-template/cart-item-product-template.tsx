import { ParsedBlock } from '@src/components/blocks';
import { CartItem } from '@src/components/blocks/woocommerce/product-collection/product-template/cart-item';
import { useContentContext } from '@src/context/content-context';
import { ProductCartItem } from '@src/lib/hooks/cart';

type CartItemProductTemplateProps = {
  block: ParsedBlock;
};

export const CartItemProductTemplate = ({ block }: CartItemProductTemplateProps) => {
  const { type, data } = useContentContext();
  if ('woocommerce/product-template' !== block.blockName || !data) {
    return null;
  }

  if ('product-cart-item' === type) {
    const cartItem = data as ProductCartItem;
    return (
      <CartItem
        cartItem={cartItem}
        block={block}
      />
    );
  }

  //@TODO Handle the default product collection
  return <div>cart item product template not implemented</div>;
};
