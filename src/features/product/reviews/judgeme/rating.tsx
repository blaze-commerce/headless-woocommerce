import { round } from 'lodash';
import Link from 'next/link';

import { useSiteContext } from '@src/context/site-context';
import { Stats, StarReviews } from '@src/models/product/reviews';
import { Rating } from '@src/features/product/rating';
import { StarRating } from '@src/features/product/reviews/star-rating';
import { ProgressBar } from '@src/features/product/reviews/progress-bar';

export const JudgeMeRating = ({
  average = 0,
  count = 0,
  percentage = [],
  filterRating,
}: Stats & StarReviews) => {
  const { settings } = useSiteContext();

  const ratingData = [
    { rating: 5, progress: `${percentage?.[5]?.value}` },
    { rating: 4, emptyRating: 1, progress: `${percentage?.[4]?.value}` },
    { rating: 3, emptyRating: 2, progress: `${percentage?.[3]?.value}` },
    { rating: 2, emptyRating: 3, progress: `${percentage?.[2]?.value}` },
    { rating: 1, emptyRating: 4, progress: `${percentage?.[1]?.value}` },
  ];

  return (
    <div className="block space-y-10 md:space-y-0 md:flex items-start gap-2">
      <Link
        href="#review-tab"
        onClick={() => filterRating(-1)}
      >
        <div className="space-y-1 hover:opacity-50">
          <div className="flex gap-3">
            <Rating rating={average} />
            {settings?.product?.features.averageRatingText?.enabled && (
              <span className="text-sm text-[#0e1311]">{round(average as number, 2)} out of 5</span>
            )}
          </div>
          <p className="text-sm text-[#0E1311]">Based on {count} reviews</p>
        </div>
      </Link>
      <div className="md:ml-5 space-y-1 flex flex-col gap-y-1 md:block">
        {ratingData.map((item, index) => (
          <Link
            key={index}
            href="#review-tab"
            onClick={() => filterRating(item.rating)}
          >
            <div className="flex items-center gap-3 hover:opacity-50">
              <StarRating
                rating={item.rating}
                emptyRating={item.emptyRating}
                className="w-4 h-4"
              />
              <ProgressBar progress={item.progress} />
              <span className="md:w-20 md:grid grid-cols-2 justify-items-start gap-2 text-sm text-gray-800">
                <span className="hidden md:flex items-center">
                  {percentage?.[item.rating]?.total}
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
