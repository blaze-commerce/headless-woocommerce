import { isEmpty, isInteger } from 'lodash';

export const addRecentlyViewedProduct = (productId: string) => {
  let recent = getRecentlyViewedProduct();

  if (isEmpty(recent)) {
    // If recently viewed is empty then we just save the product id
    saveRecentlyViewedProduct(productId);

    return getRecentlyViewedProduct();
  }

  // if not empty then we check if product id exist and remove
  if (recent?.includes(productId)) {
    recent = recent.replace(productId, '');
  }
  // Since we remove the product then we Add the product id again
  recent = ''.concat(productId, '|', recent as string);
  recent = recent.replace('||', '|');
  recent = recent.startsWith('|') ? recent.substring(1) : recent;
  recent = recent.endsWith('|') ? recent.substring(0, recent.length - 1) : recent;
  recent = recent.trim();

  saveRecentlyViewedProduct(recent);
  return getRecentlyViewedProduct();
};

export const saveRecentlyViewedProduct = (value: string) => {
  return localStorage.setItem('woo-next-recent-product', value);
};

export const getRecentlyViewedProduct = () => {
  const recentProductsStr = localStorage.getItem('woo-next-recent-product');
  return recentProductsStr;
};

export const getRecentlyViewedProductArr = (exlude: string | null = null) => {
  let recentProductsStr = getRecentlyViewedProduct();
  if (isEmpty(recentProductsStr)) {
    return [];
  }

  // if not empty then we check if product id exist and remove
  if (
    isInteger(parseInt(exlude as unknown as string)) &&
    recentProductsStr?.includes(exlude as unknown as string)
  ) {
    recentProductsStr = recentProductsStr?.replace(exlude as unknown as string, '');
    recentProductsStr = recentProductsStr?.replace('||', '|');
    recentProductsStr = recentProductsStr?.startsWith('|')
      ? recentProductsStr.substring(1)
      : recentProductsStr;
    recentProductsStr = recentProductsStr?.endsWith('|')
      ? recentProductsStr?.substring(0, recentProductsStr.length - 1)
      : recentProductsStr;
  }

  recentProductsStr = recentProductsStr?.trim() as string;
  if (isEmpty(recentProductsStr)) {
    return [];
  }

  const recentProductIds = recentProductsStr?.split('|');
  return Array.from(recentProductIds, Number); // get the 2nd to the last element
};

export const deleteRecentlyViewedProduct = () => {
  return localStorage.removeItem('woo-next-recent-product');
};

export const RecentlyViewed = {
  add: addRecentlyViewedProduct,
  get: getRecentlyViewedProduct,
  getArr: getRecentlyViewedProductArr,
  delete: deleteRecentlyViewedProduct,
};
