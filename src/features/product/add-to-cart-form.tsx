import { useState } from 'react';

import { ArrowRightIcon } from '@heroicons/react/20/solid';

import { WishListIcon } from '@src/features/wish-list/wish-list-icon';
import { Price } from '@src/features/product/price';
import { AddToCartBundle } from '@src/features/product/add-to-cart/bundle';
import { Spinner } from '@src/components/svg/spinner';
import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import { parseApolloError } from '@src/lib/helpers';
import { Settings } from '@src/models/settings';
import { ProductSettings } from '@src/models/settings/product';
import { cn } from '@src/lib/helpers/helper';

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
  } = useProductContext();
  const { currentCurrency, settings } = useSiteContext();
  const { store } = settings as Settings;
  const { layout } = settings?.product as ProductSettings;
  const [unavailable, setUnavailable] = useState(false);

  if (
    !product ||
    !product?.shouldShowAddToCart ||
    (product.productType == 'simple' && product.isFree(currentCurrency))
  ) {
    return null;
  }

  const invalid = product?.hasVariations && !matchedVariant;

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
    if (product?.hasSameMinMaxPrice(currentCurrency) || !product?.hasVariations || !matchedVariant)
      return null;

    return (
      <div className="py-4">
        <Price
          product={matchedVariant}
          currency={currentCurrency}
          isTaxExclusive={settings?.isTaxExclusive}
          className="!text-base !font-bold"
        />
      </div>
    );
  };

  return (
    <>
      {renderMatchedVariant()}
      {product.hasBundle && (
        <AddToCartBundle
          unavailable={unavailable}
          setUnavailable={setUnavailable}
        />
      )}
      <div className="fixed bottom-0 right-0 p-4 bg-brand-secondary w-full lg:w-auto md:bg-[#ECEEEFE8] z-10 lg:z-0 lg:bg-transparent lg:relative lg:p-0 max-w-[100vw]">
        <div className="flex items-stretch justify-start gap-2.5">
          <span className="items-center text-sm text-black font-bold flex">Qty:</span>
          <div className="quantity">
            <div
              className={cn('quantity-control text-black', {
                hidden: product?.isGiftCard,
              })}
              onClick={decrementQuantity}
            >
              -
            </div>
            <input
              className="quantity-input text-black"
              type="text"
              value={quantity || ''}
              onChange={onQuantityChange}
              onBlur={validateQuantity}
              disabled={product?.isGiftCard}
            />
            <div
              className={cn('quantity-control text-black', {
                hidden: product?.isGiftCard,
              })}
              onClick={incrementQuantity}
            >
              +
            </div>
          </div>
          <button
            disabled={loading || invalid || unavailable}
            className={cn(
              'add-to-cart flex items-center justify-center bg-brand-button-background hover:bg-brand-hover-button-background text-brand-button-text hover:text-brand-hover-button-text sm:px-4 p-0 flex-grow w-full text-sm font-medium',
              {
                'opacity-50': loading || invalid || unavailable,
                'bg-brand-secondary': !settings?.buttonColor?.background,
                'text-white': !settings?.buttonColor?.text,
              }
            )}
            // style={{
            //   color: settings?.buttonColor?.text ?? '',
            //   backgroundColor: settings?.buttonColor?.background ?? '',
            // }}
            onClick={handleAddToCart}
          >
            {loading ? (
              <>
                <Spinner className="text-white" />
                Adding to cart...
              </>
            ) : (
              <>
                ADD TO CART
                <ArrowRightIcon className="w-4 h-4 md:w-6 md:h-6 inline-block" />
              </>
            )}
          </button>

          {store?.wishlist?.enabled && (
            <WishListIcon
              action="add"
              showIcon={true}
              product={product}
              classNames={cn(
                'cursor-pointer group/wishlist flex justify-center items-center p-2.5 w-14',
                {
                  'rounded-sm border': layout?.wishlist?.buttonType === '1',
                  'rounded-full border': layout?.wishlist?.buttonType === '2',
                  'shadow-[0_4px_8px_rgba(0,0,0,0.1)]': layout?.wishlist?.buttonType === '2',
                }
              )}
              buttonBgColor={'#fff'}
              buttonHoverBackgroundColor={settings?.wishlistColor.hoverBackground}
              buttonStrokeColor={settings?.wishlistColor.iconStroke}
              buttonFillColor={settings?.wishlistColor.iconFill}
              isSingleProduct={true}
            />
          )}
        </div>
        {error && <div className="text-red-500 pt-4">{parseApolloError(error)}</div>}
      </div>
    </>
  );
};
