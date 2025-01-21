import { Product, ProductTypesenseResponse } from '@src/models/product';
import { ProductMetaData } from '@src/models/product/types';
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

export const getProductRatingStats = (product: Product) => {
  const { judgemeReviews, yotpoReviews, metaData } = product;
  const { wooProductReviews } = metaData as ProductMetaData;

  const getStats = () => {
    switch (siteSettings.store.reviewService) {
      case 'judge.me':
        return {
          rating: judgemeReviews?.average || 0,
          totalReviews: judgemeReviews?.count || 0,
        };
      case 'yotpo':
        return {
          rating: yotpoReviews?.product_score || 0,
          totalReviews: yotpoReviews?.total_reviews || 0,
        };
      case 'woocommerce_native_reviews':
        return {
          rating: wooProductReviews?.average_rating || 0,
          totalReviews: wooProductReviews?.count_reviews || 0,
        };
      default:
        return {
          rating: 0,
          totalReviews: 0,
        };
    }
  };

  return getStats();
};
