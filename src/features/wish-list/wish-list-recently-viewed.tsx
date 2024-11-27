import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

import { DefaultProductCard as ProductCard } from '@src/features/product/cards/default';
import { ProductGrid } from '@src/features/product/grids/product-grid';
import { SkeletonProductCard } from '@src/components/skeletons/product-card';
import { useSiteContext } from '@src/context/site-context';
import { ProductSettings } from '@src/models/settings/product';
import { Shop } from '@src/models/settings/shop';
import { useFetchRecentlyViewed } from '@src/lib/hooks';
import { getRecentlyViewedProductArr } from '@src/lib/helpers/recently-viewed';
import { transformProductsForDisplay } from '@src/lib/helpers/product';

export const WishListRecentlyViewed = () => {
  const { settings } = useSiteContext();
  const { features } = settings?.product as ProductSettings;
  const { layout, options } = settings?.shop as Shop;
  const { recentlyViewed } = features;
  const [recentIds, setRecentIds] = useState<number[]>([]);

  const { loading, data } = useFetchRecentlyViewed(recentIds);

  useEffect(() => {
    setRecentIds(getRecentlyViewedProductArr());
  }, []);

  if (loading) {
    const cardCount = recentlyViewed.showNumProducts;

    return (
      <section className="mt-7 animate-pulse">
        <div className="h-11 w-80 bg-gray-300 rounded-md mb-2" />
        <ProductGrid
          className="gap-x-10"
          productColumns={'2'}
        >
          {[...new Array(cardCount)].map((_cc, index) => {
            return <SkeletonProductCard key={index} />;
          })}
        </ProductGrid>
      </section>
    );
  }

  // if no data is found then we will not render any element
  if (isEmpty(data)) {
    return <p></p>;
  }

  return (
    <div>
      <h2 className="text-base font-semibold border-y-1 border-y py-3 my-5 md:my-10">
        RECENTLY VIEWED ITEMS
      </h2>
      <section className="">
        <ProductGrid
          productColumns={'2'}
          className="gap-x-10 gap-y-10"
        >
          {transformProductsForDisplay(data).map((product, i) => {
            return (
              <ProductCard
                classNames="wishlist-recently-viewed-item"
                key={i}
                showRating={true}
                product={product}
                {...layout?.productCards}
                hasAddToCart={options.showAddToCartButton}
              />
            );
          })}
        </ProductGrid>
      </section>
    </div>
  );
};
