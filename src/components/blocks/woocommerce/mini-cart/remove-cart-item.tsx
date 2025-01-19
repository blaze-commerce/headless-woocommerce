import { useSiteContext } from '@src/context/site-context';
import { HamburgerIcon } from '@src/components/svg/hamburger';
import { BlockComponentProps, ParsedBlock } from '@src/components/blocks';
import { find } from 'lodash';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import React from 'react';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { getBlockName } from '@src/lib/block';
import { getSvgContent } from '@src/components/blocks/outermost/IconBlock';
import { REMOVE_CART_ITEM } from '@src/lib/graphql/queries';
import { useMutation } from '@apollo/client';
import { track } from '@src/lib/track';
import { useContentContext } from '@src/context/content-context';
import { ProductCartItem } from '@src/lib/hooks/cart';
type RemoveCartItemButtonProps = {
  block: ParsedBlock;
};
export const RemoveCartItemButton = ({ block }: RemoveCartItemButtonProps) => {
  const { type, data } = useContentContext();

  const { setCartUpdating, fetchCart } = useSiteContext();

  const cartItem = data as ProductCartItem;
  const [
    removeItemFromCart,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    { data: actionResponse, loading: isRemoving, error: removingCartError },
  ] = useMutation(REMOVE_CART_ITEM, {
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

  const blockName = getBlockName(block);
  if ('RemoveCartItem' !== blockName || 'product-cart-item' !== type || !data) {
    return null;
  }

  const svgContent = getSvgContent(block.innerHTML);

  return (
    <button
      type="button"
      className="btn-remove-item-from-cart"
      onClick={() =>
        removeItemFromCart({
          variables: { cartKey: cartItem.cartKey },
        })
      }
    >
      <ReactHTMLParser html={svgContent} />
    </button>
  );
};
