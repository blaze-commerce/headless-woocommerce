import { Rating, Tooltip } from '@mui/material';
import classNames from 'classnames';
import { isEmpty, kebabCase, reduce } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useState } from 'react';
import { useToggle } from 'usehooks-ts';

import { Rating as RatingStars } from '@src/features/product/rating';
import { ReviewItem } from '@src/features/product/reviews/review-item';
import { ReviewItemsGrid } from '@src/features/product/reviews/review-items-grid';
import { ReviewSummary } from '@src/features/product/reviews/review-summary';
import {
  ReviewFormErrorAlert,
  ReviewFormSuccessAlert,
} from '@src/features/product/reviews/review-form-alert';
import { LoadMoreButton } from '@src/components/category/load-more-button';
import { EmptyStar } from '@src/components/svg/icons/empty-star';
import { Star } from '@src/components/svg/icons/star';
import { Spinner } from '@src/components/svg/spinner';
import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import { env } from '@src/lib/env';
import { Product } from '@src/models/product';
import { Settings } from '@src/models/settings';
import { Store } from '@src/models/settings/store';
import { tooltipPlacement, tooltipTitles } from '@src/lib/constants/ratings';
import { cn, countObjectEntries, removeHttp } from '@src/lib/helpers/helper';
import { getCurrentPageItems, submitReviewForm } from '@src/lib/queries/product';
import { ReviewFormProps } from '@src/lib/types/reviews';
import { WoocommerceProductReviews } from '@src/models/product/reviews';

type ReviewProps = { product: Product; sku: string };

const loadingIndicator = () => {
  return (
    <>
      <Spinner className="text-white" />
      Submitting...
    </>
  );
};

