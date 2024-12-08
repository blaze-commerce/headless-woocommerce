import { useEffect, useState } from 'react';

import { Product } from '@src/models/product';
import client from '@src/lib/typesense/client';
import TS_CONFIG from '@src/lib/typesense/config';
import TSProduct, { transformToProducts } from '@src/lib/typesense/product';
import { useFetchProducts } from '@src/lib/hooks/product';
import { useSiteContext } from '@src/context/site-context';
import { useProductContext } from '@src/context/product-context';

import { isEmpty } from 'lodash';

import { ProductSlides } from '@src/features/product/product-slides/v2';
import { ProductGrid } from '@src/features/product/grids/product-grid';
import { SkeletonProductCard } from '@src/components/skeletons/product-card';

import { ProductSettings } from '@src/models/settings/product';

import {
  addRecentlyViewedProduct,
  getRecentlyViewedProductArr,
} from '@src/lib/helpers/recently-viewed';

//@TODO we stop using this function as this basically just fetch products base on the given product ids. Please use useFetchProducts
export const useFetchRecentlyViewed = (recentIds: number[]) => {
  return useFetchProducts(recentIds);
};

export const useFetchRecentlyViewedProducts = () => {
  const { settings } = useSiteContext();
  const { product } = useProductContext();
  const [recentIds, setRecentIds] = useState<number[]>([]);
  const { features } = settings?.product as ProductSettings;
  const { recentlyViewed } = features;

  const fetchProduct = useFetchProducts(recentIds);

  useEffect(() => {
    // On Component mount set the recentIds to trigger the query of products from wp-graphql
    setRecentIds(getRecentlyViewedProductArr(product?.id as string));
    addRecentlyViewedProduct(product?.id as string);
  }, [product?.id]);

  // If no recentids then show nothing for this component
  if (isEmpty(recentIds) || !recentlyViewed?.enabled) {
    return { data: [], loading: false, error: null };
  }

  return fetchProduct;
};
