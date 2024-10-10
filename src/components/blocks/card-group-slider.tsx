import { Dictionary } from '@reduxjs/toolkit';
import classNames from 'classnames';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Glider from 'react-glider';

import { PrefetchLink } from '@src/components/common/prefetch-link';
import { ArrowRoundLeft } from '@components/svg/arrow-round-left';
import { ArrowRoundRight } from '@components/svg/arrow-round-right';
import { useSiteContext } from '@src/context/site-context';
import { Shop } from '@src/models/settings/shop';
import { cn } from '@src/lib/helpers/helper';

type Card = {
  imageUrl: string;
  redirectUrl: string;
  title: string;
};

type Props = {
  cards: Card[];
  config?: Dictionary<string>;
  blockId?: string;
};

export const CardGroupSlider = ({ cards, config, blockId }: Props) => {
  const { settings } = useSiteContext();
  const { layout } = settings?.shop as Shop;
  const leftArrow = useRef(null);
  const rightArrow = useRef(null);
  const cardCount = cards?.length;
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [gliderPage, setGliderPage] = useState(1);

  const isLeftArrowHidden = gliderPage === 1;
  const isRightArrowHidden = cards.length / 4 <= gliderPage;

  const isLeftArrowMobileHidden = gliderPage === 1;
  const isRightArrowMobileHidden = cards.length / 2 <= gliderPage;

  const onRightArrowClick = () => {
    setGliderPage((prevState) => prevState + 1);
  };

  const onLeftArrowClick = () => {
    setGliderPage((prevState) => prevState - 1);
  };

  const cardStyles: React.CSSProperties = {};
  if (layout?.productCards?.imagePadding !== 0) {
    cardStyles.padding = `${layout?.productCards?.imagePadding}px`;
  }

  const containerClass = cn(
    'card-group-slider block w-full relative group',
    config?.containerClass,
    {
      'card-group-slider-border': blockId === 'cardGroupSliderBorder',
      'card-group-slider-pagination': blockId === 'cardGroupSliderPagination',
    }
  );

  const cardContainerClass = cn(config?.cardContainerClass, {
    'w-full h-full lg:h-auto bg-white flex-col justify-start items-center gap-2 inline-flex':
      !config?.cardContainerClass,
    'border border-solid border-[#CDCDCD] max-w-xs':
      layout?.productCards?.hasBorders && blockId === 'cardGroupSliderBorder',
  });

  return (
    <div className={containerClass}>
      {cardCount > 4 && (
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

      <Glider
        draggable
        hasDots={settings?.homepage?.layout?.featuredProducts?.hasDots}
        hasArrows
        slidesToShow={2}
        slidesToScroll={2}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: cardCount > 4 ? 5 : 4,
              slidesToScroll: cardCount > 4 ? 5 : 4,
            },
          },
        ]}
        arrows={{
          prev: leftArrow.current,
          next: rightArrow.current,
        }}
      >
        {cards.map((card) => {
          const { title, imageUrl, redirectUrl } = card;
          const cardContent = (
            <div
              className={cardContainerClass}
              style={cardStyles}
            >
              <Image
                className="w-full h-auto"
                src={imageUrl}
                alt={title}
                width={500}
                height={500}
              />
              {title && (
                <div
                  className={cn(
                    'self-stretch grow shrink basis-0 px-2.5 justify-center items-center gap-2.5 inline-flex',
                    {
                      'lg:py-[30px]': blockId !== 'cardGroupSliderBorder',
                      'lg:pt-[10px]': blockId === 'cardGroupSliderBorder',
                    }
                  )}
                >
                  <div className="grow shrink basis-0 text-center text-zinc-800 text-sm font-bold leading-tight no-underline">
                    {title}
                  </div>
                </div>
              )}
            </div>
          );

          if (redirectUrl) {
            return (
              <PrefetchLink
                unstyled
                key={title}
                href={redirectUrl}
                className="px-2.5"
              >
                {cardContent}
              </PrefetchLink>
            );
          }

          return cardContent;
        })}
      </Glider>

      {cardCount > 4 && (
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
