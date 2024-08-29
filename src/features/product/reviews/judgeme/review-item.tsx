import { CheckIcon } from '@heroicons/react/20/solid';
import { UserIcon } from '@heroicons/react/24/outline';
import { isEmpty } from 'lodash';
import { Rating } from '@src/features/product/rating';

type Props = {
  isVerified?: boolean;
  reviewerInitials?: string;
  reviewDate?: string;
  reviewRating?: number;
  reviewerFullName?: string;
  title?: string;
  reviews?: string;
};

export const JudgeMeReviewItem = ({
  isVerified,
  reviewerInitials,
  reviewDate,
  reviewRating,
  reviewerFullName,
  title,
  reviews,
}: Props) => {
  return (
    <div className="py-8 border-b border-b-[#C5C6CA]">
      <div className="mb-2">
        <Rating
          rating={reviewRating as number}
          className="w-4 h-4"
        />
      </div>
      <div className="flex justify-between mb-6">
        <div className="flex gap-2 align-top">
          <span className="rounded-lg bg-[#E5E5E5] w-6 h-6 flex items-center justify-center relative">
            <UserIcon className="w-5 h-5 stroke-brand-primary  " />
            {isVerified && (
              <span className="absolute bottom-0 -right-1 h-2.5 w-2.5 rounded-full bg-brand-primary text-white flex justify-center items-center">
                <CheckIcon className="w-2 h-2" />
              </span>
            )}
          </span>
          <p className="font-normal text-base leading-4 text-brand-primary">{reviewerFullName}</p>
          {isVerified && (
            <span className="block py-1 px-2 rounded bg-brand-primary text-white text-xs font-medium leading-0">
              Verified
            </span>
          )}
        </div>
        <div>{reviewDate}</div>
      </div>

      {title && (
        <p className="text-[17px] font-semibold leading-[27.2px] text-[#6e6e6e]">{title}</p>
      )}
      <p className="text-[17px] font-normal  leading-[27.2px] text-[#6e6e6e]">
        {!isEmpty(reviews) ? reviews : <>Reviewer didn&apos;t leave any comments</>}
      </p>
    </div>
  );
};
