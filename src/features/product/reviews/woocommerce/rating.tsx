import { round } from 'lodash';
import Link from 'next/link';
import { v4 } from 'uuid';

import { ProgressBar } from '@src/features/product/reviews/progress-bar';
import { StarRating } from '@src/features/product/reviews/star-rating';
import { computeTotalPercentage } from '@src/lib/helpers/helper';
import { Stats, StarReviews } from '@src/models/product/reviews';
import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';

export const WooCommerceRating = ({
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
      progress: `${computeTotalPercentage(progress?.['rating_5'] as number, count).percent}`,
      count: progress?.['rating_5'] ?? 0,
    },
    {
      rating: 4,
      emptyRating: 1,
      progress: `${computeTotalPercentage(progress?.['rating_4'] as number, count).percent}`,
      count: progress?.['rating_4'] ?? 0,
    },
    {
      rating: 3,
      emptyRating: 2,
      progress: `${computeTotalPercentage(progress?.['rating_3'] as number, count).percent}`,
      count: progress?.['rating_3'] ?? 0,
    },
    {
      rating: 2,
      emptyRating: 3,
      progress: `${computeTotalPercentage(progress?.['rating_2'] as number, count).percent}`,
      count: progress?.['rating_2'] ?? 0,
    },
    {
      rating: 1,
      emptyRating: 4,
      progress: `${computeTotalPercentage(progress?.['rating_1'] as number, count).percent}`,
      count: progress?.['rating_1'] ?? 0,
    },
  ];

  return (
    <div className="block space-y-10 md:space-y-0 md:flex items-start gap-2">
      <div className="flex flex-row space-x-2.5 items-center">
        {product?.features?.averageRatingText?.enabled && (
          <div className="rounded bg-[#2d2b2b] px-2.5 py-4">
            <span className="text-base text-white">{round(average as number, 2).toFixed(2)}</span>
          </div>
        )}
        <Link
          href="#review-tab"
          onClick={() => filterRating(-1)}
        >
          <div className="md:flex space-x-5 hover:opacity-50">
            <p className="text-sm text-[#6A6C77]">Based on {count} reviews</p>
          </div>
        </Link>
      </div>
      <div className="md:ml-5 space-y-1">
        {ratingData.map((item) => (
          <div
            className="flex items-center gap-2 hover:opacity-50"
            key={v4()}
          >
            <StarRating
              rating={item.rating}
              emptyRating={item.emptyRating}
              className="w-3.5 h-3.5"
              color="#ffb600"
            />
            <ProgressBar progress={item.progress} />
            <span className="md:w-7 md:grid grid-cols-2 justify-items-center gap-2 text-xs italic text-gray-400">
              <span className="hidden md:flex items-center">{item.count}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
