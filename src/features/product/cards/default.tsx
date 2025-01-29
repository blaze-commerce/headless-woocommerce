import { find } from 'lodash';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import siteData from '@public/site.json';
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
import productCards from '@public/product-cards.json';
import { PinterestSaveButton } from '@src/features/pinterest-save-button';

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
const CardOutOfStock = dynamic(() =>
  import('@src/features/product/card-elements/out-of-stock').then((mod) => mod.CardOutOfStock)
);

const CardWishlishButton = dynamic(() =>
  import('@src/features/product/card-elements/wishlist-button').then(
    (mod) => mod.CardWishlishButton
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
  showBadge?: boolean;
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
    showVariants = true,
    showCategory = false,
    showBadge = true,
    newBadgeColor = '#FF0000',
    newBadgeType = 1,
    saleBadgeColor = '#FF0000',
    saleBadgeType = 1,
  } = props;

  const productLink = seoUrlParser(product?.permalink || '');
  const { currentCurrency, settings, currentCountry } = useSiteContext();
  const [showImageVariant, setShowImageVariant] = useState<string>('');
  const [hovered, setHovered] = useState(false);
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

  const renderProductCardsFromTemplate = () => {
    const productCardTemplate = productCards[0];
    return productCardTemplate.innerBlocks.map((block) => {
      switch (block.blockName) {
        case 'woocommerce/product-image': {
          return (
            <div
              className="product-header"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <CardImage
                product={parsedProduct}
                imageClassNames={props.imageClassNames}
                productFilters={props.productFilters}
                productColumns={props.productColumns}
                showWishlistButton={showWishlistButton}
                showImageVariant={showImageVariant}
              />
              {showBadge && (
                <div className="product-badges">
                  {siteData.showShareToPinterestButton && hovered && (
                    <PinterestSaveButton src={parsedProduct?.thumbnail?.src} />
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
              )}

              {showWishlistButton && (
                <CardWishlishButton
                  product={product}
                  hasItemsLeftBadge={true}
                />
              )}

              {product.isOutOfStock && <CardOutOfStock />}
            </div>
          );
        }
        case 'core/post-title': {
          return (
            <CardTitle
              product={parsedProduct}
              handleMouseEnter={handleMouseEnter}
              layout={layout}
              link={productLink}
              className={block.attrs.className}
            />
          );
        }
        case 'woocommerce/product-price': {
          return (
            <CardPrice
              product={parsedProduct}
              currency={currentCurrency}
              isTaxExclusive={settings?.isTaxExclusive}
              className={cn('!text-base !font-normal flex-wrap', block.attrs.className, {
                'justify-left': detailsAlignment === 'left',
                'justify-center': detailsAlignment === 'center',
              })}
            />
          );
        }
        case 'woocommerce/product-rating': {
          return (
            <CardRating
              product={parsedProduct}
              detailsAlignment={detailsAlignment}
              showRating={showRating}
            />
          );
        }
        default:
          return null;
      }
    });
  };

  return (
    <div
      key={product.id}
      className={cn(
        'product-card',
        {
          'has-border': hasBorders,
          'has-shadow': cardShadow,
          'is-variable': product.hasVariations,
          'is-simple': product.isSimple,
          'is-on-sale': isOnSale,
          'is-composite': product.isComposite,
          'is-bundle': product.hasBundle,
          'is-gift-card': product.isGiftCard,
          'is-out-of-stock': product.isOutOfStock,
        },
        classNames,
        `product-${product.id}`
      )}
      style={{
        padding: `${props?.imagePadding}px`,
      }}
    >
      {renderProductCardsFromTemplate()}
      <CardDiscountLabel
        showLabel={props.showDiscountLabel as boolean}
        discount={props.discountPercent as string}
        backgroundColor={props.discountLabelBackgroundColor as string}
      />
      <div className={`product-card-label text-${detailsAlignment}`}>
        <CardLabel product={parsedProduct} />

        {/* {showCategory && <CardProductCategory product={parsedProduct} />} */}
        {showVariants && product.hasVariations && (
          <CardGalleryThumbnail
            product={product}
            detailsAlignment={detailsAlignment}
            setShowImageVariant={setShowImageVariant}
          />
        )}

        {/* {renderAvailableOptions()} */}
      </div>
      <div className="add-to-cart-container">
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
