import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

import { WishListHeader } from '@src/features/wish-list/wish-list-header';
import { DefaultProductCard as ProductCard } from '@src/features/product/cards/default';
import { ProductGrid } from '@src/features/product/grids/product-grid';
import { SkeletonProductCard } from '@src/components/skeletons/product-card';
import { useSiteContext } from '@src/context/site-context';
import { useUserContext } from '@src/context/user-context';
import { Shop } from '@src/models/settings/shop';
import { useFetchWishList, useWishListStorage } from '@src/lib/hooks';
import { transformProductsForDisplay } from '@src/lib/helpers/product';

export const WishListItems = () => {
  const { settings } = useSiteContext();
  const { layout, options } = settings?.shop as Shop;
  const { isLoggedIn } = useUserContext();
  const { getWishList } = useWishListStorage();

  const wishList = getWishList();
  const [wishListProductIds, setWishlistProductIds] = useState<number[]>([]);

  const { loading, data } = useFetchWishList(wishListProductIds);

  useEffect(() => {
    const pids: number[] = Object.keys(wishList).map(Number);
    setWishlistProductIds(pids);
  }, []);

  if (isEmpty(wishListProductIds)) {
    return (
      <section className="">
        <p className="text-center my-3">Your wishlist is currently empty.</p>
      </section>
    );
  }

  if (loading) {
    const cardCount = wishListProductIds.length;
    return (
      <section className="">
        <ProductGrid
          productColumns={'2'}
          className="gap-x-10"
        >
          {[...new Array(cardCount)].map((_cc, index) => {
            return <SkeletonProductCard key={index} />;
          })}
        </ProductGrid>
      </section>
    );
  }

  return (
    <>
      {!isLoggedIn && <WishListHeader />}
      <section className="my-2">
        <ProductGrid productColumns="2">
          {transformProductsForDisplay(data).map((product, i) => {
            return (
              <ProductCard
                classNames="wishlist-item"
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
    </>
  );
};
