import { ParsedBlock } from '@src/components/blocks';
import React from 'react';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { getBlockName } from '@src/lib/block';
import { getSvgContent } from '@src/components/blocks/outermost/IconBlock';
import { useContentContext } from '@src/context/content-context';
import { CartItemGlobalProps } from '@src/components/blocks/woocommerce/product-collection/product-template/cart-item';
type RemoveCartItemButtonProps = {
  block: ParsedBlock;
};
export const RemoveCartItemButton = ({ block }: RemoveCartItemButtonProps) => {
  const { type, data } = useContentContext();

  const blockName = getBlockName(block);
  if ('RemoveCartItem' !== blockName || 'product-cart-item' !== type || !data) {
    return null;
  }

  const { cartItem, removeCartItem } = data as CartItemGlobalProps;
  const svgContent = getSvgContent(block.innerHTML);

  return (
    <button
      type="button"
      className="btn-remove-item-from-cart"
      onClick={() => removeCartItem(cartItem.cartKey)}
    >
      <ReactHTMLParser html={svgContent} />
    </button>
  );
};
