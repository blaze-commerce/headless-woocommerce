import { useMutation } from '@apollo/client';
import { ParsedBlock } from '@src/components/blocks';
import { useContentContext } from '@src/context/content-context';
import { useSiteContext } from '@src/context/site-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { UPDATE_CART_ITEM_QUANTITY } from '@src/lib/graphql/queries';
import { cn } from '@src/lib/helpers/helper';
import { ProductCartItem } from '@src/lib/hooks/cart';

type CartItemDecrementButtonProps = {
  block: ParsedBlock;
};

export const CartItemDecrementButton = ({ block }: CartItemDecrementButtonProps) => {
  const { type, data } = useContentContext();
  const { setCartUpdating, fetchCart } = useSiteContext();

  const blockName = getBlockName(block);

  const [updateCartQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY, {
    onCompleted: () => {
      // Update cart data in React Context.
      fetchCart();
      setCartUpdating(false);
    },
  });

  if ('CartItemDecrementButton' !== blockName || !data) {
    return null;
  }

  const updateQuantity = (key: string, value: number) => {
    updateCartQuantity({
      variables: {
        input: {
          items: [
            {
              key: key,
              quantity: value,
            },
          ],
        },
      },
    });
  };

  const attributes = block.attrs as BlockAttributes;

  if ('product-cart-item' === type) {
    const cartItem = data as ProductCartItem;
    return (
      <button
        className={cn(
          'minicart-item-control decrement cursor-pointer flex items-center justify-center text-xl w-9 h-[45px]',
          attributes.className
        )}
        onClick={() => {
          const quantity = parseInt(cartItem.qty);
          if (quantity > 1) {
            const newQuantity = quantity - 1;
            updateQuantity(cartItem.cartKey, newQuantity);
          }
        }}
      >
        -
      </button>
    );
  }

  return null;
};
