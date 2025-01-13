import NextImage from 'next/image';

import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { v4 } from 'uuid';
import { useRef, useState } from 'react';
import { ArrowRoundLeft } from '@src/components/svg/arrow-round-left';
import GliderComponent from 'react-glider';
import { ArrowRoundRight } from '@src/components/svg/arrow-round-right';
import { isMobile } from 'react-device-detect';
import { getAttributeValue } from '@src/lib/block';
import { isEmpty } from 'lodash';
import { PrefetchLink } from '@src/components/common/prefetch-link';
import { emptyImagePlaceholder } from '@src/lib/constants/image';
import { RawLink } from '@src/components/common/raw-link';
import { Day, Month, Year } from '@src/lib/types/date';
import { ParsedBlock } from '@src/components/blocks';
import { unixToDate } from '@src/lib/helpers/date';
import { PageTypesenseResponse } from '@src/lib/typesense/page';
import { usePageContext } from '@src/context/page-context';
import { ArrowRight3 } from '@src/components/svg/arrow-right-3';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type Props = {
  block: ParsedBlock;
};

export const BlogPosts = ({ block }: Props) => {
  const leftArrow = useRef(null);
  const rightArrow = useRef(null);
  const { blogPosts } = usePageContext();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [gliderPage, setGliderPage] = useState(1);
  const blockAttribute = block.attrs as BlockAttributes;
  const htmlAttributes = blockAttribute.htmlAttributes ?? [];
  const desktopSlidesToShow =
    getAttributeValue(htmlAttributes, 'data-desktop-slides-to-show') ?? '4';
  const mobileSlidesToShow = getAttributeValue(htmlAttributes, 'data-mobile-slides-to-show') ?? '2';
  const hasArrows = getAttributeValue(htmlAttributes, 'data-has-arrows') === '1' ?? false;
  const hasDots = getAttributeValue(htmlAttributes, 'data-has-pagination-dots') === '1' ?? false;
  const isLeftArrowHidden = gliderPage === 1;
  const isRightArrowHidden =
    block.innerBlocks?.[0]?.innerBlocks?.length / +desktopSlidesToShow <= gliderPage;
  const isLeftArrowMobileHidden = gliderPage === 1;
  const isRightArrowMobileHidden =
    (block.innerBlocks?.[0]?.innerBlocks?.length as number) / +mobileSlidesToShow <= gliderPage;

  const onRightArrowClick = () => {
    setGliderPage((prevState) => prevState + 1);
  };

  const onLeftArrowClick = () => {
    setGliderPage((prevState) => prevState - 1);
  };
  const blogCount = getAttributeValue(htmlAttributes, 'data-blog-count');

  const blogYear: Year | string =
    getAttributeValue(htmlAttributes, 'data-year-format') ?? 'numeric';
  const blogMonth: Month | string =
    getAttributeValue(htmlAttributes, 'data-month-format') ?? 'numeric';
  const blogDay: Day | string = getAttributeValue(htmlAttributes, 'data-day-format') ?? 'numeric';
  const blogDateFormat = getAttributeValue(htmlAttributes, 'data-date-format') ?? 'en-US';
  const hasDateEnabled = (getAttributeValue(htmlAttributes, 'data-date-enabled') ?? '0') === '1';
  const hasDescriptionEnabled =
    (getAttributeValue(htmlAttributes, 'data-description-enabled') ?? '0') === '1';
  const hasReadMoreEnabled =
    (getAttributeValue(htmlAttributes, 'data-read-more-enabled') ?? '0') === '1';

  const cardClasses = getAttributeValue(htmlAttributes, 'data-card-class') ?? '';
  const imageContainerClasses =
    getAttributeValue(htmlAttributes, 'data-image-container-class') ?? '';
  const imageClasses = getAttributeValue(htmlAttributes, 'data-image-class') ?? '';
  const dateClasses = getAttributeValue(htmlAttributes, 'data-date-class') ?? '';
  const titleClasses = getAttributeValue(htmlAttributes, 'data-title-class') ?? '';
  const descriptionClasses = getAttributeValue(htmlAttributes, 'data-description-class') ?? '';
  const readMoreClasses = getAttributeValue(htmlAttributes, 'data-read-more-class') ?? '';
  const arrowFillColor = getAttributeValue(htmlAttributes, 'data-arrow-fill-color') ?? '';

  if (isEmpty(blogPosts)) {
    return null;
  }

  return (
    <div className={cn(blockAttribute.className)}>
      {hasArrows && (
        <div
          ref={leftArrow}
          className={cn(
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
      )}
      <GliderComponent
        hasDots={hasDots}
        draggable
        hasArrows={hasArrows}
        slidesToShow={+mobileSlidesToShow}
        slidesToScroll={+mobileSlidesToShow}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: +desktopSlidesToShow,
              slidesToScroll: +desktopSlidesToShow,
            },
          },
        ]}
        arrows={{
          prev: leftArrow.current,
          next: rightArrow.current,
        }}
      >
        {(blogPosts as PageTypesenseResponse[])?.slice(0, +(blogCount as string))?.map((blog) => {
          const blogDate = unixToDate(blog?.publishedAt as number);
          const newBlogDate = new Date(blogDate);
          const blogFormattedDate = newBlogDate.toLocaleDateString(`${blogDateFormat}`, {
            year: blogYear as Year,
            month: blogMonth as Month,
            day: blogDay as Day,
          });

          return (
            <div
              key={v4()}
              className={cn(cardClasses)}
            >
              <div className={cn(imageContainerClasses)}>
                <PrefetchLink
                  unstyled
                  href={blog?.permalink}
                >
                  {!isEmpty(blog?.thumbnail) && blog?.thumbnail?.src ? (
                    <NextImage
                      src={blog?.thumbnail?.src as string}
                      alt={(blog?.thumbnail?.altText as string) ?? blog?.thumbnail?.title}
                      width={374}
                      height={249}
                      className={cn(imageClasses, 'absolute object-cover object-center')}
                    />
                  ) : (
                    <NextImage
                      src={emptyImagePlaceholder}
                      alt="Thumbnail"
                      width={374}
                      height={249}
                      className="absolute h-full w-full p-10 bg-gray-200 object-contain object-center"
                    />
                  )}
                </PrefetchLink>
              </div>
              <div className="mx-4">
                {hasDateEnabled && <span className={cn(dateClasses)}>{blogFormattedDate}</span>}
                <span className={cn(titleClasses, 'mt-3.5 text-2xl cursor-pointer')}>
                  <PrefetchLink
                    unstyled
                    href={blog?.permalink}
                  >
                    {blog?.name}
                  </PrefetchLink>
                </span>
                {hasDescriptionEnabled && (
                  <span className={cn(descriptionClasses, 'mt-2 line-clamp-4')}>
                    {blog?.content && <ReactHTMLParser html={blog?.content} />}
                  </span>
                )}
                {hasReadMoreEnabled && (
                  <RawLink
                    className={cn(
                      readMoreClasses,
                      'mt-3.5 flex flex-column items-center space-x-2.5'
                    )}
                    href={blog?.permalink}
                  >
                    <span>Read More</span>
                    <ArrowRight3
                      strokeColor={arrowFillColor}
                      width={16}
                      height={16}
                    />
                  </RawLink>
                )}
              </div>
            </div>
          );
        })}
      </GliderComponent>

      {hasArrows && (
        <div
          ref={rightArrow}
          className={cn(
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
      )}
    </div>
  );
};
