import cx from 'classnames';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import GliderComponent from 'react-glider';
import { v4 } from 'uuid';

import { Rating } from '@src/features/product/rating';
import { ArrowRoundLeft } from '@components/svg/arrow-round-left';
import { ArrowRoundRight } from '@components/svg/arrow-round-right';
import { PrefetchLink } from '@src/components/common/prefetch-link';
import { usePageContext } from '@src/context/page-context';
import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';
import { Store } from '@src/models/settings/store';
import { YotpoReviews } from '@src/lib/types/reviews';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type Props = {
  classes: string;
  title: string;
};

const ReviewItem = (review: YotpoReviews) => {
  const {
    score,
    content,
    title,
    verified_buyer,
    user,
    product_name,
    product_permalink,
    product_thumbnail_src,
  } = review;
  const { settings } = useSiteContext();
  const { store } = settings as Settings;
  const { reviewService } = store as Store;

  let ratingColor = '';

  switch (reviewService) {
    case 'yotpo':
      ratingColor = '#BFB49A';
      break;
  }

  return (
    <div>
      <div className="flex items-start gap-5 mb-5">
        <PrefetchLink
          unstyled
          href={product_permalink as string}
        >
          <div className="relative w-16 h-16 flex flex-col ">
            <Image
              src={product_thumbnail_src as string}
              alt={product_name as string}
              width={100}
              height={100}
              className="w-16 h-16"
            />
            <span className="mt-2 text-xs">{product_name}</span>
          </div>
        </PrefetchLink>

        <div className="space-y-1 w-56">
          <div className="flex gap-2 items-center">
            <p className="text-sm font-bold text-black">{user?.display_name}</p>
            {verified_buyer && <p className="font-normal text-sm text-[#6A6C77]">Verified Buyer</p>}
          </div>
          <div className="flex gap-1 items-center">
            <Rating
              rating={score as number}
              color={ratingColor}
            />
          </div>
          <div className="w-full">
            <div className="mt-6 flex gap-2 items-center">
              {title && <p className="text-sm font-semibold text-[#4D4D4D]">{title}</p>}
            </div>
            {content ? (
              <p className="text-sm text-[#6B6D79] font-normal">
                <ReactHTMLParser html={content} />
              </p>
            ) : (
              <p className="text-sm text-[#6B6D79] font-normal">
                Reviewer didn&apos;t leave any comments
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CustomerReviews = ({ classes, title }: Props) => {
  const { homepageReviews } = usePageContext();
  const leftArrow = useRef(null);
  const rightArrow = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const classNames = cx(classes, '');
  const [gliderPage, setGliderPage] = useState(1);

  const isLeftArrowHidden = gliderPage === 1;
  const isRightArrowHidden = (homepageReviews?.length as number) / 4 <= gliderPage;

  const isLeftArrowMobileHidden = gliderPage === 1;
  const isRightArrowMobileHidden = (homepageReviews?.length as number) / 1 <= gliderPage;

  const onRightArrowClick = () => {
    setGliderPage((prevState) => prevState + 1);
  };

  const onLeftArrowClick = () => {
    setGliderPage((prevState) => prevState - 1);
  };

  if (isEmpty(homepageReviews)) return null;

  return (
    <div className="homepage-customer-reviews md:px-4">
      <h3 className={classNames}>{title}</h3>
      <div className="my-12 block w-full relative group">
        <div
          ref={leftArrow}
          className={cx(
            'md:hidden absolute z-10 lg:z-[2] top-1/2 -translate-y-4 cursor-pointer ml-2 md:ml-4 opacity-70 hover:opacity-100',
            {
              'opacity-100': isMouseDown,
              hidden: isLeftArrowMobileHidden && isMobile,
              'md:hidden': isLeftArrowHidden && !isMobile,
            }
          )}
          onClick={onLeftArrowClick}
        >
          <ArrowRoundLeft />
        </div>

        <GliderComponent
          draggable
          hasArrows
          slidesToShow={1}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
          ]}
          arrows={{
            prev: leftArrow.current,
            next: rightArrow.current,
          }}
        >
          {homepageReviews?.map((review) => (
            <ReviewItem
              key={v4()}
              {...review}
            />
          ))}
        </GliderComponent>

        <div
          ref={rightArrow}
          className={cx(
            'md:hidden absolute z-10 lg:z-0 top-1/2 -translate-y-4 right-0 cursor-pointer mr-2 md:mr-4 opacity-70 hover:opacity-100',
            {
              'opacity-100': isMouseDown,
              hidden: isRightArrowMobileHidden && isMobile,
              'md:hidden': isRightArrowHidden && !isMobile,
            }
          )}
          onClick={onRightArrowClick}
          onTouchStart={() => setIsMouseDown(true)}
          onTouchEnd={() => setIsMouseDown(false)}
        >
          <ArrowRoundRight />
        </div>
      </div>
    </div>
  );
};
