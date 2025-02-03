import { decode } from 'html-entities';
import { find, isEmpty, max, min } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useEffectOnce, useIntersectionObserver } from 'usehooks-ts';

import { Image } from '@src/components/common/image';
import { RawLink } from '@src/components/common/raw-link';
import { ProductRating } from '@src/features/product/product-rating';
import { seoUrlParser } from '@src/components/page-seo';
import { WishListIcon } from '@src/features/wish-list/wish-list-icon';
import * as WishListAction from '@src/features/wish-list/wish-list-schema';
import { AddToCartButton } from '@src/components/button/add-to-cart-button';
import { ProductPrice as Price } from '@src/features/product/product-price';
import { useSiteContext } from '@src/context/site-context';
import { env } from '@src/lib/env';
import { track } from '@src/lib/track';
import { numberFormat } from '@src/lib/helpers/product';
import { Product, ProductTypesenseResponse } from '@src/models/product';
import { Stats } from '@src/models/product/reviews';
import { Image as ImageType, ProductMetaData } from '@src/models/product/types';
import { toDateTime, isWithInMonthsAgo } from '@src/lib/helpers/date';
import { emptyImagePlaceholder } from '@src/lib/constants/image';
import { cn, isImage, isLightColor } from '@src/lib/helpers/helper';
import { useWishListStorage } from '@src/lib/hooks';
import TSThumbnail from '@src/lib/typesense/image';
import type { ProductCards } from '@src/models/settings/shop';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

interface Props extends ProductCards {
  product: Product;
  showWishlistButton?: boolean;
  productFilters?: string;
  productColumns?: string;
  classNames?: string;
  imageClassNames?: string;
  layout?: 'primary' | 'secondary';
}

