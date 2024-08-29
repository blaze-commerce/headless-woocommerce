import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { env } from '@src/lib/env';
import { computeProductReviews, getReviewsEndpoint } from '@src/lib/queries/product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { NEXT_PUBLIC_REVIEW_SERVICE } = env();
  const { sku, page, rating } = req.query;
  let response = null;
  let PRODUCT_REVIEWS_ENDPOINT = null;
  const productId = +(sku as string);

  const { count, average, percentage } = await computeProductReviews('', productId);

  switch (NEXT_PUBLIC_REVIEW_SERVICE) {
    case 'reviews.io':
      PRODUCT_REVIEWS_ENDPOINT = getReviewsEndpoint(sku as string, +(page as string));
      response = await axios.get(PRODUCT_REVIEWS_ENDPOINT as string);
      return res.status(200).json(response.data);
    case 'judge.me':
      PRODUCT_REVIEWS_ENDPOINT = getReviewsEndpoint(
        productId,
        +(page as string),
        +(rating as string)
      );
      response = await axios.get(PRODUCT_REVIEWS_ENDPOINT as string);

      return res.status(200).json({
        reviews: {
          data: response.data.reviews,
        },
        stats: {
          average,
          count: count?.data.count,
          percentage,
        },
      });
    case 'yotpo':
      PRODUCT_REVIEWS_ENDPOINT = getReviewsEndpoint(
        productId,
        +(page as string),
        +(rating as string)
      );
      response = await axios.get(PRODUCT_REVIEWS_ENDPOINT as string);

      return res.status(200).json({
        reviews: {
          data: response.data.response.reviews,
        },
      });
  }
}
