import { times } from 'lodash';

import { ReviewItem } from '@src/features/product/reviews/review-item';
import { ReviewItemSkeleton } from '@src/features/product/reviews/review-item-skeleton';
import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import { ProductReviews } from '@src/models/product/reviews';
import { Store } from '@src/models/settings/store';
import { useFetchReviews } from '@src/lib/hooks';

type Props = {
  sku: string;
  page: number;
  rating: number | null;
};

export const ReviewItemsGrid = ({ sku, page, rating }: Props) => {
  const { settings } = useSiteContext();
  const { product } = useProductContext();
  const { reviewService } = settings?.store as Store;
  let isIdOrSKU = null;
  switch (reviewService) {
    case 'reviews.io':
      isIdOrSKU = sku;
      break;
    case 'judge.me':
      isIdOrSKU = product?.judgemeReviews?.id as number;
      break;
    case 'yotpo':
      isIdOrSKU = product?.id as string;
  }
  const { data, loading, error } = useFetchReviews(isIdOrSKU, page, rating as number);

  if (loading || data === null) {
    return (
      <div>
        {times(5, (index) => (
          <ReviewItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return error;
  }

  const { reviews } = data as ProductReviews;

  return (
    <div>
      {reviews?.data?.map((reviewData, index) => {
        return (
          <ReviewItem
            key={index}
            {...reviewData}
          />
        );
      })}
    </div>
  );
};
