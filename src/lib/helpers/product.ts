import { Product, ProductTypesenseResponse } from '@src/models/product';
import { sortBy } from 'lodash';
import siteSettings from 'public/site.json';

export const numberFormat = (value: number) =>
  parseFloat(`${value}`)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
 * This function flattens variable into the array
 * @param products
 * @returns Product[]
 */
export const transformProductsForDisplay = (products: Product[]) => {
  return products.flatMap((product) =>
    product.productType === 'variable' &&
    siteSettings.showVariantAsSeparateProductCards &&
    product.variations
      ? product.variations
      : [product]
  );
};

export const sortedProducts = (collection: ProductTypesenseResponse[], firstArray: number[]) =>
  sortBy(collection, function (item: ProductTypesenseResponse) {
    return firstArray.indexOf(+(item.productId as number));
  });
