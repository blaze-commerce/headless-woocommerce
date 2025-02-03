import { Rating } from '@src/features/product/rating';
import { EmptyStar } from '@src/components/svg/icons/empty-star';
import { useSiteContext } from '@src/context/site-context';
import { ProductReviews } from '@src/models/product/reviews';
import { Settings } from '@src/models/settings';
import { Store } from '@src/models/settings/store';
import { cn } from '@src/lib/helpers/helper';

export const ProductRating = ({ stats }: ProductReviews) => {
  const { settings } = useSiteContext();
  const { store } = settings as Settings;
  const { reviewService } = store as Store;
  let ratingColor = '';

  switch (reviewService) {
    case 'yotpo':
      ratingColor = '#BFB49A';
      break;
    case 'woocommerce_native_reviews':
      ratingColor = '#5A768E';
      break;
  }

  if (
    (reviewService === 'judge.me' && (!stats?.average || !stats?.count)) ||
    (reviewService === 'yotpo' && (!stats?.product_score || !stats?.total_reviews)) ||
    (reviewService === 'woocommerce_native_reviews' &&
      (!stats?.average_rating || !stats?.count_reviews))
  ) {
    return (
      <>
        <div className="flex justify-center items-center lg:justify-start">
          {[...new Array(5)].map((_rate, index) => {
            return (
              <div key={index}>
                <EmptyStar
                  className={cn({
                    'w-5 h-5': reviewService !== 'woocommerce_native_reviews',
                    'w-3.5 h-3.5': reviewService === 'woocommerce_native_reviews',
                  })}
                  color={ratingColor ? 'none' : 'default'}
                  size={'xs'}
                  strokeColor={ratingColor}
                />
              </div>
            );
          })}
        </div>
        <span className="text-neutral-500 text-xs font-normal">No reviews</span>
      </>
    );
  }

  const hasReviewCount =
    (stats?.count as number) > 0 ||
    (stats?.total_reviews as number) > 0 ||
    (stats?.count_reviews as number) > 0;
  const reviewCountPluralOrSingular =
    (stats?.count as number) > 1 ||
    (stats?.total_reviews as number) > 1 ||
    (stats?.count_reviews as number) > 1
      ? 'reviews'
      : 'review';

  return (
    <div className="my-2 gap-2 flex flex-col md:flex-row justify-center items-center lg:justify-start">
      <Rating
        className={cn({
          'w-5 h-5': reviewService !== 'woocommerce_native_reviews',
          'w-3.5 h-3.5': reviewService === 'woocommerce_native_reviews',
        })}
        rating={(stats?.average as number) ?? stats?.product_score ?? stats?.average_rating}
        color={ratingColor}
      />
      <span className="text-sm leading-5 font-normal !whitespace-nowrap text-brand-primary">
        {hasReviewCount &&
          `${
            stats?.count ?? stats?.total_reviews ?? stats?.count_reviews
          } ${reviewCountPluralOrSingular}`}
      </span>
    </div>
  );
};
