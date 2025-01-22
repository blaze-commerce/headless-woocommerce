import { ParsedBlock } from '@src/components/blocks';
import { CartItem } from '@src/components/blocks/woocommerce/product-collection/product-template/cart-item';
import { useContentContext } from '@src/context/content-context';
import { ProductCartItem } from '@src/lib/hooks/cart';

type CartItemsProductTemplateProps = {
  block: ParsedBlock;
};

export const CartItemsProductTemplate = ({ block }: CartItemsProductTemplateProps) => {
  const { type, data } = useContentContext();
  if ('woocommerce/product-template' !== block.blockName || !data) {
    return null;
  }

  if ('product-cart-items' === type) {
    const cartItems = data as ProductCartItem[];
    if (cartItems.length === 0) {
      return null;
    }

    return cartItems.map((cartItem, index: number) => (
      <CartItem
        key={index}
        cartItem={cartItem}
        block={block}
      />
    ));
  }

  //@TODO Handle the default product collection
  return <div>cart items product template not implemented</div>;
};