export default function Review({ product, sku }: ReviewProps) {
  const { NEXT_PUBLIC_LIVE_URL } = env();
  const { settings } = useSiteContext();
  const {
    customer,
    rating: {
      review: [selectedRating, setSelectedRating],
    },
  } = useProductContext();
  const { store } = settings as Settings;
  const { url, reviewService } = store as Store;
  const [isShowReviewForm, toggleShowReviewForm, setIsShowReviewForm] = useToggle();
  const [showMoreReviews, setShowMoreReviews] = useState<[JSX.Element] | undefined>([<></>]);
  const [starReviews, setStarReviews] = useState<number>(0);
  const [loadMorePage, setLoadMorePage] = useState(2);
  const totalItems =
    product?.judgemeReviews?.count ?? (customer?.stats?.total_review as number) ?? 0;
  const currentItemsCount = getCurrentPageItems(loadMorePage, totalItems);
  let submitFormIdentifier = null;
  switch (reviewService) {
    case 'judge.me':
      submitFormIdentifier = product?.judgemeReviews?.externalId as number;
      break;
    default:
      submitFormIdentifier = product?.id as string;
  }
  const [reviewsFormInput, setReviewsFormInput] = useState<ReviewFormProps>({
    id: submitFormIdentifier ?? null,
    name: '',
    nameFormat: '',
    email: '',
    rating: 5,
    title: '',
    body: '',
    productUrl: product?.permalink,
    productTitle: product?.name,
  });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    body: false,
    failed: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const hasFieldErrors = countObjectEntries(fieldErrors) > 0;
  const [ratingHover, setRatingHover] = useState(-1);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({
      name: false,
      email: false,
      body: false,
      failed: false,
    });
    setIsSubmitted(false);
    if (!reviewsFormInput.name) {
      setFieldErrors((prevState) => ({ ...prevState, name: true }));
    }
    if (!reviewsFormInput.email) {
      setFieldErrors((prevState) => ({ ...prevState, email: true }));
    }
    if (!reviewsFormInput.body) {
      setFieldErrors((prevState) => ({ ...prevState, body: true }));
    }
    if (!reviewsFormInput.rating) {
      setFieldErrors((prevState) => ({ ...prevState, rating: true }));
    }
    if (
      reviewsFormInput.name &&
      reviewsFormInput.email &&
      reviewsFormInput.body &&
      reviewsFormInput.rating
    ) {
      try {
        setLoading(true);
        const response = await submitReviewForm(reviewsFormInput);
        if (response?.status === 200) {
          setIsShowReviewForm(false);
          setIsSubmitted(true);
        }
      } catch (error) {
        setFieldErrors((prevState) => ({
          ...prevState,
          failed: true,
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  const filterRating = (rating: number) => {
    let reviewItems = showMoreReviews;
    if (rating > -2) {
      reviewItems = [<></>];
      setShowMoreReviews(
        reviewItems?.concat(
          <MemoedReviewItemsGrid
            page={1}
            sku={`${sku}`}
            rating={rating}
          />
        ) as [JSX.Element]
      );
    }
    setLoadMorePage(2);
    setStarReviews(rating as number);
  };

  const loadMoreItems = () => {
    setLoadMorePage(loadMorePage + 1);
    setShowMoreReviews(
      showMoreReviews?.concat(
        <MemoedReviewItemsGrid
          page={loadMorePage}
          sku={`${sku}`}
          rating={starReviews}
        />
      ) as [JSX.Element]
    );
  };

  const MemoedReviewItemsGrid = memo(ReviewItemsGrid);

  const renderYotpoProvider = () => {
    if (!url || !reviewService) return null;
    const baseUrlSlug = removeHttp(url);
    return (
      <div className="relative flex mb-5 gap-1 w-24">
        <a
          target="_blank"
          href={`https://www.yotpo.com/?utm_campaign=branding_link_reviews_widget_v2&utm_medium=widget&utm_source=${baseUrlSlug}`}
          rel="noreferrer"
          className="hover:opacity-80"
        >
          <span className="text-sm">Powered by</span>
          <Image
            width="20"
            height="20"
            alt="Yotpo.com"
            src="/yotpo-logo.png"
            className="absolute -top-[0.5rem] right-0"
          />
        </a>
      </div>
    );
  };

  const renderReviewsIoProvider = () => {
    if (!url || !reviewService) return null;
    const baseUrlSlug = kebabCase(removeHttp(url));
    return (
      <div className="flex justify-center mt-5 gap-3">
        <Link
          target="_blank"
          href={`https://www.reviews.io/company-reviews/store/${baseUrlSlug}`}
          passHref
        >
          <div className="relative w-[110px] h-[15px]">
            <Image
              width="110"
              height="15"
              alt="Reviews.io"
              src="https://assets.reviews.io/img/all-global-assets/platform-logos/logo-reviewsio--black.svg"
            />
          </div>
        </Link>
      </div>
    );
  };

  const renderLoadMoreButton = () => {
    return <LoadMoreButton loadMoreItems={loadMoreItems} />;
  };

  const renderYotpoReviewsCount = () => {
    if (isEmpty(customer?.reviews) || isEmpty(customer?.stats)) {
      return null;
    }

    const totalPageItems = (customer?.stats?.star_distribution?.[starReviews] as number) ?? 0;

    const pageItemsCount = getCurrentPageItems(loadMorePage, totalPageItems);

    const isRatingPageLessThanTotal = totalPageItems > pageItemsCount;

    const isPageLessThanTotal = (starReviews as number) <= 0 && totalItems > currentItemsCount;

    return (
      <>
        <div className="flex justify-center mt-5">
          <span className="text-sm font-normal text-[#6A6A6A]">
            {(starReviews as number) > 0 ? pageItemsCount : currentItemsCount} out of{' '}
            {(starReviews as number) > 0 ? totalPageItems : totalItems} reviews
          </span>
        </div>
        {(isRatingPageLessThanTotal || isPageLessThanTotal) && renderLoadMoreButton()}
      </>
    );
  };

  const renderJudgeMeReviewsCount = () => {
    if (isEmpty(product?.judgemeReviews) || isEmpty(product?.judgemeReviews?.percentage)) {
      return null;
    }

    const totalPageItems = (product?.judgemeReviews?.percentage[starReviews]?.total as number) ?? 0;

    const pageItemsCount = getCurrentPageItems(loadMorePage, totalPageItems);

    const isRatingPageLessThanTotal = totalPageItems > pageItemsCount;

    const isPageLessThanTotal = (starReviews as number) <= 0 && totalItems > currentItemsCount;

    return (
      <>
        <div className="flex justify-center mt-5">
          {(starReviews as number) > 0 ? pageItemsCount : currentItemsCount} out of{' '}
          {(starReviews as number) > 0 ? totalPageItems : totalItems} reviews
        </div>
        {(isRatingPageLessThanTotal || isPageLessThanTotal) && renderLoadMoreButton()}
      </>
    );
  };

  const renderReviewItems = () => {
    if (
      reviewService === 'judge.me' &&
      product?.judgemeReviews?.content &&
      product?.judgemeReviews?.content?.length === 0
    ) {
      return null;
    }

    if (reviewService === 'yotpo' && customer?.reviews && customer?.reviews?.length === 0) {
      return null;
    }

    if (
      reviewService === 'woocommerce_native_reviews' &&
      product?.metaData?.wooProductReviews?.reviews &&
      product?.metaData?.wooProductReviews?.reviews?.length === 0
    ) {
      return null;
    }

    const filterWooProductReviews = reduce(
      product?.metaData?.wooProductReviews?.reviews,
      (result: WoocommerceProductReviews[], review) => {
        const isSameSelectedRating = review.rating === +selectedRating;

        if (isSameSelectedRating) {
          result.push(review as WoocommerceProductReviews);
        } else if (!selectedRating) {
          result.push(review);
        }

        return result;
      },
      []
    );

    return (
      <>
        <div>
          {reviewService === 'judge.me' &&
            !starReviews &&
            product?.judgemeReviews?.content?.slice(0, 5).map((data, index) => {
              return (
                <ReviewItem
                  key={index}
                  {...data}
                />
              );
            })}
          {reviewService === 'yotpo' &&
            !starReviews &&
            customer?.reviews?.slice(0, 5).map((data, index) => {
              return (
                <ReviewItem
                  key={index}
                  {...data}
                />
              );
            })}
          {reviewService === 'woocommerce_native_reviews' && !starReviews && (
            <div className="flex flex-col lg:grid grid-cols-5 my-2.5 gap-10">
              {filterWooProductReviews
                ?.slice(0, 5)
                .map((data: WoocommerceProductReviews, index: number) => {
                  return (
                    <ReviewItem
                      key={index}
                      {...data}
                    />
                  );
                })}
            </div>
          )}
        </div>
        {showMoreReviews}
      </>
    );
  };

  const onSelectChange = (e: { target: { value: string } }) => {
    setReviewsFormInput((prevState) => ({
      ...prevState,
      nameFormat: e.target.value,
    }));
  };

  const renderNameSelection = () => {
    return (
      <select
        className="rounded-md border-0 py-0.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={reviewsFormInput.nameFormat}
        onChange={onSelectChange}
      >
        <option value="">John Smith</option>
        <option value="last_initial">John S.</option>
        <option value="all_initials">J.S.</option>
        <option value="anonymous">Anonymous</option>
      </select>
    );
  };

  const renderWooForm = () => {
    return (
      <div
        className={classNames('w-full transition-all duration-300 ease-in-out', {
          'max-h-full opacity-100': isShowReviewForm,
          'max-h-0 opacity-0': !isShowReviewForm,
        })}
      >
        {hasFieldErrors && <ReviewFormErrorAlert {...fieldErrors} />}
        <form
          className="bg-white p-8"
          onSubmit={onSubmit}
        >
          <div className="mb-4">
            <h4 className="mb-2 text-sm text-[#6A6C77] font-bold">WRITE A REVIEW</h4>
            <div className="mb-4">
              <span className="text-sm text-[#ff0000] font-bold">* </span>
              <span className="text-sm text-[#6A6C77] font-semibold">
                Indicates a required field
              </span>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                <span className="text-sm text-[#ff0000] font-bold">* </span>Score
              </label>
              <Tooltip
                title={tooltipTitles[ratingHover]}
                placement={tooltipPlacement[ratingHover]}
              >
                <Rating
                  name="customized-color"
                  value={reviewsFormInput.rating}
                  onChange={(_event, newValue) => {
                    setReviewsFormInput((prevState) => ({
                      ...prevState,
                      rating: newValue as number,
                    }));
                  }}
                  icon={
                    <Star
                      className="w-5 h-5"
                      color={'default'}
                      size={'xs'}
                      fillColor="#ffb600"
                      strokeColor="#ffb600"
                    />
                  }
                  emptyIcon={
                    <EmptyStar
                      className="w-5 h-5"
                      color={'default'}
                      size={'xs'}
                      strokeColor="#ffb600"
                    />
                  }
                  onChangeActive={(_event, newHover) => {
                    setRatingHover(newHover);
                  }}
                />
              </Tooltip>
            </div>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="review-textarea"
            >
              <span className="text-sm text-[#ff0000] font-bold">* </span>Review:
            </label>
            <textarea
              id="review-textarea"
              className={classNames(
                'shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-0 focus:shadow-outline',
                {
                  'border-red-500': fieldErrors.body,
                }
              )}
              rows={4}
              maxLength={5000}
              onChange={(e) =>
                setReviewsFormInput((prevState) => ({
                  ...prevState,
                  body: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-end gap-5">
            <div>
              <label
                className="flex items-start md:items-center gap-1 text-gray-700 text-sm mb-2"
                htmlFor="review-name"
              >
                <span className="text-sm text-[#ff0000] font-bold">* </span>Use your name:
              </label>
              <input
                className={classNames(
                  'shadow appearance-none border border-gray-300 rounded w-full md:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:shadow-outline',
                  {
                    'border-red-500': fieldErrors.name,
                  }
                )}
                id="review-name"
                type="text"
                onChange={(e) =>
                  setReviewsFormInput((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="review-email"
              >
                <span className="text-sm text-[#ff0000] font-bold">* </span>Email:
              </label>
              <input
                className={classNames(
                  'shadow appearance-none border border-gray-300 rounded w-full md:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:shadow-outline',
                  {
                    'border-red-500': fieldErrors.email,
                  }
                )}
                id="review-email"
                type="email"
                onChange={(e) =>
                  setReviewsFormInput((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-end mt-4">
            <button
              className={classNames(
                'bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
                {
                  'opacity-50': loading,
                }
              )}
              type="submit"
              disabled={loading}
            >
              {loading ? loadingIndicator() : 'POST'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderYotpoForm = () => {
    return (
      <div
        className={classNames('w-full transition-all duration-300 ease-in-out', {
          'max-h-full opacity-100': isShowReviewForm,
          'max-h-0 opacity-0': !isShowReviewForm,
        })}
      >
        {hasFieldErrors && <ReviewFormErrorAlert {...fieldErrors} />}
        <form
          className="bg-white p-8"
          onSubmit={onSubmit}
        >
          <div className="mb-4">
            <h4 className="mb-2 text-sm text-[#6A6C77] font-bold">WRITE A REVIEW</h4>
            <div className="mb-4">
              <span className="text-sm text-[#ff0000] font-bold">* </span>
              <span className="text-sm text-[#6A6C77] font-semibold">
                Indicates a required field
              </span>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                <span className="text-sm text-[#ff0000] font-bold">* </span>Score
              </label>
              <Tooltip
                title={tooltipTitles[ratingHover]}
                placement={tooltipPlacement[ratingHover]}
              >
                <Rating
                  name="customized-color"
                  value={reviewsFormInput.rating}
                  onChange={(_event, newValue) => {
                    setReviewsFormInput((prevState) => ({
                      ...prevState,
                      rating: newValue as number,
                    }));
                  }}
                  icon={
                    <Star
                      className="w-5 h-5"
                      color={'default'}
                      size={'xs'}
                      fillColor="#BFB49A"
                      strokeColor="#BFB49A"
                    />
                  }
                  emptyIcon={
                    <EmptyStar
                      className="w-5 h-5"
                      color={'default'}
                      size={'xs'}
                      strokeColor="#BFB49A"
                    />
                  }
                  onChangeActive={(_event, newHover) => {
                    setRatingHover(newHover);
                  }}
                />
              </Tooltip>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="review-title"
            >
              <span className="text-sm text-[#ff0000] font-bold">* </span>Title:
            </label>
            <input
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:shadow-outline"
              id="review-title"
              type="text"
              onChange={(e) =>
                setReviewsFormInput((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="review-textarea"
            >
              <span className="text-sm text-[#ff0000] font-bold">* </span>Review:
            </label>
            <textarea
              id="review-textarea"
              className={classNames(
                'shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-0 focus:shadow-outline',
                {
                  'border-red-500': fieldErrors.body,
                }
              )}
              rows={4}
              maxLength={5000}
              onChange={(e) =>
                setReviewsFormInput((prevState) => ({
                  ...prevState,
                  body: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-end gap-5">
            <div>
              <label
                className="flex items-start md:items-center gap-1 text-gray-700 text-sm mb-2"
                htmlFor="review-name"
              >
                <span className="text-sm text-[#ff0000] font-bold">* </span>Use your name:
              </label>
              <input
                className={classNames(
                  'shadow appearance-none border border-gray-300 rounded w-full md:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:shadow-outline',
                  {
                    'border-red-500': fieldErrors.name,
                  }
                )}
                id="review-name"
                type="text"
                onChange={(e) =>
                  setReviewsFormInput((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="review-email"
              >
                <span className="text-sm text-[#ff0000] font-bold">* </span>Email:
              </label>
              <input
                className={classNames(
                  'shadow appearance-none border border-gray-300 rounded w-full md:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:shadow-outline',
                  {
                    'border-red-500': fieldErrors.email,
                  }
                )}
                id="review-email"
                type="email"
                onChange={(e) =>
                  setReviewsFormInput((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-end mt-4">
            <button
              className={classNames(
                'bg-brand-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
                {
                  'opacity-50': loading,
                }
              )}
              type="submit"
              disabled={loading}
            >
              {loading ? loadingIndicator() : 'POST'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderJudgeMeForm = () => {
    return (
      <div
        className={classNames('w-full transition-all duration-300 ease-in-out', {
          'max-h-full opacity-100': isShowReviewForm,
          'max-h-0 opacity-0': !isShowReviewForm,
        })}
      >
        {hasFieldErrors && <ReviewFormErrorAlert {...fieldErrors} />}
        <form
          className="bg-white p-8"
          onSubmit={onSubmit}
        >
          <div className="mb-4">
            <label
              className="flex items-start md:items-center gap-1 text-gray-700 text-sm mb-2"
              htmlFor="review-name"
            >
              Name (displayed publicly like {renderNameSelection()} )
            </label>
            <input
              className={classNames(
                'shadow appearance-none border border-gray-300 focus:border-brand-primary rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                {
                  'border-red-500': fieldErrors.name,
                }
              )}
              id="review-name"
              type="text"
              placeholder="Enter your name (public)"
              onChange={(e) =>
                setReviewsFormInput((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="review-email"
            >
              Email
            </label>
            <input
              className={classNames(
                'shadow appearance-none border border-gray-300 focus:border-brand-primary rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                {
                  'border-red-500': fieldErrors.email,
                }
              )}
              id="review-email"
              type="email"
              placeholder="Enter your email (private)"
              onChange={(e) =>
                setReviewsFormInput((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Rating</label>
            <Tooltip
              title={tooltipTitles[ratingHover]}
              placement={tooltipPlacement[ratingHover]}
            >
              <Rating
                name="customized-color"
                value={reviewsFormInput.rating}
                onChange={(_event, newValue) => {
                  setReviewsFormInput((prevState) => ({
                    ...prevState,
                    rating: newValue as number,
                  }));
                }}
                icon={
                  <Star
                    className="w-5 h-5"
                    color={'default'}
                    size={'xs'}
                  />
                }
                emptyIcon={
                  <EmptyStar
                    className="w-5 h-5"
                    color={'default'}
                    size={'xs'}
                  />
                }
                onChangeActive={(_event, newHover) => {
                  setRatingHover(newHover);
                }}
              />
            </Tooltip>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="review-title"
            >
              Review Title
            </label>
            <input
              className="shadow appearance-none border border-gray-300 focus:border-brand-primary rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="review-title"
              type="text"
              placeholder="Give your review a title"
              onChange={(e) =>
                setReviewsFormInput((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="review-textarea"
            >
              Review (5000)
            </label>
            <textarea
              id="review-textarea"
              className={classNames(
                'shadow appearance-none border border-gray-300 focus:border-brand-primary rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline',
                {
                  'border-red-500': fieldErrors.body,
                }
              )}
              rows={4}
              maxLength={5000}
              placeholder="Write your comments here"
              onChange={(e) =>
                setReviewsFormInput((prevState) => ({
                  ...prevState,
                  body: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className={classNames(
                'bg-brand-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
                {
                  'opacity-50': loading,
                }
              )}
              type="submit"
              disabled={loading}
            >
              {loading ? loadingIndicator() : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderReviewsForm = () => {
    return (
      <>
        {reviewService === 'judge.me' && renderJudgeMeForm()}
        {reviewService === 'yotpo' && renderYotpoForm()}
        {reviewService === 'woocommerce_native_reviews' && renderWooForm()}
      </>
    );
  };

  const renderReviewSummary = () => {
    return (
      <>
        {!isEmpty(product?.judgemeReviews) && reviewService === 'judge.me' && (
          <ReviewSummary
            average={product?.judgemeReviews?.average as number}
            count={totalItems}
            percentage={product?.judgemeReviews?.percentage}
            filterRating={filterRating}
          />
        )}
        {!isEmpty(customer?.stats) && reviewService === 'yotpo' && (
          <ReviewSummary
            average={customer?.stats?.average_score as number}
            count={customer?.stats?.total_review}
            progress={customer?.stats?.star_distribution}
            filterRating={filterRating}
          />
        )}
        {!isEmpty(product?.metaData?.wooProductReviews?.stats) &&
          reviewService === 'woocommerce_native_reviews' && (
            <ReviewSummary
              average={product?.metaData?.wooProductReviews?.stats?.average_rating as number}
              count={product?.metaData?.wooProductReviews?.stats?.count_reviews}
              progress={product?.metaData?.wooProductReviews?.stats?.stars_count}
              filterRating={filterRating}
            />
          )}
      </>
    );
  };

  const renderReviewsInfo = () => {
    return (
      <div
        className={cn('block space-y-10 md:flex justify-center items-start h-full pb-8', {
          'border-b border-b-[#C5C6CA]': reviewService === 'yotpo',
        })}
      >
        {renderReviewSummary()}
        {reviewService === 'reviews.io' && (
          <Link
            href={`https://www.reviews.io/company-reviews/store/${kebabCase(
              removeHttp(NEXT_PUBLIC_LIVE_URL)
            )}`}
            passHref
            target="_blank"
            className="flex items-center justify-center border border-brand-primary bg-white py-4 px-10 rounded-md w-48 h-10 text-brand-primary"
          >
            Write Review
          </Link>
        )}
        {reviewService === 'judge.me' && (
          <button
            onClick={toggleShowReviewForm}
            className="flex items-center justify-center border border-brand-primary bg-white py-4 px-10 rounded-md w-48 h-10 text-brand-primary"
          >
            {isShowReviewForm ? 'Cancel' : 'Write Review'}
          </button>
        )}
        {reviewService === 'yotpo' && (
          <button
            onClick={toggleShowReviewForm}
            className="flex flex-row items-center justify-center border border-brand-primary bg-brand-primary p-2.5 w-44 text-white text-sm"
          >
            {isShowReviewForm ? 'Cancel' : 'Write Review'}
          </button>
        )}
        {reviewService === 'woocommerce_native_reviews' && (
          <button
            onClick={toggleShowReviewForm}
            className="flex flex-row items-center justify-center border border-[#0101011a] bg-white p-2.5 w-44 text-black text-sm"
          >
            {isShowReviewForm ? 'Cancel' : 'Write Your Review'}
          </button>
        )}
      </div>
    );
  };

  const handleRatingChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentRating = e.target.value;
    setSelectedRating(currentRating);
  };

  const renderReviewsContent = () => {
    return (
      <>
        {renderReviewsInfo()}
        {reviewService === 'woocommerce_native_reviews' && (
          <>
            <select
              className="bg-black py-2.5 px-8 text-white text-sm font-light mb-2.5"
              onChange={handleRatingChange}
            >
              <option
                selected
                value=""
              >
                All stars({product?.metaData?.wooProductReviews?.stats?.count_reviews ?? 0})
              </option>
              <option value={5}>
                5 stars({product?.metaData?.wooProductReviews?.stats?.stars_count?.rating_5 ?? 0})
              </option>
              <option value={4}>
                4 stars({product?.metaData?.wooProductReviews?.stats?.stars_count?.rating_4 ?? 0})
              </option>
              <option value={3}>
                3 stars({product?.metaData?.wooProductReviews?.stats?.stars_count?.rating_3 ?? 0})
              </option>
              <option value={2}>
                2 stars({product?.metaData?.wooProductReviews?.stats?.stars_count?.rating_2 ?? 0})
              </option>
              <option value={1}>
                1 stars({product?.metaData?.wooProductReviews?.stats?.stars_count?.rating_1 ?? 0})
              </option>
            </select>
          </>
        )}
        {isSubmitted && <ReviewFormSuccessAlert />}
        {isShowReviewForm && renderReviewsForm()}
        {renderReviewItems()}
      </>
    );
  };

  return (
    <div
      id="review-tab"
      data-review-count={totalItems}
    >
      {reviewService === 'reviews.io' && (
        <>
          {renderReviewsContent()}
          {renderReviewsIoProvider()}
        </>
      )}
      {reviewService === 'judge.me' && (
        <>
          {renderReviewsContent()}
          {isEmpty(product?.judgemeReviews?.content) && (
            <>
              {!isShowReviewForm && (
                <>
                  <div className="mt-5 flex flex-row items-center justify-center ">
                    <RatingStars rating={5} />
                  </div>
                  <button
                    onClick={toggleShowReviewForm}
                    className="mx-auto mt-5 flex items-center justify-center border border-brand-primary bg-white py-4 px-10 rounded-md h-10 text-brand-primary"
                  >
                    BE THE FIRST TO WRITE A REVIEW
                  </button>
                </>
              )}
            </>
          )}
          {renderJudgeMeReviewsCount()}
        </>
      )}
      {reviewService === 'yotpo' && (
        <>
          {renderYotpoProvider()}
          {renderReviewsContent()}
          {isEmpty(customer?.reviews) && (
            <>
              {!isShowReviewForm && (
                <>
                  <div className="mt-5 flex flex-row items-center justify-center ">
                    <RatingStars
                      rating={5}
                      color="#BFB49A"
                    />
                  </div>
                  <button
                    onClick={toggleShowReviewForm}
                    className="mx-auto mt-5 flex flex-row items-center justify-center border border-brand-primary bg-brand-primary p-2.5 text-white text-sm"
                  >
                    BE THE FIRST TO WRITE A REVIEW
                  </button>
                </>
              )}
            </>
          )}
          {renderYotpoReviewsCount()}
        </>
      )}
      {reviewService === 'woocommerce_native_reviews' && (
        <>
          {renderReviewsContent()}
          {isEmpty(product?.metaData?.wooProductReviews?.reviews) && (
            <>
              {!isShowReviewForm && (
                <>
                  <div className="mt-5 flex flex-row items-center justify-center ">
                    <RatingStars
                      rating={5}
                      color="#ffb600"
                    />
                  </div>
                  <button
                    onClick={toggleShowReviewForm}
                    className="mx-auto mt-5 flex flex-row items-center justify-center border border-brand-primary bg-black p-2.5 text-white text-sm"
                  >
                    BE THE FIRST TO WRITE A REVIEW
                  </button>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
