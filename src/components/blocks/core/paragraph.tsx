import { ParsedBlock } from '@src/components/blocks';
import { SearchTerm } from '@src/components/blocks/search/search-term';
import { CartItemsCount } from '@src/components/blocks/woocommerce/mini-cart/cart-items-count';
import { WishlistItemsCount } from '@src/components/blocks/wish-list/wishlist-items-count';
import { WooCommerceProductReviewCountTemplate } from '@src/components/blocks/woocommerce/product-collection/product-template/product-review-count';
import { getBlockName } from '@src/lib/block';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import React from 'react';
import { CartDiscountTotal } from '@src/components/blocks/woocommerce/mini-cart/cart-discount-total';
import { CartSubTotal } from '@src/components/blocks/woocommerce/mini-cart/cart-subtotal';

type ParagraphProps = {
  block: ParsedBlock;
};

const placeHolderBlocks = {
  SearchTerm: SearchTerm,
  CartItemsCount: CartItemsCount,
  WishlistItemsCount: WishlistItemsCount,
  ProductReviewsCount: WooCommerceProductReviewCountTemplate,
  CartDiscountTotal: CartDiscountTotal,
  CartSubTotal: CartSubTotal,
};

export const Paragraph = ({ block }: ParagraphProps) => {
  if ('core/paragraph' !== block.blockName && !block.innerBlocks[0]) {
    return null;
  }

  const blockName = getBlockName(block);
  const GutenbergBlock = placeHolderBlocks[blockName as keyof typeof placeHolderBlocks];
  if (GutenbergBlock || typeof GutenbergBlock !== 'undefined') {
    return <GutenbergBlock block={block as ParsedBlock} />;
  }

  const theContent: string = block.innerHTML;

  //change shortcodes variables
  const content = theContent.replace('{{current_year}}', String(new Date().getFullYear()));

  return <ReactHTMLParser html={content} />;
};
