import { useEffect, useState } from 'react';
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
  showImageVariant?: string;
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
      className={cn('opacity-0 product-image', {
        'is-hover-image': mainImage?.src && typeof mainImage?.src !== undefined && !imgError,
        'xl:w-full xl:px-20': imgError && productFilters !== '1' && productColumns == '3',
        'xl:w-full xl:h-full': imgError && productColumns == '4',
        'xl:w-full xl:h-full xl:px-6': imgError && productFilters === '1' && productColumns == '3',
        'object-center object-cover lg:w-full lg:h-full': !imgError,
      })}
      onError={() => setImgHoverError(true)}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderBasicImage = (props: any) => {
  const {
    mainImage,
    secondaryImage,
    imgHoverError,
    productFilters,
    productColumns,
    imgError,
    setImgHoverError,
    setImgError,
  } = props;
  return (
    <>
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
      <Image
        src={mainImage.src}
        alt={mainImage.altText as string}
        width={398}
        height={616}
        className={cn('product-image', {
          'has-hover-image':
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
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderVariableImages = (props: any) => {
  const { product, setImgError, showImageVariant } = props;
  const firstKey = Object.keys(product.variableImages)[0];

  return (
    <>
      {Object.keys(product.variableImages).map((key) => {
        const image = product.variableImages[key];
        return (
          <Image
            key={key}
            src={image.src}
            alt={image.altText as string}
            width={398}
            height={616}
            className={cn(
              'product-image',
              {
                'opacity-0': showImageVariant !== '' || showImageVariant !== key,
                'opacity-100 ease-linear duration-300': showImageVariant === key,
                // set opacity 100 for the first iamge if showImageVariant is empty
                'opacity-100': showImageVariant === '' && key === firstKey,
              },
              `key-${key}`
            )}
            onError={() => {
              setImgError(true);
            }}
          />
        );
      })}
    </>
  );
};

export const CardImage = (props: ICardImage) => {
  const {
    product,
    imageClassNames,
    productFilters,
    productColumns,
    imageMaxWidth,
    showImageVariant,
  } = props;

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

  useEffect(() => {
    console.log({ showImageVariant });
  }, [showImageVariant]);

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
          {imgError &&
            renderEmptyImagePlaceholder({
              mainImage,
              productFilters,
              productColumns,
              imgError,
              imgHoverError,
            })}
          {!imgError &&
            !product.hasVariableImages() &&
            renderBasicImage({
              mainImage,
              secondaryImage,
              imgHoverError,
              productFilters,
              productColumns,
              imgError,
              setImgHoverError,
              setImgError,
            })}
          {!imgError &&
            product.hasVariableImages() &&
            renderVariableImages({ product, imgError, setImgError, showImageVariant })}
        </figure>
      </RawLink>
    </div>
  );
};
