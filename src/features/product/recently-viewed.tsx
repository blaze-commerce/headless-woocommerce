import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

import { ProductSlides } from '@src/features/product/product-slides/v2';
import { ProductGrid } from '@src/features/product/grids/product-grid';
import { SkeletonProductCard } from '@src/components/skeletons/product-card';
import { useSiteContext } from '@src/context/site-context';
import { ProductSettings } from '@src/models/settings/product';
import { useFetchRecentlyViewed } from '@src/lib/hooks';
import {
  addRecentlyViewedProduct,
  getRecentlyViewedProductArr,
} from '@src/lib/helpers/recently-viewed';
import { useProductContext } from '@src/context/product-context';

export const RecentlyViewed = () => {
  const { settings } = useSiteContext();
  const { product } = useProductContext();
  const [recentIds, setRecentIds] = useState<number[]>([]);
  const { features } = settings?.product as ProductSettings;
  const { recentlyViewed } = features;

  const { loading, data } = useFetchRecentlyViewed(recentIds);

  useEffect(() => {
    // On Component mount set the recentIds to trigger the query of products from wp-graphql
    setRecentIds(getRecentlyViewedProductArr(product?.id as string));
    addRecentlyViewedProduct(product?.id as string);
  }, [product?.id]);

  // If no recentids then show nothing for this component
  if (isEmpty(recentIds) || !recentlyViewed?.enabled) {
    return <></>;
  }

  if (loading) {
    const cardCount = recentlyViewed.showNumProducts;

    return (
      <section className="mt-7 animate-pulse">
        <div className="h-11 w-80 bg-gray-300 rounded-md mb-2" />
        <ProductGrid productColumns={settings?.shop?.layout.productColumns}>
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

  const products = data;

  return (
    <ProductSlides
      id="recently-viewed"
      title={'Recently Viewed Items'}
      products={products}
    />
  );
};
