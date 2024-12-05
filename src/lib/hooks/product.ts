import { Product } from '@src/models/product';
import { ProductBundleConfiguration } from '@src/models/product/types';

import client from '@src/lib/typesense/client';
import TS_CONFIG from '@src/lib/typesense/config';
import TSProduct, { transformToProducts } from '@src/lib/typesense/product';

import axios from 'axios';
import { useEffect, useState } from 'react';

interface AttributeParams {
  [key: string]: string;
}

export const useAttributeParams = (): AttributeParams => {
  const [attributes, setAttributes] = useState<AttributeParams>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const attributesObj: AttributeParams = {};

    params.forEach((value, key) => {
      if (key.startsWith('attribute_')) {
        attributesObj[key] = value;
      }
    });

    setAttributes(attributesObj);
  }, []);

  return attributes;
};

export const useProductBundle = (
  product: Product | undefined
): null | ProductBundleConfiguration => {
  const [bundles, setBundles] = useState<ProductBundleConfiguration | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    if (!product) return;

    axios.get(`/api/product/bundle/?product_id=${product.id}`).then((response) => {
      if (response.data?.data) {
        setBundles({
          minPrice: response.data.data.minPrice,
          maxPrice: response.data.data.maxPrice,
          products: response.data.data.products,
          settings: response.data.data.settings,
        });
      }
    });

    //abort

    return () => {
      return controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!product || product.productType !== 'bundle') return null;

  return bundles;
};

export const useFetchProducts = (productIds: number[]) => {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const strProductIds = JSON.stringify(productIds);

  useEffect(() => {
    const controller = new AbortController();

    const pIds = JSON.parse(strProductIds).map((productId: string) => parseInt(productId));
    const searchParameters = TSProduct.generateSearchParamsByProductIds(pIds);
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
      controller.abort();
    };
  }, [strProductIds]);

  return { data, error, loading };
};
