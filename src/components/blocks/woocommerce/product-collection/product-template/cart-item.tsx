/* eslint-disable no-unused-vars */
import { useMutation } from '@apollo/client';
import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { useSiteContext } from '@src/context/site-context';
import { BlockAttributes } from '@src/lib/block/types';
import { REMOVE_CART_ITEM, UPDATE_CART_ITEM_QUANTITY } from '@src/lib/graphql/queries';
import { cn } from '@src/lib/helpers/helper';
import { ProductCartItem } from '@src/lib/hooks/cart';
import { track } from '@src/lib/track';

type CartItemProps = {
  cartItem: ProductCartItem;
  block: ParsedBlock;
};

export type CartItemGlobalProps = {
  cartItem: ProductCartItem;
  loading: boolean;
  updateCartItemQuantity: (key: string, value: number) => void;
  removeCartItem: (cartKey: string) => void;
};

export const CartItem = ({ cartItem, block }: CartItemProps) => {
  const { fetchingCart } = useSiteContext();

  const attributes = block.attrs as BlockAttributes;

  const isCartItemTypeComposite = cartItem.cartItemType === 'CompositeCartItem';
  const productType = cartItem.type.toLowerCase();
  const isSimple = productType === 'simple';

  const isCompositeChildren = isSimple && isCartItemTypeComposite;

  const { setCartUpdating, fetchCart } = useSiteContext();
  const [updateCartQuantity, { loading }] = useMutation(UPDATE_CART_ITEM_QUANTITY, {
    onCompleted: () => {
      // Update cart data in React Context.
      fetchCart();
      setCartUpdating(false);
    },
  });

  const [removeItemFromCart, { loading: isRemoving }] = useMutation(REMOVE_CART_ITEM, {
    variables: {
      cartKey: cartItem.cartKey,
    },
    onCompleted: () => {
      track.removeFromCart(cartItem);
      // Update cart data in React Context.
      fetchCart();
      setCartUpdating(false);
    },
    onError: (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error?.graphQLErrors?.[0]?.message ?? '');
      }
    },
  });

  const isLoading = loading || isRemoving || fetchingCart;

  const updateCartItemQuantity = (key: string, value: number) => {
    setCartUpdating(true);
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

  const removeCartItem = (cartKey: string) => {
    setCartUpdating(true);
    removeItemFromCart({
      variables: { cartKey: cartKey },
    });
  };

  return (
    <div
      key={cartItem.productId}
      className={cn(
        'flex w-full items-start py-[22px]',
        {
          '-mt-5 flex-wrap': isCompositeChildren,
          'animate-pulse': isLoading,
        },
        attributes.className
      )}
    >
      <Content
        type="product-cart-item"
        globalData={{
          cartItem,
          loading: isLoading,
          updateCartItemQuantity,
          removeCartItem,
        }}
        content={block.innerBlocks}
      />
    </div>
  );
};
