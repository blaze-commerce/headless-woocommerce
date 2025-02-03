import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { RealWooCommerceProductCollectionQueryResponse } from '@src/components/blocks/woocommerce/product-collection/real-product-collection';
import { useContentContext } from '@src/context/content-context';
import { useSiteContext } from '@src/context/site-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { transformProductsForDisplay } from '@src/lib/helpers/product';
import { ProductCartItem } from '@src/lib/hooks/cart';
import { Product } from '@src/models/product';

type ProductGridProps = {
  block: ParsedBlock;
};

export const ProductGrid = ({ block }: ProductGridProps) => {
  const { type, data } = useContentContext();
  const blockName = getBlockName(block);
  if ('ProductGrid' !== blockName || !data) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;

  if ('products' === type || 'products-query-response' === type) {
    const products: Product[] =
      type === 'products'
        ? (data as Product[])
        : (data as RealWooCommerceProductCollectionQueryResponse).products;

    const productsForDisplay = transformProductsForDisplay(products);

    return (
      <div className={attributes.className}>
        {productsForDisplay.map((product, index: number) => (
          <Content
            key={`${product.id}-${index}`}
            type="product"
            globalData={product}
            content={block.innerBlocks}
          />
        ))}
      </div>
    );
  }

  if ('product-cart-items' === type) {
    const cartItems = data as ProductCartItem[];
    if (cartItems.length === 0) {
      return null;
    }

    return (
      <div className={attributes.className}>
        {cartItems.map((cartItem, index: number) => (
          <Content
            key={`${cartItem.cartKey}-${index}`}
            type="product-cart-item"
            globalData={cartItem}
            content={block.innerBlocks}
          />
        ))}
      </div>
    );
  }

  return null;
};
