import dynamic from 'next/dynamic';
import axios from 'axios';

import { useState } from 'react';

import { useSiteContext } from '@src/context/site-context';
import { Datum } from '@src/models/product/reviews';
import { Settings } from '@src/models/settings';
import { Store } from '@src/models/settings/store';
import { Day, Month, Year } from '@src/lib/types/date';

const DynamicJudgmeReviewItem = dynamic(
  () =>
    import('@src/features/product/reviews/judgeme/review-item').then(
      (module) => module.JudgeMeReviewItem
    ),
  {
    ssr: false,
  }
);

const DynamicYotpoReviewItem = dynamic(
  () =>
    import('@src/features/product/reviews/yotpo/review-item').then(
      (module) => module.YotpoReviewItem
    ),
  {
    ssr: false,
  }
);

const DynamicWooCommerceReviewItem = dynamic(
  () =>
    import('@src/features/product/reviews/woocommerce/review-item').then(
      (module) => module.WooCommerceReviewItem
    ),
  {
    ssr: false,
  }
);

export const ReviewItem = (props: Datum) => {
  const { settings } = useSiteContext();
  const { store } = settings as Settings;
  const { reviewService } = store as Store;
  const {
    id,
    review,
    body,
    reviewer,
    rating,
    verified,
    date_created,
    created_at,
    title,
    author,
    timestamp,
    icon,
    score,
    content,
    verified_buyer,
    user,
    date,
    images = [],
    card_style = 'default',
    hide_footer = false,
  } = props;

  const reviewYear: Year | string = store?.date?.year === '2-digit' ? '2-digit' : 'numeric';
  const reviewMonth: Month | string =
    store?.date?.month === '2-digit'
      ? '2-digit'
      : store?.date?.month === 'long'
      ? 'long'
      : 'numeric';
  const reviewDay: Day | string = store?.date?.day === '2-digit' ? '2-digit' : 'numeric';

  const reviews = review ?? body ?? content;
  const newDate = new Date((date_created as Date) || (timestamp as Date) || created_at || date);
  const reviewDate = newDate.toLocaleDateString(`${store?.date?.format ?? 'en-US'}`, {
    year: reviewYear as Year,
    month: reviewMonth as Month,
    day: reviewDay as Day,
  });
  const isVerified =
    reviewer?.verified_buyer == 'yes' ||
    verified == 'verified-purchase' ||
    verified == 'confirmed-buyer' ||
    verified === true ||
    verified_buyer;
  const reviewerFullName =
    reviewer?.name ??
    author ??
    user?.display_name ??
    `${reviewer?.first_name} ${reviewer?.last_name}`;
  const reviewerInitials =
    reviewer?.name ??
    reviewer?.name?.slice(0, 1) ??
    icon ??
    user?.display_name?.slice(0, 1) ??
    `${reviewer?.first_name?.slice(0, 1)}${reviewer?.last_name?.slice(0, 1)}`;
  const reviewRating = rating ?? score;
  const [thumbsUpCount, setThumbsUpCount] = useState(0);
  const [thumbsDownCount, setThumbsDownCount] = useState(0);

  const voteUp = async () => {
    if (reviewService === 'yotpo') {
      setThumbsUpCount(thumbsUpCount === 0 ? 1 : 0);
      await axios.post('/api/reviews/vote', {
        body: JSON.stringify({
          id,
          type: 'up',
        }),
      });
    }
    if (reviewService === 'woocommerce_native_reviews') {
      setThumbsUpCount((props?.vote_up_count as number) || thumbsUpCount === 0 ? 1 : 0);
    }
  };
  const voteDown = async () => {
    if (reviewService === 'yotpo') {
      setThumbsDownCount(thumbsDownCount === 0 ? 1 : 0);
      await axios.post('/api/reviews/vote', {
        body: JSON.stringify({
          id,
          type: 'down',
        }),
      });
    }
    if (reviewService === 'woocommerce_native_reviews') {
      setThumbsDownCount((props?.vote_down_count as number) || thumbsDownCount === 0 ? 1 : 0);
    }
  };

  return (
    <>
      {reviewService === 'judge.me' && (
        <DynamicJudgmeReviewItem
          {...{
            reviewDate,
            reviewerFullName,
            reviewerInitials,
            reviewRating,
            reviews,
            title,
            isVerified,
          }}
        />
      )}
      {reviewService === 'yotpo' && (
        <DynamicYotpoReviewItem
          {...{
            reviewDate,
            reviewerFullName,
            reviewerInitials,
            reviewRating,
            reviews,
            title,
            isVerified,
            thumbsUpCount,
            thumbsDownCount,
            id,
            content,
            voteUp,
            voteDown,
          }}
        />
      )}
      {reviewService === 'woocommerce_native_reviews' && (
        <DynamicWooCommerceReviewItem
          {...{
            cardStyle: card_style,
            author: props?.author,
            rating: props?.rating,
            reviewDate,
            images,
            content: props?.content,
            commentID: props?.comment_ID,
            voteUpCount: props?.vote_up_count,
            thumbsUpCount,
            voteUp,
            voteDownCount: props?.vote_down_count,
            thumbsDownCount,
            voteDown,
            hideFooter: hide_footer,
          }}
        />
      )}
    </>
  );
};
