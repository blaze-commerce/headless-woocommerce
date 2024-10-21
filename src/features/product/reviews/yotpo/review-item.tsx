import { useState } from 'react';
import { isEmpty } from 'lodash';

import { CheckIcon } from '@heroicons/react/20/solid';
import { Rating } from '@src/features/product/rating';
import { ShareIcon } from '@heroicons/react/24/outline';
import { ThumbsDownIcon, ThumbsUpIcon } from '@src/components/svg/vote';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

const openFacebook = (title: string, id: string, content: string) => {
  window.open(
    `https://www.facebook.com/dialog/feed?app_id=226132034107547&aria_labelled_by=facebook-review-${id}&display=popup&link=http%3A%2F%2Freviews.me%2Ffacebook_post%3Fimage_url%3Dhttps%253A%252F%252Fcdn-yotpo-images-production.yotpo.com%252FProduct%252F152348797%252F252901956%252Fsquare.jpg%253F1645414733%26product_url%3Dhttps%253A%252F%252Fyotpo.com%252Fgo%252FqfLYzGii%26review%3D${content?.replace(
      ' ',
      '%2B'
    )}%26social_title%3D${title?.replace(
      ' ',
      '%2B'
    )}&redirect_uri=http%3A%2F%2Fmy.yotpo.com%2Fshares%3Freview_id%3D${id}`,
    'newwindow',
    'width=300,height=250'
  );
  return false;
};

const openTwitter = (id: string, content: string) => {
  window.open(
    `https://twitter.com/intent/tweet?aria_labelled_by=twitter-review-${id}&text=${content?.replace(
      ' ',
      '+'
    )}&url=https%3A%2F%2Fyotpo.com%2Fgo%2FzPEYESTa&via=yotpo`,
    'newwindow',
    'width=300,height=250'
  );
  return false;
};

const openLinkedIn = (id: string, content: string) => {
  window.open(
    `https://www.linkedin.com/shareArticle?aria_labelled_by=linkedin-review-${id}&mini=true&source=Yotpo&summary=${content?.replace(
      ' ',
      '+'
    )}&title=Looks+so+stylish%21%21&url=https%3A%2F%2Fyotpo.com%2Fgo%2F3IMtmTLZ`,
    'newwindow',
    'width=300,height=250'
  );
  return false;
};

type Props = {
  isVerified?: boolean;
  reviewerInitials?: string;
  reviewDate?: string;
  reviewRating?: number;
  reviewerFullName?: string;
  title?: string;
  reviews?: string;
  thumbsUpCount: number;
  thumbsDownCount: number;
  id?: string;
  content?: string;
  voteUp: () => void;
  voteDown: () => void;
};

export const YotpoReviewItem = ({
  isVerified,
  reviewerInitials,
  reviewDate,
  reviewRating,
  reviewerFullName,
  title,
  reviews,
  thumbsUpCount,
  thumbsDownCount,
  id,
  content,
  voteUp,
  voteDown,
}: Props) => {
  const [showSocialButtons, setShowSocialButtons] = useState(false);

  return (
    <div className="py-8">
      <div className="flex items-start gap-5 mb-5">
        <div className="relative w-12 h-12 bg-[#6A6C77] rounded-full flex items-center justify-center flex-shrink-0">
          <p className="text-base text-white font-bold">{reviewerInitials}</p>
          {isVerified && (
            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-[#1CC286] text-white flex justify-center items-center">
              <CheckIcon className="w-2.5 h-2.5" />
            </span>
          )}
        </div>
        <div className="w-full flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex gap-2 items-center h-11">
              <p className="text-sm font-semibold text-[#000000]">{reviewerFullName}</p>
              {isVerified && <p className="text-sm text-[#6A6C77] font-nroam">Verified Buyer</p>}
            </div>
            <div className="flex gap-1 items-center">
              <Rating
                rating={reviewRating as number}
                color="#BFB49A"
              />
            </div>
            <div className="pt-4">
              <div className="flex gap-2 items-center">
                {title && <p className="text-base font-medium text-[#6B6D79]">{title}</p>}
              </div>
              <p className="mt-3 text-sm text-[#6B6D79]">
                {!isEmpty(reviews) ? (
                  <ReactHTMLParser html={reviews as string} />
                ) : (
                  <>Reviewer didn&apos;t leave any comments</>
                )}
              </p>
            </div>
          </div>
          <div className="h-full flex flex-col justify-between">
            <span className="text-sm font-normal text-[#6A6C77]">{reviewDate}</span>
          </div>
        </div>
      </div>
      <div className="ml-16 flex flex-col md:flex-row justify-between gap-y-3.5">
        <div className="w-full flex flex-row items-center gap-1.5">
          <ShareIcon
            className="w-3.5 h-3.5 hover:opacity-80 cursor-pointer"
            color={'default'}
          />
          <div
            className="h-2.5 pr-2 border-r border-r-stone-400 flex items-center hover:opacity-80 cursor-pointer"
            onClick={() => setShowSocialButtons((prev) => !prev)}
          >
            <span className="text-sm text-[#6B6D79]">Share</span>
          </div>
          {showSocialButtons && (
            <div className="h-2.5 pr-2 border-r border-r-stone-400 flex items-center gap-1.5">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  openFacebook(String(id), String(title), String(content));
                }}
              >
                <span className="text-sm text-[#6B6D79] hover:opacity-80 cursor-pointer">
                  Facebook
                </span>
              </a>
              <span className="text-xs text-stone-400 flex items-start"> • </span>
              <a
                onClick={(e) => {
                  openTwitter(String(id), String(content));
                }}
              >
                <span className="text-sm text-[#6B6D79] hover:opacity-80 cursor-pointer">
                  Twitter
                </span>
              </a>
              <span className="text-xs text-stone-400 flex items-start"> • </span>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  openLinkedIn(String(id), String(content));
                }}
              >
                <span className="text-sm text-[#6B6D79] hover:opacity-80 cursor-pointer">
                  LinkedIn
                </span>
              </a>
            </div>
          )}
        </div>
        <div className="w-full flex flex-row items-start md:justify-end flex-nowrap gap-2.5">
          <span className="text-sm font-normal text-[#6A6C77]">Was This Review Helpful?</span>
          <div
            className="hover:opacity-80 cursor-pointer"
            onClick={voteUp}
          >
            <ThumbsUpIcon
              className="w-4 h-4"
              color={'default'}
              size={'none'}
              fillColor="#6A6C77"
              strokeColor="#ffffff"
            />
          </div>
          <span className="text-sm font-normal text-[#6A6C77]">{thumbsUpCount}</span>
          <div
            className="hover:opacity-80 cursor-pointer"
            onClick={voteDown}
          >
            <ThumbsDownIcon
              className="w-4 h-4"
              color={'default'}
              size={'none'}
              fillColor="#6A6C77"
              strokeColor="#ffffff"
            />
          </div>
          <span className="text-sm font-normal text-[#6A6C77]">{thumbsDownCount}</span>
        </div>
      </div>
    </div>
  );
};
