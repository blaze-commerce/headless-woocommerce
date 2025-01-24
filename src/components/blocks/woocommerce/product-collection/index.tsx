import { ParsedBlock } from '@src/components/blocks';
import { CartItemsProductCollection } from '@src/components/blocks/woocommerce/product-collection/cart-items';
import { CartItemsProductRecommendation } from '@src/components/blocks/woocommerce/product-collection/cart-items-product-recommendation';
import { RealWooCommerceProductCollection } from '@src/components/blocks/woocommerce/product-collection/real-product-collection';
import { RecentlyViewedProductCollection } from '@src/components/blocks/woocommerce/product-collection/recently-viewed';
import { WishlistProductCollection } from '@src/components/blocks/woocommerce/product-collection/wishlist';
import { getBlockName } from '@src/lib/block';

export const productCollectionPlaceHolderBlocks = {
  RecentlyViewedProducts: RecentlyViewedProductCollection,
  WishlistProducts: WishlistProductCollection,
  CartItems: CartItemsProductCollection,
  CartItemsProductRecommendation: CartItemsProductRecommendation,
};

export const WooCommerceProductCollection = ({ block }: { block: ParsedBlock }) => {
  if ('woocommerce/product-collection' !== block.blockName) {
    return null;
  }

  const blockName = getBlockName(block);
  const GutenbergBlock =
    productCollectionPlaceHolderBlocks[
      blockName as keyof typeof productCollectionPlaceHolderBlocks
    ];

  if (GutenbergBlock || typeof GutenbergBlock !== 'undefined') {
    return <GutenbergBlock block={block as ParsedBlock} />;
  }

  // We need this to avoid undefined error in the real component
  if (typeof block.componentProps === 'undefined') {
    return null;
  }

  return <RealWooCommerceProductCollection block={block} />;
};