export const ProductCard = (props: Props) => {
  const { NEXT_PUBLIC_REVIEW_SERVICE } = env();
  const {
    classNames,
    product,
    hasBorders,
    detailsAlignment = 'center',
    showRating = false,
    cardShadow = false,
    hasAddToCart = false,
    layout = 'primary',
  } = props;

  const productLink = seoUrlParser(product?.permalink || '');
  const thumbnailSrc = TSThumbnail.clean(product?.thumbnail?.src || '');
  const { currentCurrency, settings, currentCountry } = useSiteContext();
  // const [compositeComponents, setCompositeComponents] = useState<CompositeProductComponent[]>();

  const { isProductInWishList } = useWishListStorage();
  const inWishList = isProductInWishList(parseInt(product?.id as string));

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const { regularPrice, price, salePrice, onSale, productType } = product || {};

  const { prefetch } = useRouter();
  const parsedProduct = Product.buildFromResponse(product as ProductTypesenseResponse);

  useEffectOnce(() => {
    track.viewItemList(parsedProduct);
  });

  useEffect(() => {
    if (isVisible) {
      prefetch(`/${currentCountry}${productLink}`);
    }
  }, [isVisible, productLink, currentCountry, prefetch]);

  const handleMouseEnter = () => {
    prefetch(`/${currentCountry}${productLink}`);
  };

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

  const displayPrice =
    (regularPrice as { [key: string]: number })?.[currentCurrency] != 0 ? regularPrice : price;
  if (!displayPrice) return null;
  let isOnSale = onSale && (salePrice?.[currentCurrency] as number) > 0;
  if (productType === 'variable') {
    isOnSale = !!find(product.variations, ['onSale', true]);
  }

  const renderAddToCartButton = () => {
    if (parsedProduct.isFree(currentCurrency)) return null;

    return (
      <>
        {hasAddToCart && (
          <div
            className={cn('mx-auto', {
              'mx-auto': detailsAlignment === 'center',
              'z-[7]': product.stockStatus === 'instock' && product.productType !== 'variable',
              'z-0': product.stockStatus === 'outofstock' || product.productType === 'variable',
            })}
          >
            {product.productType &&
              ['simple', 'variation', 'variable', 'bundle'].includes(product.productType) && (
                <AddToCartButton
                  product={product}
                  className={layout === 'secondary' ? 'text-[14px]' : ''}
                />
              )}
          </div>
        )}
      </>
    );
  };

  // const renderAvailableOptions = () => {
  //   const { showAvailableOptions, availableOptionsCount } = props;
  //   const compositeProductsCount = (compositeComponents?.length as number) ?? availableOptionsCount;
  //   const hasAvailableOptions = compositeProductsCount > 0;

  //   return (
  //     <div className={`text-${detailsAlignment} text-gray-500 z-[7]`}>
  //       {showAvailableOptions && hasAvailableOptions && (
  //         <>{`${compositeProductsCount} available options`}</>
  //       )}
  //     </div>
  //   );
  // };
  const getVariationPriceRange = () => {
    const pricesArray = product?.variations?.map(
      (variation) => variation.price && variation.price[currentCurrency]
    );
    const regularPrice = product?.variations?.map(
      (variation) => variation.regularPrice && variation.regularPrice[currentCurrency]
    );
    const evaluateOnSale = isOnSale || !!find(product?.variations, ['onSale', true]);

    return {
      min: min(pricesArray) ?? 0,
      max: max(pricesArray) ?? 0,
      minBefore: evaluateOnSale ? min(regularPrice) : undefined,
      maxBefore: evaluateOnSale ? max(regularPrice) : undefined,
    };
  };

  const renderVariationPrices = () => {
    const { min, max, minBefore } = getVariationPriceRange();
    let display;
    if (min == max) {
      display = numberFormat(min);
    } else {
      display = `${numberFormat(min)} - ${numberFormat(max)}`;
    }
    return (
      <p className={`relative text-${detailsAlignment} font-semibold text-base text-[#4A5468]`}>
        {isOnSale && minBefore && (
          <span className="text-[#717D96] font-normal line-through mr-1">
            {numberFormat(minBefore)}
          </span>
        )}
        {`${display} ${currentCurrency}`}
      </p>
    );
  };

  const renderRating = () => {
    const { judgemeReviews, yotpoReviews, metaData } = product;
    const { wooProductReviews } = metaData as ProductMetaData;

    return (
      <div className={`flex items-center justify-${detailsAlignment} space-x-2 z-[7]`}>
        {NEXT_PUBLIC_REVIEW_SERVICE === 'judge.me' && (
          <ProductRating stats={judgemeReviews as Stats} />
        )}
        {NEXT_PUBLIC_REVIEW_SERVICE === 'yotpo' && <ProductRating stats={yotpoReviews as Stats} />}
        {NEXT_PUBLIC_REVIEW_SERVICE === 'woocommerce_native_reviews' && (
          <ProductRating stats={wooProductReviews?.stats} />
        )}
      </div>
    );
  };

  const renderProductLabel = () => {
    return <ReactHTMLParser html={decode(product?.metaData?.productLabel as string)} />;
  };

  const renderProductCardTitle = () => {
    const { titleFontSize } = props;

    return (
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        className={cn('font-normal text-[#746A5F] mt-2 text-sm md:text-base xl:text-lg', {
          'mt-0': 'secondary' === layout,
        })}
      >
        <RawLink href={productLink}>
          <span
            aria-hidden="true"
            className=" absolute inset-0 z-[8] cursor-pointer"
          />
          <ReactHTMLParser html={product.name as string} />
        </RawLink>
      </div>
    );
  };

  const renderDiscountLabel = () => {
    const { showDiscountLabel, discountLabelBackgroundColor = '#9ca3af', discountPercent } = props;
    return (
      <>
        {showDiscountLabel && discountPercent && (
          <div className="text-sm text-center z-[7]">
            <span
              className="py-0.5 px-4 rounded-sm"
              style={{ backgroundColor: discountLabelBackgroundColor }}
            >
              {discountPercent}% OFF AT THE CHECKOUT
            </span>
          </div>
        )}
      </>
    );
  };

  const renderStockAvailability = () => {
    return (
      <>
        {product.stockStatus === 'outofstock' && (
          <div className={cn('absolute inset-x-0 flex items-end overflow-hidden top-0 py-2.5')}>
            <p className="w-full text-center relative uppercase text-brand-primary text-xs md:text-base font-bold bg-white -mb-3 opacity-75 h-11 flex items-center justify-center">
              {settings?.shop?.options?.outOfStockMessage ?? 'OUT OF STOCK'}
            </p>
          </div>
        )}
      </>
    );
  };

  const renderWishlistButton = () => {
    const { showWishlistButton, hasItemsLeftBadge, wishlistButtonType = 1 } = props;
    const action: WishListAction.Actions = 'add';
    const shouldShowWishListIcon = settings?.store?.wishlist?.enabled;

    if (inWishList && settings?.store?.wishlist?.enabled) {
      // We comment this out at the moment because we don't want the remove wishlist icon to show up
      //   shouldShowWishListIcon = true;
      //   action = 'remove';
      // This hides the wishlist icon when it is already in the wishlist item
      return <></>;
    }

    return (
      <>
        {shouldShowWishListIcon && (
          <div
            className={cn('absolute w-full h-full flex justify-end overflow-hidden', {
              'flex-col':
                hasItemsLeftBadge || settings?.store?.wishlist?.iconPosition === 'bottom-right',
            })}
          >
            <div className="flex flex-row-reverse">
              <WishListIcon
                {...props}
                action={action}
                showIcon={true}
                classNames={cn(
                  'cursor-pointer group/wishlist flex items-center w-[30px] h-[30px] p-2 z-[9] m-2.5',
                  {
                    'rounded-full': wishlistButtonType === 1,
                    'shadow-[0_4px_8px_rgba(0,0,0,0.1)]':
                      !hasItemsLeftBadge && wishlistButtonType === 2,
                  },
                  classNames
                )}
                {...props}
                product={parsedProduct}
              />
            </div>
          </div>
        )}
      </>
    );
  };

  const renderItemsLeftBadge = () => {
    const { hasItemsLeftBadge, badgeType = 1, itemsLeftBadgeColor = '#4A5468' } = props;
    const isOneLeft = product?.stockQuantity === 1;
    return (
      <>
        {hasItemsLeftBadge && isOneLeft && (
          <div
            className={cn('absolute top-0 flex w-full h-full overflow-hidden z-[7]', {
              'justify-end': badgeType === 1 || badgeType === 3,
              'float-right': badgeType === 2,
            })}
          >
            <span
              className={cn('', {
                'relative top-0 inset-x-0 flex items-center justify-center m-2.5 h-14 w-14 sm:h-16 sm:w-16 rounded-full':
                  badgeType === 1,
                'absolute -top-3 -right-20 h-[3rem] w-[11.5rem] md:-top-4 md:-right-20 md:h-16 md:w-48 origin-center rotate-45 z-0':
                  badgeType === 2,
                'top-0 inset-x-0 flex items-center justify-center h-7 w-16': badgeType === 3,
              })}
              style={{ backgroundColor: itemsLeftBadgeColor }}
            >
              <p
                className={cn('text-center text-xs font-normal', {
                  'relative p-2.5': badgeType === 1,
                  'absolute w-full bottom-1 md:bottom-2.5': badgeType === 2,
                  'text-white': !isLightColor(itemsLeftBadgeColor),
                  'text-black': isLightColor(itemsLeftBadgeColor),
                })}
              >
                1 LEFT
              </p>
            </span>
          </div>
        )}
      </>
    );
  };

  const renderNewBadge = () => {
    const { productGallery } = settings?.product || {};
    if (!productGallery) return null;

    const newBadgeThreshold = +productGallery.newProductBadgeThreshold / 30;
    const { badgeType = 1, newBadgeColor = '#4A5468' } = props;
    const publishedDate = toDateTime(product.publishedAt as number);
    const isTwoMonthsAgo = isWithInMonthsAgo(publishedDate, newBadgeThreshold);

    return (
      <>
        {isTwoMonthsAgo && (
          <div
            className={cn('absolute top-0 flex w-full h-full overflow-hidden z-[7]', {
              'left-0 justify-end': badgeType === 1 || badgeType === 3,
              'float-right': badgeType === 2,
            })}
          >
            <span
              className={cn('', {
                'relative top-0 inset-x-0 flex items-center justify-center m-2.5 h-12 w-12 rounded-full':
                  badgeType === 1,
                'absolute -top-3 -left-20 h-[3rem] w-[11.5rem] md:-top-4 md:-right-20 md:h-16 md:w-48 origin-center -rotate-45 z-0':
                  badgeType === 2,
                'top-0 inset-x-0 flex items-center justify-center h-7 w-16': badgeType === 3,
              })}
              style={{ backgroundColor: newBadgeColor }}
            >
              <p
                className={cn('text-center text-xs font-normal', {
                  'relative p-2.5': badgeType === 1,
                  'absolute w-full  bottom-1 md:bottom-2.5': badgeType === 2,
                  'text-white': !isLightColor(newBadgeColor),
                  'text-black': isLightColor(newBadgeColor),
                })}
              >
                NEW!
              </p>
            </span>
          </div>
        )}
      </>
    );
  };

  const renderOnSaleBadge = () => {
    const { badgeType = 1, saleBadgeColor = '#4A5468' } = props;
    return (
      <div className="absolute float-left top-0 left-0 w-full h-full overflow-hidden z-[7]">
        <span
          className={cn('absolute', {
            'top-0 inset-x-0 flex items-center justify-center m-2.5 h-12 w-12 rounded-full':
              badgeType === 1,
            '-top-3 -left-20 h-[3rem] w-[11.5rem] md:-top-4 md:-left-20 md:h-16 md:w-48 origin-center -rotate-45 z-0':
              badgeType === 2,
            'top-0 inset-x-0 flex items-center justify-center h-7 w-16': badgeType === 3,
          })}
          style={{ backgroundColor: saleBadgeColor }}
        >
          <p
            className={cn('text-center text-xs font-normal', {
              'relative p-2.5': badgeType === 1,
              'w-full absolute bottom-1 md:bottom-2.5': badgeType === 2,
              'text-white': !isLightColor(saleBadgeColor),
              'text-black': isLightColor(saleBadgeColor),
            })}
          >
            SALE!
          </p>
        </span>
      </div>
    );
  };

  const renderHoverImage = () => {
    const { productFilters, productColumns } = props;

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
          'xl:w-full xl:h-full xl:px-6':
            imgError && productFilters === '1' && productColumns == '3',
          'object-center object-cover lg:w-full lg:h-full': !imgError,
        })}
        onError={() => setImgHoverError(true)}
      />
    );
  };

  const renderEmptyImagePlaceholder = () => {
    const { productFilters, productColumns } = props;

    return (
      <Image
        src={emptyImagePlaceholder}
        alt={mainImage.altText as string}
        width={359}
        height={312}
        className={cn('absolute opacity-100', {
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
      />
    );
  };

  const renderCardImage = () => {
    const { productFilters, productColumns, imageMaxWidth, imageClassNames } = props;

    return (
      <div
        className={cn(
          'aspect-w-1 relative overflow-hidden mx-auto flex justify-center items-center w-[167.5px] h-[257.848px] lg:w-[398.5px] lg:h-[209px] rounded-lg',
          settings?.productCardAspectRatioClasses,
          {
            'bg-gray-200': imgError,
          },
          imageClassNames
        )}
        style={{ width: imageMaxWidth !== 0 && !imgError ? `${imageMaxWidth}px` : '100%' }}
      >
        {typeof secondaryImage !== 'undefined' && !imgHoverError && renderHoverImage()}
        {imgError ? (
          renderEmptyImagePlaceholder()
        ) : (
          <Image
            src={mainImage.src}
            alt={mainImage.altText as string}
            width={398}
            height={616}
            className={cn('absolute opacity-100', {
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
        {renderStockAvailability()}
        {renderWishlistButton()}
      </div>
    );
  };

  if ('secondary' === layout) {
    return (
      <div
        key={product.id}
        className={cn(
          'product-card !justify-start group relative content-between transition-all ease-linear duration-300 h-full flex flex-col !left-0',
          {
            'border border-solid border-[#ECEEEF]': hasBorders,
            'hover:shadow-xl': cardShadow,
          },
          classNames
        )}
        style={{
          padding: `${props?.imagePadding}px`,
        }}
      >
        <div className="flex gap-4 w-full justify-start">
          <Image
            src={mainImage.src}
            alt={mainImage.altText as string}
            width={60}
            height={60}
            className="w-[60px] h-[60px]"
          />

          <div className="flex flex-col flex-start">
            <div className="product-card-label">{renderProductCardTitle()}</div>
            <Price />
            <div className="relative z-[8] mt-auto max-w-max">{renderAddToCartButton()}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      key={product.id}
      className={cn(
        'product-card bg-white group !justify-start relative content-between transition-all ease-linear duration-300 h-full flex flex-col !left-0',
        {
          'border border-solid border-[#ECEEEF] max-w-xs': hasBorders,
          'hover:shadow-xl': cardShadow,
        },
        classNames
      )}
      style={{
        padding: `${props?.imagePadding}px`,
      }}
    >
      <div className="mb-4">
        {renderCardImage()}
        {isOnSale && renderOnSaleBadge()}
        {renderNewBadge()}
        {renderItemsLeftBadge()}
      </div>
      {renderDiscountLabel()}
      <div className={`product-card-label text-${detailsAlignment}`}>
        {product?.metaData?.productLabel &&
          !settings?.isAdditionalWarningMessageEnabled &&
          renderProductLabel()}
        {renderProductCardTitle()}
      </div>
      <div className="flex flex-col justify-end">
        {showRating && renderRating()}
        <div className={`text-${detailsAlignment} w-full lg:w-auto`}>
          <Price
            className={cn({
              'justify-left': detailsAlignment === 'left',
              'justify-center': detailsAlignment === 'center',
            })}
          />
        </div>
        {/* {renderAvailableOptions()} */}
      </div>
      <div className="relative mt-auto z-[8]">{renderAddToCartButton()}</div>
    </div>
  );
};
