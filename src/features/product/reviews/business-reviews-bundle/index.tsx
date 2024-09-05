import { useEffect, useState, useRef } from 'react';
import Glider from 'react-glider';
import Link from 'next/link';
import Image from 'next/image';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import { ReviewItemSkeleton } from '@src/features/product/reviews/review-item-skeleton';
import { RealGoogle } from '@src/components/svg/real-google';
import { useSiteContext } from '@src/context/site-context';
import { Rating } from '@src/features/product/rating';

type TBRBData = {
  status: string;
  grade: string;
  href: string;
  popupLink: string;
  reviews: {
    image: string;
    name: string;
    rating: string;
    review: string;
  }[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _rplg_popup = (a: any, b: any, c: any) => {
  const g = document.documentElement;
  a = window.open(
    a,
    '',
    'scrollbars=yes, width=' +
      b +
      ', height=' +
      c +
      ', top=' +
      ((window.innerHeight ? window.innerHeight : g.clientHeight ? g.clientHeight : screen.height) /
        2 -
        c / 2 +
        (void 0 != window.screenTop ? window.screenTop : window.screenY)) +
      ', left=' +
      ((window.innerWidth ? window.innerWidth : g.clientWidth ? g.clientWidth : screen.width) / 2 -
        b / 2 +
        (void 0 != window.screenLeft ? window.screenLeft : window.screenX))
  );
  window.focus;
  a.focus();
  return a;
};

export const BusinessReviewsBundle = () => {
  const { settings } = useSiteContext();
  const [brbData, setbrbData] = useState<TBRBData | null>(null);

  const leftArrow = useRef(null);
  const rightArrow = useRef(null);
  const [gliderPage, setGliderPage] = useState(1);

  const onRightArrowClick = () => {
    setGliderPage((prevState) => prevState + 1);
  };

  const onLeftArrowClick = () => {
    setGliderPage((prevState) => prevState - 1);
  };

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/reviews/business-reviews-bundle/', {
      signal: controller.signal,
      next: { revalidate: 7200 },
    })
      .then((res) => res.json())
      .then((json) => {
        setbrbData(json.data as TBRBData);
      });
  }, []);

  if (settings?.store?.reviewsPlugin !== 'business-reviews-bundle') return null;

  if (!brbData) return <ReviewItemSkeleton />;

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
        <div className="flex flex-col gap-y-2 p-4 w-72 relative">
          <RealGoogle className="absolute right-2 top-2 inline-block bg-white rounded-full" />
          <div className="text-[#154fc1] font-bold text-base">{brbData.status}</div>
          <div className="flex gap-2">
            <div className="text-[#fb7900] text-lg font-bold">{brbData.grade}</div>
            <Rating
              rating={Number(brbData.grade)}
              color="#fb7900"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Link
              href={brbData.href}
              target="_blank"
              className="p-2 inline-block break-keep !text-white text-[0.65em] leading-4 bg-[#0a6cff] rounded-full whitespace-nowrap"
            >
              See all reviews
            </Link>
            <a
              href="#"
              className="p-2 inline-block break-keep !text-white text-[0.65em] leading-4 bg-[#0a6cff] rounded-full whitespace-nowrap"
              onClick={() => {
                _rplg_popup(brbData.popupLink, 800, 600);
              }}
            >
              Review us on <RealGoogle className="inline-block bg-white rounded-full" />
            </a>
          </div>
        </div>
        <div className="w-full md:w-[480px] flex flex-row items-center lg:w-[931px] justify-center">
          <div
            ref={leftArrow}
            onClick={onLeftArrowClick}
            className="cursor-pointer"
          >
            <ChevronLeftIcon
              width={24}
              height={24}
              color="#888888"
            />
          </div>
          <Glider
            draggable
            hasArrows
            className="max-w-[80vw] md:max-w-full overflow-hidden"
            slidesToShow={1}
            slidesToScroll={1}
            responsive={[
              {
                breakpoint: 960,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                },
              },
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
            ]}
            arrows={{
              prev: leftArrow.current,
              next: rightArrow.current,
            }}
            rewind={true}
          >
            {(brbData.reviews || []).map((review, index) => (
              <div
                key={`review-${index}`}
                className="!h-60 m-3 p-3 bg-[#f5f5f5] rounded relative !content-baseline overflow-hidden"
              >
                <RealGoogle className="absolute right-2 top-2 inline-block bg-white rounded-full" />
                <div className="grid grid-cols-[56px_auto] gap-x-2 h-full grid-rows-[28px_28px_auto]">
                  <div className="row-span-2 w-16">
                    <Image
                      src={review.image}
                      alt={review.name}
                      width={56}
                      height={56}
                      className="rounded-full"
                    />
                  </div>
                  <div className="text-[#154fc1] font-bold text-sm">{review.name}</div>
                  <div>
                    {' '}
                    <Rating
                      rating={Number(review.rating)}
                      color="#fb7900"
                    />
                  </div>
                  <div className="pt-2 row-span-2 col-span-2 h-auto overflow-y-scroll">
                    {review.review}
                  </div>
                </div>
              </div>
            ))}
          </Glider>
          <div
            ref={rightArrow}
            onClick={onRightArrowClick}
            className="cursor-pointer"
          >
            <ChevronRightIcon
              width={24}
              height={24}
              color="#888888"
            />
          </div>
        </div>
      </div>
    </>
  );
};
