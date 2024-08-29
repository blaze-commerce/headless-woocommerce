import { round } from 'lodash';
import Link from 'next/link';

import { Rating } from '@src/features/product/rating';
import { ProgressBar } from '@src/features/product/reviews/progress-bar';
import { StarRating } from '@src/features/product/reviews/star-rating';
import { computeTotalPercentage } from '@src/lib/helpers/helper';
import { Stats, StarReviews } from '@src/models/product/reviews';
import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';

export const YotpoRating = ({
  average = 0,
  count = 0,
  progress,
  filterRating,
}: Stats & StarReviews) => {
  const { settings } = useSiteContext();
  const { product } = settings as Settings;

  const ratingData = [
    {
      rating: 5,
      progress: `${computeTotalPercentage(progress?.['5'] as number, count).percent}`,
    },
    {
      rating: 4,
      emptyRating: 1,
      progress: `${computeTotalPercentage(progress?.['4'] as number, count).percent}`,
    },
    {
      rating: 3,
      emptyRating: 2,
      progress: `${computeTotalPercentage(progress?.['3'] as number, count).percent}`,
    },
    {
      rating: 2,
      emptyRating: 3,
      progress: `${computeTotalPercentage(progress?.['2'] as number, count).percent}`,
    },
    {
      rating: 1,
      emptyRating: 4,
      progress: `${computeTotalPercentage(progress?.['1'] as number, count).percent}`,
    },
  ];

  return (
    <div className="block space-y-10 md:space-y-0 md:flex items-start gap-2">
      {product?.features?.averageRatingText?.enabled && (
        <p className="text-[42px] font-normal text-[#0E1311] leading-8">
          {round(average as number, 2)}
        </p>
      )}
      <Link
        href="#review-tab"
        onClick={() => filterRating(-1)}
      >
        <div className="md:flex space-x-5 hover:opacity-50">
          <Rating
            rating={average}
            color="#BFB49A"
          />
          <p className="text-sm text-[#6A6C77]">Based on {count} reviews</p>
        </div>
      </Link>
      <div className="md:ml-5 md:pl-5 space-y-1 border-l border-l-stone-200">
        {ratingData.map((item, index) => (
          <Link
            key={index}
            href="#review-tab"
            onClick={() => filterRating(item.rating)}
          >
            <div className="flex items-center gap-2 hover:opacity-50">
              <StarRating
                rating={item.rating}
                emptyRating={item.emptyRating}
                className="w-3.5 h-3.5"
                color="#BFB49A"
              />
              <span className="md:w-7 md:grid grid-cols-2 justify-items-start gap-2 text-xs italic text-gray-400">
                <span className="hidden md:flex items-center">({progress?.[item.rating]})</span>
              </span>
              <ProgressBar progress={item.progress} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
