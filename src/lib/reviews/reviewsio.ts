import { getProductReviews } from '@src/lib/queries/product';

export class ReviewsIO {
  constructor() {}

  static async initialize(sku: string) {
    const reviews = await getProductReviews(sku);

    return { ...reviews.data };
  }
}
