import { useMutation } from '@apollo/client';
import { ParsedBlock } from '@src/components/blocks';
import { useContentContext } from '@src/context/content-context';
import { useSiteContext } from '@src/context/site-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { UPDATE_CART_ITEM_QUANTITY } from '@src/lib/graphql/queries';
import { cn } from '@src/lib/helpers/helper';
import { ProductCartItem } from '@src/lib/hooks/cart';

type CartItemInputProps = {
  block: ParsedBlock;
};

export const CartItemInput = ({ block }: CartItemInputProps) => {
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

  if ('CartItemInput' !== blockName || !data) {
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
      <input
        type="number"
        max={cartItem.stockQuantity}
        value={cartItem.qty || ''}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
          const newQuantity = parseInt(e.target.value, 10);
          updateQuantity(cartItem.cartKey, newQuantity);
        }}
        className={cn(
          'w-9 h-10 px-2 text-center border-x border-y-0 outline-none flex items-center justify-center border-gray-200',
          attributes.className
        )}
      />
    );
  }

  return null;
};
