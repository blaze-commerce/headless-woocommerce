import { find } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useEffectOnce, useIntersectionObserver } from 'usehooks-ts';

import { CardRating } from '@src/features/product/card-elements/rating';
import { CardTitle } from '@src/features/product/card-elements/title';
import { CardLabel } from '@src/features/product/card-elements/label';
import { seoUrlParser } from '@src/components/page-seo';
import { CardAddToCart } from '@src/features/product/card-elements/add-to-cart';
import { CardPrice } from '@src/features/product/card-elements/price';
import { CardProductCategory } from '@src/features/product/card-elements/category';
import { useSiteContext } from '@src/context/site-context';
import { track } from '@src/lib/track';
import { Product, ProductTypesenseResponse } from '@src/models/product';
import { cn } from '@src/lib/helpers/helper';
import type { ProductCards } from '@src/models/settings/shop';
import { GliderMethods } from 'react-glider/dist/types';

const CardSlideshow = dynamic(() =>
  import('@src/features/product/card-elements/slideshow').then((mod) => mod.CardSlideshow)
);

const CardGalleryThumbnail = dynamic(() =>
  import('@src/features/product/card-elements/slideshow-thumbnail').then(
    (mod) => mod.CardGalleryThumbnail
  )
);

const CardImage = dynamic(() =>
  import('@src/features/product/card-elements/image').then((mod) => mod.CardImage)
);

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
  showVariants?: boolean;
  showCategory?: boolean;
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
    showVariants = false,
    showCategory = false,
    newBadgeColor = '#FF0000',
    newBadgeType = 1,
    saleBadgeColor = '#FF0000',
    saleBadgeType = 1,
  } = props;

  const productLink = seoUrlParser(product?.permalink || '');
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

  const gliderRef = useRef<GliderMethods>(null);

  const displayPrice =
    (regularPrice as { [key: string]: number })?.[currentCurrency] != 0 ? regularPrice : price;
  if (!displayPrice) return null;
  let isOnSale = onSale && (salePrice?.[currentCurrency] as number) > 0;
  if (productType === 'variable') {
    isOnSale = !!find(product.variations, ['onSale', true]);
  }

  return (
    <div
      key={product.id}
      className={cn(
        'product-card',
        {
          'has-border': hasBorders,
          'has-shadow': cardShadow,
        },
        classNames
      )}
      style={{
        padding: `${props?.imagePadding}px`,
      }}
    >
      <div>
        {product?.galleryImages && product?.galleryImages.length > 1 && (
          <CardSlideshow
            product={parsedProduct}
            gliderRef={gliderRef}
          />
        )}
        {(!product?.galleryImages || product?.galleryImages.length === 1) && (
          <CardImage
            product={parsedProduct}
            imageClassNames={props.imageClassNames}
            productFilters={props.productFilters}
            productColumns={props.productColumns}
            showWishlistButton={showWishlistButton}
          />
        )}
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
          link={productLink}
        />
        {showCategory && <CardProductCategory product={parsedProduct} />}

        <CardRating
          product={parsedProduct}
          detailsAlignment={detailsAlignment}
          showRating={showRating}
        />
        {product?.galleryImages && product?.galleryImages.length > 1 && (
          <CardGalleryThumbnail
            product={product}
            detailsAlignment={detailsAlignment}
            gliderRef={gliderRef}
          />
        )}
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
