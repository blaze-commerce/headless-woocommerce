import cx from 'classnames';
import { isEmpty, uniqueId } from 'lodash';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import GliderComponent from 'react-glider';

import { Rating } from '@src/features/product/rating';
import { ArrowRoundLeft } from '@components/svg/arrow-round-left';
import { ArrowRoundRight } from '@components/svg/arrow-round-right';
import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';
import { Store } from '@src/models/settings/store';
import { cn } from '@src/lib/helpers/helper';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type TestimonialItems = {
  author: string;
  authorClasses: string;
  authorImage: string;
  authorImageClasses: string;
  content: string;
  contentClasses: string;
};

type Props = {
  testimonials: TestimonialItems[];
};

const ReviewItem = (review: TestimonialItems) => {
  const { author, authorClasses, authorImage, authorImageClasses, content, contentClasses } =
    review;
  const { settings } = useSiteContext();
  const { store } = settings as Settings;
  const { reviewService } = store as Store;

  const authorClassNames = cn(authorClasses, '');
  const authorImageClassNames = cn(authorImageClasses, '');
  const contentClassNames = cn(contentClasses, '');
  let ratingColor = '';

  switch (reviewService) {
    case 'woocommerce_native_reviews':
      ratingColor = '#F0AD4E';
      break;
  }

  return (
    <div>
      <div className="flex items-start gap-5 mb-5">
        {authorImage && (
          <div className={cn(authorImageClassNames)}>
            <Image
              src={authorImage as string}
              alt={'Customer Testimonials'}
              width={100}
              height={100}
            />
          </div>
        )}

        <div className="space-y-1 w-full">
          {author && (
            <div className="flex gap-2 items-center">
              <p className={cn(authorClassNames)}>{author}</p>
            </div>
          )}
          <div className="flex gap-1 items-center">
            <Rating
              rating={5}
              color={ratingColor}
            />
          </div>
          {content && (
            <div className="w-full">
              <p className={contentClassNames}>
                <ReactHTMLParser html={content} />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const CustomerTestimonials = ({ testimonials }: Props) => {
  const leftArrow = useRef(null);
  const rightArrow = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [gliderPage, setGliderPage] = useState(1);

  const isLeftArrowHidden = gliderPage === 1;
  const isRightArrowHidden = (testimonials?.length as number) / 4 <= gliderPage;

  const isLeftArrowMobileHidden = gliderPage === 1;
  const isRightArrowMobileHidden = (testimonials?.length as number) / 1 <= gliderPage;

  if (isEmpty(testimonials)) return null;

  const onRightArrowClick = () => {
    setGliderPage((prevState) => prevState + 1);
  };

  const onLeftArrowClick = () => {
    setGliderPage((prevState) => prevState - 1);
  };

  if (isEmpty(testimonials)) return null;

  return (
    <div className="homepage-customer-testimonials md:px-4">
      <div className="my-12 block w-full relative group">
        <div
          ref={leftArrow}
          className={cx(
            'absolute z-10 lg:z-[2] top-1/2 -translate-y-4 cursor-pointer ml-2 md:ml-4 opacity-70 hover:opacity-100',
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
          hasDots
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
          {testimonials?.map((review) => {
            return (
              <ReviewItem
                key={uniqueId()}
                {...review}
              />
            );
          })}
        </GliderComponent>

        <div
          ref={rightArrow}
          className={cx(
            'absolute z-10 lg:z-0 top-1/2 -translate-y-4 right-0 cursor-pointer mr-2 md:mr-4 opacity-70 hover:opacity-100',
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
