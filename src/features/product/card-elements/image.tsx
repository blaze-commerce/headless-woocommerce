import { useState } from 'react';
import Image from 'next/image';
import { isEmpty } from 'lodash';

import { Image as ImageType } from '@src/models/product/types';
import { CardStockAvailability } from '@src/features/product/card-elements/stock-availability';
import { CardWishlishButton } from '@src/features/product/card-elements/wishlist-button';
import { useSiteContext } from '@src/context/site-context';
import { cn, isImage } from '@src/lib/helpers/helper';
import { Product } from '@src/models/product';
import { emptyImagePlaceholder } from '@src/lib/constants/image';
import TSThumbnail from '@src/lib/typesense/image';
import { seoUrlParser } from '@src/components/page-seo';
import { RawLink } from '@src/components/common/raw-link';

interface ICardImage {
  product: Product;
  imageClassNames?: string;
  productFilters?: string;
  productColumns?: string;
  imageMaxWidth?: number;
  showWishlistButton?: boolean;
}

interface IHoverImage extends Omit<ICardImage, 'product'> {
  mainImage: ImageType;
  secondaryImage: ImageType;
  imgError: boolean;
  setImgHoverError: (_value: boolean) => void;
}

interface IPlaceholderImage extends Omit<ICardImage, 'product'> {
  mainImage: ImageType;

  imgError: boolean;
  imgHoverError: boolean;
}

const renderEmptyImagePlaceholder = (props: IPlaceholderImage) => {
  const { mainImage, productFilters, productColumns, imgError, imgHoverError } = props;
  return (
    <Image
      src={emptyImagePlaceholder}
      alt={mainImage.altText as string}
      width={359}
      height={312}
      className={cn('absolute opacity-100', {
        'group-hover:opacity-0 group-hover:transition group-hover:ease-linear group-hover:duration-300 ease-linear duration-300':
          mainImage?.src && typeof mainImage?.src !== undefined && !imgError && !imgHoverError,
        'xl:w-full xl:px-20': imgError && productFilters !== '1' && productColumns == '3',
        'xl:w-full xl:h-full': imgError && productColumns == '4',
        'xl:w-full xl:h-full xl:px-6': imgError && productFilters === '1' && productColumns == '3',
        'object-center object-cover lg:w-full lg:h-full': !imgError,
        'p-4 lg:p-7': imgError,
      })}
    />
  );
};

const renderHoverImage = (props: IHoverImage) => {
  const { mainImage, secondaryImage, productFilters, productColumns, imgError, setImgHoverError } =
    props;

  return (
    <Image
      src={`${secondaryImage?.src}`}
      alt={`${secondaryImage?.altText}`}
      width={359}
      height={312}
      className={cn('absolute opacity-0', {
        'group-hover:opacity-100 group-hover:transition group-hover:ease-linear group-hover:duration-300 ease-linear duration-300':
          mainImage?.src && typeof mainImage?.src !== undefined && !imgError,
        'xl:w-full xl:px-20': imgError && productFilters !== '1' && productColumns == '3',
        'xl:w-full xl:h-full': imgError && productColumns == '4',
        'xl:w-full xl:h-full xl:px-6': imgError && productFilters === '1' && productColumns == '3',
        'object-center object-cover lg:w-full lg:h-full': !imgError,
      })}
      onError={() => setImgHoverError(true)}
    />
  );
};

export const CardImage = (props: ICardImage) => {
  const { product, imageClassNames, productFilters, productColumns, imageMaxWidth } = props;
  const thumbnailSrc = TSThumbnail.clean(product?.thumbnail?.src || '');
  const galleryImages = product?.galleryImages;
  const mainImage: ImageType = {
    src: thumbnailSrc,
    altText: product?.thumbnail?.altText || product?.name || '',
  };

  let secondaryImage: ImageType | undefined;
  if (typeof galleryImages !== 'undefined' && !isEmpty(galleryImages[0])) {
    secondaryImage = isImage(galleryImages, mainImage?.src);
  }

  const [imgError, setImgError] = useState(false);
  const [imgHoverError, setImgHoverError] = useState(false);
  const { settings } = useSiteContext();
  const productLink = seoUrlParser(product?.permalink || '');

  return (
    <div
      className={cn(
        'product-image-holder',
        settings?.productCardAspectRatioClasses,
        {
          'bg-gray-200': imgError,
        },
        imageClassNames
      )}
      style={{ width: imageMaxWidth !== 0 && !imgError ? `${imageMaxWidth}px` : '100%' }}
    >
      <RawLink
        href={productLink}
        title={product.name}
        className="jvl-test"
      >
        <figure>
          {typeof secondaryImage !== 'undefined' &&
            !imgHoverError &&
            renderHoverImage({
              mainImage,
              secondaryImage,
              productFilters,
              productColumns,
              imgError,
              setImgHoverError,
            })}
          {imgError ? (
            renderEmptyImagePlaceholder({
              mainImage,
              productFilters,
              productColumns,
              imgError,
              imgHoverError,
            })
          ) : (
            <Image
              src={mainImage.src}
              alt={mainImage.altText as string}
              width={398}
              height={616}
              className={cn('product-image', {
                'group-hover:opacity-0 group-hover:transition group-hover:ease-linear group-hover:duration-300 ease-linear duration-300':
                  mainImage?.src &&
                  typeof mainImage?.src !== undefined &&
                  secondaryImage &&
                  typeof secondaryImage !== undefined &&
                  !imgError &&
                  !imgHoverError,
                'xl:w-full xl:px-20': imgError && productFilters !== '1' && productColumns == '3',
                'xl:w-full xl:h-full': imgError && productColumns == '4',
                'xl:w-full xl:h-full xl:px-6':
                  imgError && productFilters === '1' && productColumns == '3',
                'object-center object-cover lg:w-full lg:h-full': !imgError,
                'p-4 lg:p-7': imgError,
              })}
              onError={() => {
                setImgError(true);
              }}
            />
          )}
        </figure>
      </RawLink>
    </div>
  );
};
