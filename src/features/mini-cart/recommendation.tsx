import { useSiteContext } from '@src/context/site-context';
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
            <DefaultProductCard
              key={index}
              product={product}
              showRating={false}
              showWishlistButton={false}
              saleBadgeType={4}
              showCategory={false}
              hasAddToCart={false}
              showBadge={false}
              showVariants={false}
            />
          ))}
      </div>
    </div>
  );
};

export const Recommendation = () => {
  const { cart, fetchingCart, cartUpdating } = useSiteContext();

  const hasCartItems = cart !== null && cart?.products?.length > 0 ? true : false;

  const { data: recentlyViewedProducts, loading: fetchingRecentlyViewedProducts } =
    useFetchRecentlyViewedProducts();

  const { data: recommendedProducts, loading: fetchingRecommendedProducts } =
    useFetchTopRecommendedProductsForCartItems();

  if (fetchingCart || cartUpdating) {
    return null;
  }

  if (hasCartItems && !fetchingRecommendedProducts && recommendedProducts.length > 0) {
    return (
      <RecommendationDisplay
        label="We also recommend"
        products={recommendedProducts}
      />
    );
  }

  if (!hasCartItems && !fetchingRecentlyViewedProducts && recentlyViewedProducts.length > 0) {
    return (
      <RecommendationDisplay
        label="Recently viewed items"
        products={recentlyViewedProducts}
      />
    );
  }

  return null;
};
