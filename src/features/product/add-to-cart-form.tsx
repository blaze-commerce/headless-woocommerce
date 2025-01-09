import dynamic from 'next/dynamic';

import { Spinner } from '@src/components/svg/spinner';
import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import { parseApolloError } from '@src/lib/helpers';
import { ProductSettings } from '@src/models/settings/product';
import { cn } from '@src/lib/helpers/helper';

const ProductMatchedVariantPrice = dynamic(() =>
  import('@src/features/product/product-matched-variant-price').then(
    (mod) => mod.ProductMatchedVariantPrice
  )
);

const UnavailableProduct = dynamic(() =>
  import('@src/features/product/unavailable').then((mod) => mod.UnavailableProduct)
);

const WishlistButton = dynamic(() =>
  import('@src/features/wish-list/wish-list-button').then((mod) => mod.WishListButton)
);

export const AddToCartForm = () => {
  const {
    product,
    state: { quantity, addToCart, matchedVariant },
    actions: {
      addToCart: addToCartAction,
      decrementQuantity,
      incrementQuantity,
      onQuantityChange,
      validateQuantity,
      handleAddCompositeToCart,
    },
    giftCards: {
      validation: [isFormValid],
      emailValidation: [isEmailValid],
    },
    addToCartStatus,
  } = useProductContext();
  const { currentCurrency, settings } = useSiteContext();
  const { layout } = settings?.product as ProductSettings;
  const [disableAddToCart] = addToCartStatus;
  const isAddToWishlistEnabled = true;

  if (!product || typeof product === 'undefined') {
    return null;
  }

  const { loading, error } = addToCart;

  const handleAddToCart = () => {
    if (loading) return;

    if (product?.isGiftCard && (!isFormValid || !isEmailValid)) {
      return;
    }
    if (product?.isComposite) {
      handleAddCompositeToCart();
    } else {
      addToCartAction();
    }
  };

  const renderMatchedVariant = () => {
    if (
      // product?.hasSameMinMaxPrice(currentCurrency) ||
      !product?.hasVariations ||
      typeof matchedVariant === 'undefined' ||
      product.hasAddons()
    )
      return null;

    if (!matchedVariant && typeof matchedVariant === 'boolean') {
      return <UnavailableProduct />;
    }

    return (
      <ProductMatchedVariantPrice
        product={matchedVariant}
        currency={currentCurrency}
        isTaxExclusive={settings?.isTaxExclusive}
        className="variable-product-price-matched"
      />
    );
  };

  return (
    <>
      {renderMatchedVariant()}
      <div className="button-container">
        <div className="button-wrapper">
          <span className="quantity-label">Qty:</span>
          <div className="quantity">
            <button
              className={cn('quantity-control', {
                hidden: product?.isGiftCard,
              })}
              onClick={decrementQuantity}
            >
              -
            </button>
            <input
              className="quantity-input"
              type="text"
              value={quantity || ''}
              onChange={onQuantityChange}
              onBlur={validateQuantity}
              disabled={product?.isGiftCard}
            />
            <button
              className={cn('quantity-control', {
                hidden: product?.isGiftCard,
              })}
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
          <button
            disabled={loading || disableAddToCart}
            className="button-add-to-cart"
            onClick={handleAddToCart}
          >
            {loading ? (
              <>
                <Spinner className="text-primary" />
                Adding to cart...
              </>
            ) : (
              <>Add to Cart</>
            )}
          </button>

          {isAddToWishlistEnabled && (
            <WishlistButton
              action="add"
              showIcon={true}
              product={product}
              classNames={cn('wishlist-button', {
                'rounded-sm': layout?.wishlist?.buttonType === '1',
                'rounded-full border': layout?.wishlist?.buttonType === '2',
                'shadow-[0_4px_8px_rgba(0,0,0,0.1)]': layout?.wishlist?.buttonType === '2',
              })}
              buttonBgColor={'#fff'}
              buttonHoverBackgroundColor={settings?.wishlistColor.hoverBackground}
              buttonStrokeColor={settings?.wishlistColor.iconStroke}
              buttonFillColor={settings?.wishlistColor.iconFill}
              isSingleProduct={true}
              hideText={true}
            />
          )}
        </div>
        {error && <div className="text-red-500 pt-4">{parseApolloError(error)}</div>}
      </div>
    </>
  );
};
