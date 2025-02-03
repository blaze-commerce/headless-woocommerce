import Image from 'next/image';

import { ThumbsUpIcon, ThumbsDownIcon } from '@src/components/svg/vote';

import { Rating } from '@src/features/product/rating';
import React from 'react';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
type Props = {
  cardStyle: string;
  author?: string;
  rating?: number;
  reviewDate?: string;
  images?: string[];
  content?: string;
  commentID?: number;
  voteUpCount?: number;
  thumbsUpCount?: number;
  voteUp: () => void;
  voteDownCount?: number;
  thumbsDownCount?: number;
  voteDown: () => void;
  hideFooter: boolean;
};

export const WooCommerceReviewItem = ({
  cardStyle,
  author,
  rating,
  reviewDate,
  images,
  content,
  commentID,
  voteUpCount,
  thumbsUpCount,
  voteUp,
  voteDownCount,
  thumbsDownCount,
  voteDown,
  hideFooter,
}: Props) => {
  const nCardStyle =
    cardStyle === 'default'
      ? 'bg-[#f3f3f3] py-2.5 px-2.5 rounded-sm shadow-[3px_4px_8px_0_rgba(0,0,0,0.2)]'
      : 'bg-white';
  return (
    <>
      <div className={`review-content-container ${nCardStyle} flex flex-col justify-between`}>
        {' '}
        <div className="review-content-container-top">
          <div className="review-content-container-top-left"></div>
          <div className="review-content-container-top-right">
            <div className="comment-author font-bold text-sm text-black mb-1.5">{author} </div>
            <div className="review-rating flex flex-row items-center space-x-1.5 mb-1.5">
              <div
                className="star-rating"
                role="img"
                aria-label={`Rated ${rating} out of 5`}
              >
                <div className="space-y-1 hover:opacity-50">
                  <Rating
                    rating={rating as number}
                    className="w-3.5 h-3.5"
                    color="#ffb600"
                  />
                </div>
              </div>{' '}
              <div className="review-date text-xs italic text-black">{reviewDate}</div>
            </div>
          </div>
          <div className="review-content text-sm font-light text-black">
            {(images?.length as number) > 0 &&
              images?.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  width={100}
                  height={100}
                  alt="review-image"
                />
              ))}
            <ReactHTMLParser html={content as string} />
          </div>
        </div>
        {!hideFooter && (
          <div
            className="comment-helpful-button-container mt-2.5 pt-2 border-t border-t-[#0101011a] flex flex-row justify-between"
            data-comment_id={`${commentID}`}
          >
            <span className="comment-helpful-button-label">Helpful?</span>
            <div className="comment-helpful-button-vote-container flex flex-row items-center space-x-2">
              <span className="comment-helpful-button-up-vote-count">
                {voteUpCount || thumbsUpCount}{' '}
              </span>
              <div
                className="hover:opacity-80 cursor-pointer"
                onClick={voteUp}
              >
                <ThumbsUpIcon
                  className="w-6 h-6"
                  color={'default'}
                  size={'none'}
                  fillColor="#6A6C77"
                  strokeColor="#ffffff"
                />
              </div>
              <div
                className="hover:opacity-80 cursor-pointer"
                onClick={voteDown}
              >
                <ThumbsDownIcon
                  className="w-6 h-6"
                  color={'default'}
                  size={'none'}
                  fillColor="#6A6C77"
                  strokeColor="#ffffff"
                />
              </div>
              <span className="comment-helpful-button-down-vote-count">
                {voteDownCount || thumbsDownCount}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
