import { isEmpty, reduce } from 'lodash';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import GliderComponent from 'react-glider';
import { v4 } from 'uuid';

import { PrefetchLink } from '@src/components/common/prefetch-link';
import { ArrowRoundLeft } from '@components/svg/arrow-round-left';
import { ArrowRoundRight } from '@components/svg/arrow-round-right';
import { usePageContext } from '@src/context/page-context';
import { useSiteContext } from '@src/context/site-context';
import { unixToDate } from '@src/lib/helpers/date';
import { emptyImagePlaceholder } from '@src/lib/constants/image';
import { RawLink } from '@src/components/common/raw-link';
import { PageTypesenseResponse } from '@src/lib/typesense/page';
import { cn } from '@src/lib/helpers/helper';
import { Day, Month, Year } from '@src/lib/types/date';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type Props = {
  blogCount?: number;
  imageClasses?: string;
  titleClasses?: string;
  dateClasses?: string;
  descriptionClasses?: string;
  readMoreClasses?: string;
  cardContentClasses?: string;
};

export const BlogPosts = ({
  blogCount,
  imageClasses,
  titleClasses,
  dateClasses,
  descriptionClasses,
  readMoreClasses,
  cardContentClasses,
}: Props) => {
  const { settings } = useSiteContext();
  const { blogPosts } = usePageContext();
  const blogsSettings = settings?.homepage?.layout?.blogs;
  const leftArrow = useRef(null);
  const rightArrow = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [gliderPage, setGliderPage] = useState(1);

  const blogYear: Year | string = settings?.store?.date?.year ?? 'numeric';
  const blogMonth: Month | string = settings?.store?.date?.month ?? 'numeric';
  const blogDay: Day | string = settings?.store?.date?.day ?? 'numeric';

  const restructureBlogPosts = () =>
    reduce(
      blogPosts,
      (result: PageTypesenseResponse[], postData: PageTypesenseResponse) => {
        if (!isEmpty(postData?.thumbnail)) {
          result.push(postData);
        }
        return result;
      },
      []
    );

  const isLeftArrowHidden = gliderPage === 1;
  const isRightArrowHidden =
    (restructureBlogPosts()?.slice(0, blogCount)?.length as number) / 4 <= gliderPage;

  const isLeftArrowMobileHidden = gliderPage === 1;
  const isRightArrowMobileHidden =
    (restructureBlogPosts()?.slice(0, blogCount)?.length as number) / 1 <= gliderPage;

  const onRightArrowClick = () => {
    setGliderPage((prevState) => prevState + 1);
  };

  const onLeftArrowClick = () => {
    setGliderPage((prevState) => prevState - 1);
  };

  if (!blogCount || isEmpty(restructureBlogPosts())) {
    return null;
  }

  return (
    <div className={cn('homepage-blog-posts md:px-4', settings?.productCardShapeClasses)}>
      <div className="my-12 block w-full relative group">
        <div
          ref={leftArrow}
          className={cn(
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
                slidesToShow: 4,
                slidesToScroll: 4,
              },
            },
          ]}
          arrows={{
            prev: leftArrow.current,
            next: rightArrow.current,
          }}
        >
          {restructureBlogPosts()
            ?.slice(0, blogCount)
            ?.map((blog) => {
              const blogDate = unixToDate(blog?.publishedAt as number);
              const newBlogDate = new Date(blogDate);
              const blogFormattedDate = newBlogDate.toLocaleDateString(
                `${settings?.store?.date?.format ?? 'en-US'}`,
                {
                  year: blogYear as Year,
                  month: blogMonth as Month,
                  day: blogDay as Day,
                }
              );
              const splitSrc = blog?.thumbnail?.src?.split('/');
              const srcName = splitSrc?.[splitSrc?.length - 1];
              const newImageUrl = `/images/blog/${srcName}`;
              return (
                <div
                  key={v4()}
                  className={cn(cardContentClasses)}
                >
                  <div
                    className={cn(
                      imageClasses,
                      'aspect-w-1 relative cursor-pointer mb-3.5',
                      settings?.productCardAspectRatioClasses
                    )}
                  >
                    <PrefetchLink
                      unstyled
                      href={blog?.permalink}
                    >
                      {!isEmpty(blog?.thumbnail) ? (
                        <Image
                          src={newImageUrl as string}
                          alt={(blog?.thumbnail?.altText as string) ?? blog?.thumbnail?.title}
                          width={374}
                          height={249}
                          className="absolute h-full w-full object-cover object-center"
                        />
                      ) : (
                        <Image
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
                    {settings?.homepage?.layout?.blogs?.date?.enabled && (
                      <span className={cn(dateClasses)}>{blogFormattedDate}</span>
                    )}
                    <span className={cn(titleClasses, 'mt-3.5 text-2xl cursor-pointer')}>
                      <PrefetchLink
                        unstyled
                        href={blog?.permalink}
                      >
                        {blog?.name}
                      </PrefetchLink>
                    </span>
                    {settings?.homepage?.layout?.blogs?.description?.enabled && (
                      <span className={cn(descriptionClasses, 'mt-2 line-clamp-4')}>
                        {blog?.content && <ReactHTMLParser html={blog?.content as string} />}
                      </span>
                    )}
                    {
                      <RawLink
                        className={cn(
                          readMoreClasses,
                          'mt-3.5 flex flex-column items-center space-x-2.5'
                        )}
                        href={blog?.permalink}
                      >
                        <span
                          className={cn({
                            capitalize:
                              blogsSettings?.readMore?.casing === 'capitalized' ||
                              !blogsSettings?.readMore?.casing,
                            uppercase: blogsSettings?.readMore?.casing === 'uppercase',
                          })}
                        >
                          Read More
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="15"
                          viewBox="0 0 14 15"
                          fill="none"
                        >
                          <path
                            d="M6.58768 3.21456C6.81549 2.98675 7.18484 2.98675 7.41264 3.21456L11.496 7.29789C11.7238 7.52569 11.7238 7.89504 11.496 8.12285L7.41264 12.2062C7.18484 12.434 6.81549 12.434 6.58768 12.2062C6.35988 11.9784 6.35988 11.609 6.58768 11.3812L9.67521 8.2937H2.91683C2.59466 8.2937 2.3335 8.03253 2.3335 7.71037C2.3335 7.3882 2.59466 7.12703 2.91683 7.12703H9.67521L6.58768 4.03951C6.35988 3.81171 6.35988 3.44236 6.58768 3.21456Z"
                            fill={blogsSettings?.readMore?.font?.color}
                          />
                        </svg>
                      </RawLink>
                    }
                  </div>
                </div>
              );
            })}
        </GliderComponent>

        <div
          ref={rightArrow}
          className={cn(
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
