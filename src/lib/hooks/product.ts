import { Product } from '@src/models/product';
import { ProductBundle } from '@src/models/product/types';
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

export const useProductBundle = (product: Product | undefined): null | ProductBundle => {
  const [bundles, setBundles] = useState<ProductBundle | null>(null);

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
