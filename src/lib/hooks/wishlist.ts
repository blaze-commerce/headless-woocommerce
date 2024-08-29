import { isEmpty, includes, merge } from 'lodash';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Product, Product as ProductModel, ProductTypesenseResponse } from '@src/models/product';
import client from '@src/lib/typesense/client';
import TS_CONFIG from '@src/lib/typesense/config';
import TSProduct, { transformToProducts } from '@src/lib/typesense/product';

type WishlistType = {
  [key: number]: number;
};

export const useFetchWishList = (wislistProductIds: number[]) => {
  const [data, setData] = useState<ProductModel[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isEmpty(wislistProductIds)) {
      const controller = new AbortController();

      const searchParameters = TSProduct.generateSearchParamsByProductIds(wislistProductIds);
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
    }

    return () => {
      // controller.abort();
    };
  }, [wislistProductIds]);

  return { data, error, loading };
};

export const useWishListStorage = () => {
  const [wishList, setWishList] = useLocalStorage<WishlistType>('wooless-wishlist', {});

  const addWishList = (productId: number, wishListId: number) => {
    const additionalItem = { [productId]: wishListId };
    setWishList((prev: WishlistType) => {
      return merge({}, prev, additionalItem);
    });
    return getWishList();
  };

  const removeItemToWishList = (productId: number) => {
    setWishList((prev: WishlistType) => {
      const updatedObject = { ...prev };
      // eslint-disable-next-line no-prototype-builtins
      if (prev.hasOwnProperty(productId)) {
        delete updatedObject[productId];
        return updatedObject;
      }

      return prev;
    });
  };
  const getWishList = () => {
    return wishList;
  };

  const deleteWishList = () => {
    setWishList({});
  };

  const isProductInWishList = (productId: number) => {
    const wishListProductIds: number[] = Object.keys(wishList).map(Number);

    return includes(wishListProductIds, productId);
  };

  return {
    addWishList,
    getWishList,
    removeItemToWishList,
    deleteWishList,
    isProductInWishList,
    wishList,
    setWishList,
  };
};
