import { Tab } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GliderComponent from 'react-glider';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Image } from '@src/components/common/image';
import { SlideImages } from '@src/features/product/slide-images';
import { Play } from '@src/components/svg/video-controls';
import { Video } from '@components/video';
import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import { Image as ImageType } from '@src/models/product/types';
import { emptyImagePlaceholder } from '@src/lib/constants/image';
import { cn, isLightColor, isMp4 } from '@src/lib/helpers/helper';
import { find } from 'lodash';

type Props = {
  id?: string;
  className?: string;
  images?: ImageType[];
  onSale?: boolean;
  isNew?: boolean;
  isGrid?: boolean;
  zoomType?: string;
  badgeType?: number;
  saleBadgeColor?: string;
  newBadgeColor?: string;
};

export const Gallery: React.FC<Props> = (props) => {
  const {
    id,
    className,
    images,
    isNew,
    onSale,
    isGrid,
    zoomType,
    badgeType,
    saleBadgeColor,
    newBadgeColor,
  } = props;
  const { settings } = useSiteContext();
  const {
    variation: {
      image: [imageThumbnailAttribute, setImageThumbnailAttribute],
    },
    state: { matchedVariant },
  } = useProductContext();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { asPath } = useRouter();

  useEffect(() => {
    // On component mount reset the selected index of the image to the first element
    setSelectedImageIndex(0);
  }, [asPath]);

  useEffect(() => {
    if (!matchedVariant) return;

    setImageThumbnailAttribute(matchedVariant.thumbnail as ImageType);
  }, [matchedVariant, setImageThumbnailAttribute]);

  if (!images) return null;

  const lastIndex = images.length - 1;

  const renderNewBadge = () => {
    if (!isNew) return false;
    return (
      <div
        className={cn(`absolute top-0 flex w-full h-1/4 overflow-hidden z-0 ${id} ${className}`, {
          'left-0 justify-end': badgeType === 1 || badgeType === 3,
          'float-right': badgeType === 2,
        })}
      >
        <span
          className={cn('', {
            'relative top-0 inset-x-0 flex items-center justify-center m-4 md:m-8 h-12 w-12 rounded-full':
              badgeType === 1,
            'absolute -top-4 -right-20 h-16 w-48 origin-center rotate-45 z-0': badgeType === 2,
            'top-0 inset-x-0 flex items-center justify-center h-7 w-16': badgeType === 3,
          })}
          style={{ backgroundColor: newBadgeColor }}
        >
          <p
            className={cn('text-center text-xs font-normal', {
              'relative p-2.5': badgeType === 1,
              'absolute w-full bottom-2.5': badgeType === 2,
              'text-white': !isLightColor(newBadgeColor),
              'text-black': isLightColor(newBadgeColor),
            })}
          >
            NEW!
          </p>
        </span>
      </div>
    );
  };

  const renderOnSaleBadge = () => {
    if (!onSale) return false;
    return (
      <div className="absolute top-0 lg:m-5 flex space-x-1">
        {onSale && (
          <span
            className={cn('absolutessssss ', {
              'top-0 inset-x-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary':
                badgeType === 1,
              '-top-4 -left-20 lg:-top-11 lg:-left-28 h-16 w-48 origin-center -rotate-45 z-0 bg-primary':
                badgeType === 3,
              'top-0 inset-x-0 flex items-center justify-center h-7 w-16 bg-primary rounded-md':
                badgeType === 2,
            })}
          >
            <p
              className={cn('text-center text-xs font-bold font-primary leading-normal', {
                'relative p-2.5': badgeType === 1,
                'w-full absolute bottom-2.5': badgeType === 3,
                'text-white': !isLightColor(saleBadgeColor),
                'text-black': isLightColor(saleBadgeColor),
              })}
            >
              SALE
            </p>
          </span>
        )}
      </div>
    );
  };

  const renderGridGallery = () => {
    return (
      <div className="relative overflow-hidden h-full grid grid-cols-2 gap-x-1 gap-y-1">
        {images.slice(0, 6).map((image, index) => (
          <div
            key={`grid-gallery-${image.id}-${index}`}
            className={cn(
              'aspect-w-1 relative h-[82px] w-full lg:h-[237px] xl:h-[300px] 2xl:h-[365px] bg-white flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-0',
              settings?.productCardAspectRatioClasses
            )}
          >
            <span className="absolute inset-0 overflow-hidden object-cover">
              <Image
                width="500"
                height="500"
                src={image?.src}
                alt={(image.altText || image.title) as string}
                className={cn('w-full h-full object-center object-cover lg:w-full lg:h-full')}
              />
            </span>
            {images?.length > 1 && index === 1 && (
              <div className="absolute flex justify-between align-middle w-full h-full z-[7]">
                <SlideImages
                  className="bottom-0"
                  images={images}
                />
              </div>
            )}
          </div>
        ))}
        {renderOnSaleBadge()}
        {renderNewBadge()}
      </div>
    );
  };

  const renderImageSlide = (image: ImageType, index: number) => {
    const currentImageSrc = imageThumbnailAttribute?.src ? imageThumbnailAttribute.src : image.src;
    const currentAltText = imageThumbnailAttribute?.altText
      ? imageThumbnailAttribute.altText
      : image.altText;
    return (
      <>
        {isMp4(image?.src) ? (
          <Video src={image?.src} />
        ) : (
          <>
            {image?.src ? (
              <Image
                fill
                blur={false}
                src={currentImageSrc}
                alt={(currentAltText || image.title) as string}
                className="w-full h-full lg:object-center object-contain"
                hasZoomHover={zoomType === '1'}
              />
            ) : (
              <Image
                src={emptyImagePlaceholder}
                alt="Thumbnail"
                width={100}
                height={100}
                className="h-full w-full p-20 bg-gray-200 object-contain object-center"
              />
            )}
          </>
        )}
        {renderOnSaleBadge()}
        {renderNewBadge()}
        <div className="product-gallery-arrows absolute flex justify-between align-middle w-full h-full z-[7]">
          <button
            className={cn('relative ml-1', {
              invisible: index === 0,
            })}
            onClick={() => setSelectedImageIndex(index - 1)}
          >
            <span>
              <FiChevronLeft />
            </span>
          </button>
          <button
            className={cn('relative mr-1', {
              invisible: index === lastIndex,
            })}
            onClick={() => setSelectedImageIndex(index + 1)}
          >
            <span>
              <FiChevronRight />
            </span>
          </button>
        </div>
        {image?.src && zoomType === '2' && (
          <SlideImages
            className="bottom-0"
            images={images}
            imageIndex={index}
          />
        )}
      </>
    );
  };

  const renderDesktopMainImage = () => {
    return (
      <Tab.Panels className="w-full aspect-w-1 aspect-h-1 overflow-hidden relative h-100">
        {images.length > 0 &&
          images.map((image, index) => (
            <Tab.Panel key={`desktop-image-${image.id}-${index}`}>
              <div className="relative h-full">{renderImageSlide(image, index)}</div>
            </Tab.Panel>
          ))}
      </Tab.Panels>
    );
  };

  const renderMobileMainImage = () => {
    return (
      <div className="relative overflow-hidden">
        <GliderComponent
          draggable
          slidesToShow={1}
          slidesToScroll={1}
          hasDots={true}
        >
          {images.length > 0 &&
            images.map((image, index) => (
              <div
                className="relative h-full"
                key={`mobile-image-${image.id}-${index}`}
              >
                {renderImageSlide(image, index)}
              </div>
            ))}
        </GliderComponent>
        {renderOnSaleBadge()}
        {renderNewBadge()}
      </div>
    );
  };

  const renderImageGallery = () => {
    return (
      <>
        {images.length > 1 ? (
          <div className="mt-5 lg:mt-2.5 w-full">
            <Tab.List className="flex space-x-2.5 justify-center lg:space-x-0 lg:justify-normal lg:grid grid-cols-4 gap-[5px]">
              {images.map((image, index) => (
                <Tab
                  key={`image-gallery-${image.id}-${index}`}
                  className="lg:relative lg:h-[82px] xl:h-[155px] lg:bg-white flex lg:items-center lg:justify-center lg:text-sm lg:font-medium lg:uppercase lg:text-gray-900 lg:cursor-pointer lg:hover:bg-gray-50 lg:focus:outline-none lg:focus:ring-0 lg:focus:ring-offset-0"
                >
                  {({ selected }) => (
                    <>
                      <span className="absolute lg:inset-0 overflow-hidden">
                        {isMp4(image?.src) ? (
                          <div
                            className={cn(
                              'absolute w-full h-full bg-black flex items-center justify-center',
                              {
                                'opacity-50': !selected,
                              }
                            )}
                          >
                            <Play className="fill-white !w-10 !h-10" />
                          </div>
                        ) : (
                          <Image
                            width="155"
                            height="155"
                            src={image?.src}
                            alt={(image.altText || image.title) as string}
                            className={cn(
                              'w-full h-full object-center object-cover lg:w-full lg:h-full',
                              { 'opacity-50': !selected }
                            )}
                          />
                        )}
                      </span>
                      <span
                        className={cn('absolute pointer-events-none', {
                          'ring-transparent': !selected,
                          'ring-indigo-500': selected,
                        })}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <Tab.Group
      as="div"
      className="flex flex-col-reverse mb-5"
      selectedIndex={selectedImageIndex}
      onChange={setSelectedImageIndex}
    >
      {isGrid && images.length > 1 && <div className="hidden lg:block">{renderGridGallery()}</div>}

      <div
        className={cn('product-thumbnail lg:inline-grid', {
          'lg:hidden': images.length > 1 && isGrid,
        })}
      >
        <div className="lg:hidden">{renderMobileMainImage()}</div>
        <div className="hidden lg:block">
          {renderDesktopMainImage()}
          {renderImageGallery()}
        </div>
      </div>
    </Tab.Group>
  );
};
