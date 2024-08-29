import { find } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useEffectOnce, useIntersectionObserver } from 'usehooks-ts';

import { Image } from '@src/components/common/image';
import { CardRating } from '@src/features/product/card-elements/rating';
import { CardTitle } from '@src/features/product/card-elements/title';
import { CardLabel } from '@src/features/product/card-elements/label';
import { CardImage } from '@src/features/product/card-elements/image';
import { seoUrlParser } from '@src/components/page-seo';
import { CardAddToCart } from '@src/features/product/card-elements/add-to-cart';
import { CardPrice } from '@src/features/product/card-elements/price';
import { useSiteContext } from '@src/context/site-context';
import { track } from '@src/lib/track';
import { Product, ProductTypesenseResponse } from '@src/models/product';
import { Image as ImageType } from '@src/models/product/types';
import { cn } from '@src/lib/helpers/helper';
import TSThumbnail from '@src/lib/typesense/image';
import type { ProductCards } from '@src/models/settings/shop';

const CardDiscountLabel = dynamic(() =>
  import('@src/features/product/card-elements/discount-label').then((mod) => mod.CardDiscountLabel)
);
const CardSaleBadge = dynamic(() =>
  import('@src/features/product/card-elements/sale-badge').then((mod) => mod.CardSaleBadge)
);
const CardNewBadge = dynamic(() =>
  import('@src/features/product/card-elements/new-badge').then((mod) => mod.CardNewBadge)
);
const CardItemsLeftBadge = dynamic(() =>
  import('@src/features/product/card-elements/items-left-badge').then(
    (mod) => mod.CardItemsLeftBadge
  )
);

interface Props extends ProductCards {
  product: Product;
  productFilters?: string;
  productColumns?: string;
  classNames?: string;
  imageClassNames?: string;
  layout?: 'primary' | 'secondary';
  showWishlistButton?: boolean;
  newBadgeColor?: string;
  newBadgeType?: number;
  saleBadgeColor?: string;
  saleBadgeType?: number;
}

export const DefaultProductCard = (props: Props) => {
  const {
    classNames,
    product,
    hasBorders,
    detailsAlignment = 'center',
    showRating = false,
    cardShadow = false,
    hasAddToCart = false,
    layout = 'primary',
    showWishlistButton = false,
    newBadgeColor = '#FF0000',
    newBadgeType = 1,
    saleBadgeColor = '#FF0000',
    saleBadgeType = 1,
  } = props;

  const productLink = seoUrlParser(product?.permalink || '');
  const thumbnailSrc = TSThumbnail.clean(product?.thumbnail?.src || '');
  const { currentCurrency, settings, currentCountry } = useSiteContext();
  // const [compositeComponents, setCompositeComponents] = useState<CompositeProductComponent[]>();

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

  const mainImage: ImageType = {
    src: thumbnailSrc,
    altText: product?.thumbnail?.altText || product?.name || '',
  };

  const displayPrice =
    (regularPrice as { [key: string]: number })?.[currentCurrency] != 0 ? regularPrice : price;
  if (!displayPrice) return null;
  let isOnSale = onSale && (salePrice?.[currentCurrency] as number) > 0;
  if (productType === 'variable') {
    isOnSale = !!find(product.variations, ['onSale', true]);
  }

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
            <div className="product-card-label">
              <CardTitle
                product={parsedProduct}
                ref={ref}
                handleMouseEnter={handleMouseEnter}
                layout={layout}
                fontSize={props.titleFontSize as string}
                link={productLink}
              />
            </div>
            <CardPrice
              product={parsedProduct}
              currency={currentCurrency}
              isTaxExclusive={settings?.isTaxExclusive}
              className="mt-4 !text-base !font-normal justify-start flex-nowrap "
            />
            <div className="relative z-[8] mt-auto max-w-max">
              <CardAddToCart
                product={parsedProduct}
                hasAddToCart={hasAddToCart}
                detailsAlignment={detailsAlignment}
                layout={layout}
              />
            </div>
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
        <CardImage
          product={parsedProduct}
          imageClassNames={props.imageClassNames}
          productFilters={props.productFilters}
          productColumns={props.productFilters}
          showWishlistButton={showWishlistButton}
        />
        {isOnSale && (
          <CardSaleBadge
            badgeType={saleBadgeType}
            badgeColor={saleBadgeColor}
          />
        )}
        <CardNewBadge
          product={parsedProduct}
          badgeType={newBadgeType}
          badgeColor={newBadgeColor}
        />
        <CardItemsLeftBadge
          product={parsedProduct}
          hasItemsLeftBadge={true}
        />
      </div>
      <CardDiscountLabel
        showLabel={props.showDiscountLabel as boolean}
        discount={props.discountPercent as string}
        backgroundColor={props.discountLabelBackgroundColor as string}
      />
      <div className={`product-card-label text-${detailsAlignment}`}>
        <CardLabel product={parsedProduct} />
        <CardTitle
          product={parsedProduct}
          ref={ref}
          handleMouseEnter={handleMouseEnter}
          layout={layout}
          fontSize={props.titleFontSize as string}
          link={productLink}
        />
      </div>
      <div className="flex flex-col justify-end">
        <CardRating
          product={parsedProduct}
          detailsAlignment={detailsAlignment}
          showRating={showRating}
        />
        <div className={`text-${detailsAlignment} w-full lg:w-auto mt-2`}>
          <CardPrice
            product={parsedProduct}
            currency={currentCurrency}
            isTaxExclusive={settings?.isTaxExclusive}
            className={cn('!text-base !font-normal flex-wrap', {
              'justify-left': detailsAlignment === 'left',
              'justify-center': detailsAlignment === 'center',
            })}
          />
        </div>
        {/* {renderAvailableOptions()} */}
      </div>
      <div className="relative mt-auto z-[8]">
        <CardAddToCart
          product={parsedProduct}
          hasAddToCart={hasAddToCart}
          detailsAlignment={detailsAlignment}
          layout={layout}
        />
      </div>
    </div>
  );
};
