import { useEffect, useState } from 'react';

import { Product } from '@src/models/product';
import client from '@src/lib/typesense/client';
import TS_CONFIG from '@src/lib/typesense/config';
import TSProduct, { transformToProducts } from '@src/lib/typesense/product';

export const useFetchRecentlyViewed = (recentIds: number[]) => {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const searchParameters = TSProduct.generateSearchParamsByProductIds(recentIds);
    const searchOptions = {
      cacheSearchResultsForSeconds: 60,
      abortSignal: controller.signal,
    };

    client
      .collections(TS_CONFIG.collectionNames.product)
      .documents()
      .search(searchParameters, searchOptions)
      .then(async (results) => {
        const products = await transformToProducts(results);
        setData(Product.buildFromResponseArray(products));
      })
      .catch(setError)
      .finally(() => setLoading(false));

    return () => {
      // controller.abort();
    };
  }, [recentIds]);

  return { data, error, loading };
};
