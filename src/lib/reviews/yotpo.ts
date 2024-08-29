import axios from 'axios';
import { compact, keyBy, map } from 'lodash';

import { Product } from '@src/models/product';
import { YotpoReviews } from '@src/lib/types/reviews';

export const getLatestReviews = async (
  reviewProductIds: number[] | string[]
): Promise<YotpoReviews[]> => {
  if (process.env.NEXT_PUBLIC_REVIEW_SERVICE !== 'yotpo') return [];

  const typesenseProducts = await Product.findMultipleBy('productId', reviewProductIds);
  const mappedProducts = keyBy(typesenseProducts, 'productId');

  const requests = map(reviewProductIds, (productId) => {
    const data = {
      per_page: 1,
      page: 1,
      domain_key: productId,
      sortings: [
        {
          sort_by: 'score',
          ascending: false,
        },
      ],
    };

    return axios.post(
      `https://api-cdn.yotpo.com/v1/reviews/${process.env.REVIEW_SERVICE_KEY}/filter.json`,
      data
    );
  });

  const responses = await Promise.all(requests);
  const reviewsResults = responses.map(({ data: responseData }) => {
    const product = responseData.response.products[0];
    const review: YotpoReviews = responseData.response.reviews[0];

    if (!review || !product) {
      return;
    }

    const productId = product.domain_key;

    return {
      score: review.score,
      content: review.content,
      title: review.title,
      verified_buyer: review.verified_buyer,
      sentiment: review.sentiment,
      user: review.user,
      product_thumbnail_src: product.image_url,
      product_name: product.name,
      product_permalink: mappedProducts[productId]?.permalink ?? '',
    };
  });

  return compact(reviewsResults) || [];
};

export const getProductReviews = async (productId: string) => {
  if (process.env.NEXT_PUBLIC_REVIEW_SERVICE !== 'yotpo') return null;

  const reviews = await axios.get(
    `https://api-cdn.yotpo.com/v1/widget/${process.env.REVIEW_SERVICE_KEY}/products/${productId}/reviews.json?page=1&per_page=5`
  );

  return reviews.data.response.reviews || [];
};

export const getProductStats = async (productId: string) => {
  if (process.env.NEXT_PUBLIC_REVIEW_SERVICE !== 'yotpo') return null;

  const stats = await axios.get(
    `https://api-cdn.yotpo.com/v1/widget/${process.env.REVIEW_SERVICE_KEY}/products/${productId}/reviews.json`
  );

  return stats.data.response.bottomline;
};
