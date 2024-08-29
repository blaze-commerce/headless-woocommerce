import { getProductReviews } from '@src/lib/queries/product';

export class JudgeMe {
  constructor() {}

  static async initialize(productId: number) {
    const reviews = await getProductReviews(productId);

    return {
      reviews: {
        data: reviews.data.reviews,
      },
    };
  }
}
