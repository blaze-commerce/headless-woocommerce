import { DefaultProductCard } from '@src/features/product/cards/default';
import { transformProductsForDisplay } from '@src/lib/helpers/product';

import { useFetchRecentlyViewedProducts } from '@src/lib/hooks';
import { useFetchTopRecommendedProductsForCartItems } from '@src/lib/hooks/top-recommendation';
import { Product } from '@src/models/product';
import React from 'react';

type Props = {};
const RecommendationDisplay = ({ label, products }: { label: string; products: Product[] }) => {
  if (products.length <= 0) {
    return null;
  }

  return (
    <div className="px-0">
      <p className="text-black/80 text-base font-bold font-secondary leading-normal border-y border-border py-3 mb-6">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {transformProductsForDisplay(products)
          .slice(-2)
          .map((product, index: number) => (
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
    <RecommendationDisplay
      label={recommendationLabel}
      products={productsToShow}
    />
  );
};
