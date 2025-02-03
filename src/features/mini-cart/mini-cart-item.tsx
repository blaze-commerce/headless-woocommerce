import { useMutation } from '@apollo/client';
import { find } from 'lodash';
import { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';

import { MiniCartItemSkeleton } from '@src/features/mini-cart/mini-cart-item-skeleton';
import { Image } from '@src/components/common/image';
import { useSiteContext } from '@src/context/site-context';
import { REMOVE_CART_ITEM, UPDATE_CART_ITEM_QUANTITY } from '@src/lib/graphql/queries';
import { type ProductCartItem } from '@src/lib/hooks/cart';
import { track } from '@src/lib/track';
import { parseApolloError } from '@src/lib/helpers';
import { cn, getCurrencySymbol, removeCurrencySymbol } from '@src/lib/helpers/helper';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { TrashIcon } from '@src/features/mini-cart/trash-icon';

type Props = {
  cartItem: ProductCartItem;
};

export const MiniCartItem = ({ cartItem }: Props) => {
  const { setCartUpdating, fetchCart, currentCurrency, settings } = useSiteContext();
  const [currentQuantity, setCurrentQuantity] = useState<number>();

  const [
    removeItemFromCart,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    { data: actionResponse, loading: isRemoving, error: removingCartError },
  ] = useMutation(REMOVE_CART_ITEM, {
    variables: {
      cartKey: cartItem.cartKey,
    },
    onCompleted: () => {
      track.removeFromCart(cartItem);
      // Update cart data in React Context.
      fetchCart();
      setCartUpdating(false);
    },
    onError: (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error?.graphQLErrors?.[0]?.message ?? '');
      }
    },
  });

  const [updateCartQuantity, { error: updateQuantityError }] = useMutation(
    UPDATE_CART_ITEM_QUANTITY,
    {
      onCompleted: () => {
        // Update cart data in React Context.
        fetchCart();
        setCartUpdating(false);
      },
    }
  );

  const isTypeUnsupported = (cartItem.type = 'UNSUPPORTED');

  const hasReachedLimit = () => {
    return cartItem.stockQuantity ? parseInt(cartItem.qty) >= cartItem.stockQuantity : false;
  };

  useEffect(() => {
    if (isRemoving) {
      setCartUpdating(true);
    }
  }, [isRemoving, setCartUpdating]);

  useEffect(() => {
    setCurrentQuantity(parseInt(cartItem.qty));
  }, [cartItem.qty]);

  if (isRemoving) {
    return <MiniCartItemSkeleton />;
  }

  const updateQuantity = (value: number) => {
    setCurrentQuantity(value);
    updateCartQuantity({
      variables: {
        input: {
          items: [
            {
              key: cartItem.cartKey,
              quantity: value,
            },
          ],
        },
      },
    });
  };

  const increaseQuantity = () => {
    const quantity = parseInt(cartItem.qty);
    if (hasReachedLimit()) {
      return;
    }
    const newQuantity = quantity + 1;
    updateQuantity(newQuantity);
  };

  const updateInputQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity === parseInt(cartItem.qty)) return;
    updateQuantity(newQuantity);
  };

  const decreaseQuantity = () => {
    const newQuantity = parseInt(cartItem.qty) - 1;
    updateQuantity(newQuantity);
  };

  const isCartItemTypeComposite = cartItem.cartItemType === 'CompositeCartItem';
  const productType = cartItem.type.toLowerCase();
  const isSimple = productType === 'simple';
  const isComposite = productType === 'composite';

  const isCompositeChildren = isSimple && isCartItemTypeComposite;
  const isCompositeParent = isComposite && isCartItemTypeComposite;
  const isBundleItem = cartItem.cartItemType === 'BundleCartItem';

  const hasBundleItems =
    isBundleItem && cartItem.bundledProductItems && cartItem.bundledProductItems.length > 0;

  const renderComponentName = () => {
    const componentId = find(cartItem.extraData, ['key', 'composite_item'])?.value || '';
    const components = JSON.parse(find(cartItem.extraData, ['key', 'composite_data'])?.value || '');
    const componentName = components[componentId]?.title || '';

    return (
      <div className="w-full text-sm font-bold uppercase mb-2">
        <ReactHTMLParser html={componentName} />
      </div>
    );
  };

  const priceDisplay = settings?.isTaxExclusive ? cartItem.subTotal : cartItem.total;
  return (
    <>
      <div
        className={cn('flex w-full pb-4', {
          '-mt-5 flex-wrap': isCompositeChildren,
          'border-b': !isCompositeChildren && !isCompositeParent,
          'space-x-4': !isCompositeChildren,
        })}
      >
        {isCompositeChildren && renderComponentName()}
        {!isCompositeChildren && (
          <div className="w-[94px] h-[94px] flex-shrink-0 overflow-hidden border border-gray-200 rounded-md">
            <a href={'/product/' + cartItem.slug}>
              <Image
                src={cartItem.image.sourceUrl}
                alt={cartItem.image.altText}
                width={68}
                height={61}
                className="h-full w-full object-cover object-center"
              />
            </a>
          </div>
        )}

        <div className=" flex flex-col flex-1 gap-2">
          <h3 className="leading-3">
            <a
              href={'/product/' + cartItem.slug}
              className={cn('text-base font-bold font-secondary', {
                'text-primary': !isCompositeChildren,
              })}
            >
              {cartItem.name}
            </a>
          </h3>

          {hasBundleItems && (
            <ul className="flex flex-col gap-1">
              {cartItem.bundledProductItems?.map((bundleItem) => (
                <li
                  key={bundleItem.cartKey}
                  className="text-xs text-neutral-400"
                >
                  {bundleItem.name} x {bundleItem.qty}
                </li>
              ))}
            </ul>
          )}

          {!isTypeUnsupported &&
            cartItem.attributes?.map((attribute) => (
              <span
                className="text-gray-500 text-xs"
                key={attribute.id}
              >
                {attribute.label}: {attribute.value}
              </span>
            ))}
          <span className="text-brand-font">
            {!isCompositeChildren && (
              <span className="minicart-item-price font-bold text-black/80 text-sm mb-2 block">
                {getCurrencySymbol(currentCurrency)}
                {removeCurrencySymbol(currentCurrency, `${priceDisplay}`)}
              </span>
            )}
            {!isCompositeChildren && (
              <div className="p-0 z-10 md:mb-4 md:relative">
                <div className="flex items-center justify-start gap-2">
                  <span className="hidden items-center text-black text-sm font-bold">Qty:</span>
                  <div className="flex border rounded-md">
                    <div
                      className="minicart-item-control decrement cursor-pointer flex items-center justify-center text-xl w-9 h-[45px]"
                      onClick={decreaseQuantity}
                    >
                      -
                    </div>
                    <input
                      type="text"
                      value={currentQuantity || ''}
                      onChange={(e) => setCurrentQuantity(parseInt(e.target.value))}
                      onBlur={updateInputQuantity}
                      className="w-9 h-[45px] px-2 text-center border-x border-y-0 outline-none flex items-center justify-center border-gray-200 "
                    />
                    <div
                      className={cn(
                        'minicart-item-control increment cursor-pointer flex items-center justify-center text-xl w-9 h-[45px]',
                        {
                          'opacity-50': hasReachedLimit(),
                        }
                      )}
                      onClick={increaseQuantity}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            )}
          </span>
        </div>

        {!isCompositeChildren && (
          <div className="flex items-start justify-between text-sm">
            <p className="text-gray-500"></p>

            <div className="">
              <button
                type="button"
                className="btn-remove-item-from-cart group hover:border-brand-primary w-5 h-5 text-black hover:text-black flex items-center justify-center"
                onClick={() =>
                  removeItemFromCart({
                    variables: { cartKey: cartItem.cartKey },
                  })
                }
              >
                <TrashIcon className=" text-brand-second-gray group-hover:text-brand-primary" />
              </button>
            </div>
          </div>
        )}
      </div>
      {updateQuantityError && (
        <div className="text-red-500 -mt-4 text-center w-full">
          {parseApolloError(updateQuantityError)}
        </div>
      )}
      {isCompositeParent && <p className="block w-full">Your Selection:</p>}
    </>
  );
};
