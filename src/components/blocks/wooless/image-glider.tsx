import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import NextImage from 'next/image';
import Link from 'next/link';

import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import {
  parseImageAlt,
  parseImageClass,
  parseImageLink,
  parsetImageSrc,
} from '@src/lib/helpers/image';
import { v4 } from 'uuid';
import { useRef, useState } from 'react';
import { ArrowRoundLeft } from '@src/components/svg/arrow-round-left';
import GliderComponent from 'react-glider';
import { ArrowRoundRight } from '@src/components/svg/arrow-round-right';
import { isMobile } from 'react-device-detect';
import { getAttributeValue } from '@src/lib/block';
import { find } from 'lodash';

type ImageProps = {
  block: ParsedBlock;
};

export const ImageGlider = ({ block }: ImageProps) => {
  const leftArrow = useRef(null);
  const rightArrow = useRef(null);
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

  const gallery = find(block.innerBlocks, ['blockName', 'core/gallery']);

  return (
    <div className="block relative">
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
        className={blockAttribute.className}
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
        {gallery?.innerBlocks?.map((innerBlock) => {
          const isImageBlock =
            'core/image' === innerBlock.blockName ||
            'generateblocks/image' === innerBlock.blockName;
          const imageSource = parsetImageSrc(innerBlock.innerHTML);
          const altText = parseImageAlt(innerBlock.innerHTML) || 'Image';
          const attribute = innerBlock.attrs as BlockAttributes;

          const { width, height, className } = attribute || {};

          const finalWidth = width ? parseInt(width.replace('px', '')) : 100;
          const finalHeight = height ? parseInt(height.replace('px', '')) : 100;

          const imageClasses = cn(attribute.className, parseImageClass(innerBlock.innerHTML));
          const imageLink = parseImageLink(innerBlock.innerHTML);

          if (!isImageBlock) return null;

          if (imageLink && imageLink != imageSource) {
            return (
              <Link
                key={v4()}
                href={imageLink}
                className={className ?? ''}
              >
                <NextImage
                  width={finalWidth}
                  height={finalHeight}
                  alt={altText}
                  src={imageSource ?? ''}
                  className={cn(imageClasses, '')}
                />
              </Link>
            );
          }

          return (
            <NextImage
              key={v4()}
              width={finalWidth}
              height={finalHeight}
              alt={altText}
              src={imageSource ?? ''}
              className={cn(imageClasses, '')}
            />
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
