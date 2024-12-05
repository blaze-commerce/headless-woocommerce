import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import { DefaultProductCard } from '@src/features/product/cards/default';
import { RecentlyViewed } from '@src/features/product/recently-viewed';
import { transformProductsForDisplay } from '@src/lib/helpers/product';

import { useFetchRecentlyViewedProducts } from '@src/lib/hooks';
import { useFetchTopRecommendedProductsForCartItems } from '@src/lib/hooks/top-recommendation';
import React from 'react';

type Props = {};

export const Recommendation = (props: Props) => {
  const { data: recentlyViewedProducts, loading: fetchingRecentlyViewedProducts } =
    useFetchRecentlyViewedProducts();

  const { data: recommendedProducts, loading: fetchingRecommendedProducts } =
    useFetchTopRecommendedProductsForCartItems();

  let recommendationLabel = 'Recently viewed items';
  let productsToShow = recentlyViewedProducts;

  if (!fetchingRecommendedProducts && recommendedProducts.length > 0) {
    recommendationLabel = 'Top Recommendations';
    productsToShow = recommendedProducts;
  }

  if (productsToShow.length <= 0) {
    return null;
  }

  return (
    <div className="px-4 sm:px-6">
      <p className="text-black/80 text-base font-bold font-secondary leading-normal border-b border-border pb-3 mb-6">
        {recommendationLabel}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {transformProductsForDisplay(productsToShow).map((product, index: number) => (
          <>
            <DefaultProductCard
              key={index}
              product={product}
              showRating={true}
              showWishlistButton={true}
              saleBadgeColor="#393939"
              saleBadgeType={4}
              showCategory={true}
              hasAddToCart={false}
            />
          </>
        ))}
      </div>
    </div>
  );
};
