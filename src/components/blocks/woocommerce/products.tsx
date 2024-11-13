import { ParsedBlock } from '@src/components/blocks';
import { useProductsWidgetContext } from '@src/context/products-widget';
import { useSiteContext } from '@src/context/site-context';
import { DefaultProductCard } from '@src/features/product/cards/default';
import { ProductGrid } from '@src/features/product/grids/product-grid';
import { BlockAttributes } from '@src/lib/block/types';
import { transformProductsForDisplay } from '@src/lib/helpers/product';
import { Settings } from '@src/models/settings';
import { Header } from '@src/models/settings/header';
import { Shop } from '@src/models/settings/shop';
import React from 'react';

type Props = {
  block: ParsedBlock;
};

export const Products = (props: Props) => {
  const { settings } = useSiteContext();
  const { shop, header } = settings as Settings;

  const { layout } = shop as Shop;
  const { productCards, productFilters, productColumns = '3' } = layout;
  const { wishlist } = (header as Header).options;

  const { products } = useProductsWidgetContext();
  const attribute = props.block.attrs as BlockAttributes;
  if (products.length <= 0) {
    return <p>No products found</p>;
  }

  return (
    <div className={attribute.className}>
      <ProductGrid productColumns="4">
        {transformProductsForDisplay(products).map((product, index: number) => (
          <DefaultProductCard
            key={index}
            product={product}
            productFilters={productFilters}
            productColumns={productColumns}
            showWishlistButton={wishlist?.enabled}
            {...productCards}
            hasAddToCart={productCards?.hasAddToCart}
          />
        ))}
      </ProductGrid>
    </div>
  );
};
