import { env } from '@src/lib/env';

import { Product } from '@src/models/product';
import { ProductMetaData } from '@src/models/product/types';
import { ProductRating } from '@src/features/product/product-rating';
import { Stats } from '@src/models/product/reviews';

type ICardRating = {
  product: Product;
  detailsAlignment: string;
  showRating?: boolean;
};

export const CardRating = ({ product, detailsAlignment, showRating }: ICardRating) => {
  if (!showRating) return null;

  const { NEXT_PUBLIC_REVIEW_SERVICE } = env();
  const { judgemeReviews, yotpoReviews, metaData } = product;
  const { wooProductReviews } = metaData as ProductMetaData;

  return (
    <div className={`flex items-center justify-${detailsAlignment} space-x-2 z-[7]`}>
      {NEXT_PUBLIC_REVIEW_SERVICE === 'judge.me' && (
        <ProductRating stats={judgemeReviews as Stats} />
      )}
      {NEXT_PUBLIC_REVIEW_SERVICE === 'yotpo' && <ProductRating stats={yotpoReviews as Stats} />}
      {NEXT_PUBLIC_REVIEW_SERVICE === 'woocommerce_native_reviews' && (
        <ProductRating stats={wooProductReviews?.stats} />
      )}
    </div>
  );
};
