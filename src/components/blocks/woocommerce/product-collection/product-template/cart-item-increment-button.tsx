import { useMutation } from '@apollo/client';
import { ParsedBlock } from '@src/components/blocks';
import { CartItemGlobalProps } from '@src/components/blocks/woocommerce/product-collection/product-template/cart-item';
import { useContentContext } from '@src/context/content-context';
import { useSiteContext } from '@src/context/site-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { UPDATE_CART_ITEM_QUANTITY } from '@src/lib/graphql/queries';
import { cn } from '@src/lib/helpers/helper';
import { ProductCartItem } from '@src/lib/hooks/cart';

type CartItemIncrementButtonProps = {
  block: ParsedBlock;
};

export const CartItemIncrementButton = ({ block }: CartItemIncrementButtonProps) => {
  const { type, data } = useContentContext();
  const blockName = getBlockName(block);

  if ('CartItemIncrementButton' !== blockName || !data) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;

  if ('product-cart-item' === type) {
    const { cartItem, updateCartItemQuantity, loading } = data as CartItemGlobalProps;

    if (loading) {
      return <div className="flex items-center justify-center text-xl w-9 h-10 bg-gray-300"></div>;
    }

    return (
      <button
        className={cn(
          'minicart-item-control decrement cursor-pointer flex items-center justify-center text-xl w-9 h-10',
          attributes.className
        )}
        onClick={() => {
          const quantity = parseInt(cartItem.qty);
          const newQuantity = quantity + 1;
          updateCartItemQuantity(cartItem.cartKey, newQuantity);
        }}
      >
        +
      </button>
    );
  }

  return null;
};
