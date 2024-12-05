import { useEffect, useMemo, useState } from 'react';

import { Product } from '@src/models/product';
import client from '@src/lib/typesense/client';
import TS_CONFIG from '@src/lib/typesense/config';
import TSProduct, { transformToProducts } from '@src/lib/typesense/product';
import { useSiteContext } from '@src/context/site-context';
import { useFetchProducts } from '@src/lib/hooks/product';

export const useFetchTopRecommendedProductsForCartItems = () => {
  const { cart } = useSiteContext();

  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the products in the cart
  const productIds = cart.products.map((product) => parseInt(product.productId));
  const {
    data: products,
    error: productsError,
    loading: productsLoading,
  } = useFetchProducts(productIds);

  // Extract recommended product IDs once the first query completes
  const recommendedProductIds = products.flatMap((product) =>
    product.crossSellProducts ? product.crossSellProducts : []
  );

  // Fetch the recommended products
  const {
    data: recommendedProducts,
    error: recommendedProductsError,
    loading: recommendedProductsLoading,
  } = useFetchProducts(recommendedProductIds);

  // Combine the state of both queries
  useEffect(() => {
    if (!productsLoading && !recommendedProductsLoading) {
      setLoading(false);
    }
    if (productsError || recommendedProductsError) {
      setError(productsError || recommendedProductsError);
    }
    if (recommendedProducts) {
      setData(recommendedProducts.filter((product) => product.purchasable));
    }
  }, [
    productsLoading,
    recommendedProductsLoading,
    productsError,
    recommendedProductsError,
    recommendedProducts,
  ]);

  // If `productIds` is empty, return immediately
  if (!productIds.length) {
    return { data: [], error: null, loading: false };
  }

  return { data, error, loading };
};
