import { Carousel } from 'react-responsive-carousel';

import { ArrowRoundLeft } from '@components/svg/arrow-round-left';
import { ArrowRoundRight } from '@components/svg/arrow-round-right';

type Testimony = {
  authorName: string;
  authorPosition: string;
  text: string;
};

type Props = {
  testimonials: Testimony[];
};

const Qoute = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.9395 19.1434V35.627H0.774658V20.4621L8.02743 0.516968H15.9395L9.84062 19.1434H15.9395ZM35.2253 19.1434V35.627H20.0604V20.4621L27.3132 0.516968H35.2253L29.1264 19.1434H35.2253Z"
        fill="#CBD2E0"
      />
    </svg>
  );
};

export const Testimonial = ({ testimonials }: Props) => {
  return (
    <div>
      <div className="flex justify-center mt-10 mb-14">
        <Qoute />
      </div>
      <Carousel
        showStatus={false}
        showThumbs={false}
        autoPlay
        infiniteLoop
        dynamicHeight
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <div
              onClick={onClickHandler}
              title={label}
              className="absolute z-10 lg:z-[2] top-1/2 -translate-y-12 cursor-pointer"
            >
              <ArrowRoundLeft />
            </div>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <div
              onClick={onClickHandler}
              title={label}
              className="absolute z-10 lg:z-0 top-1/2 -translate-y-12 right-0 cursor-pointer"
            >
              <ArrowRoundRight />
            </div>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          if (isSelected) {
            return (
              <li
                aria-label={`Selected: ${label} ${index + 1}`}
                title={`Selected: ${label} ${index + 1}`}
                className="w-2.5 h-2.5 bg-slate-400 rounded-full inline-block mx-1"
              />
            );
          }
          return (
            <li
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              title={`${label} ${index + 1}`}
              aria-label={`${label} ${index + 1}`}
              className="w-2.5 h-2.5 bg-slate-200 rounded-full inline-block mx-1"
            />
          );
        }}
      >
        {testimonials.map(({ authorName, authorPosition, text }) => {
          return (
            <div
              key={text}
              className="pb-10"
            >
              <div className="w-10/12 mx-auto">{text}</div>
              {authorName && <div className="mt-4 font-bold">{authorName}</div>}
              {authorPosition && <div className="text-sm">{authorPosition}</div>}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
