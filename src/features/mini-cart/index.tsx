import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { HiX } from 'react-icons/hi';
import { useIsClient } from 'usehooks-ts';

import { AppliedCoupon } from '@src/features/mini-cart/applied-coupon';
import { CouponCode } from '@src/features/mini-cart/coupon-code';
import { FreeShippingProgress } from '@src/components/free-shipping-progress';
import { MiniCartItem } from '@src/features/mini-cart/mini-cart-item';
import { MiniCartItemSkeleton } from '@src/features/mini-cart/mini-cart-item-skeleton';
import { useSiteContext } from '@src/context/site-context';
import { numberFormat } from '@src/lib/helpers/product';
import { cn, getCurrencySymbol } from '@src/lib/helpers/helper';
import { WishListRecentlyViewed } from '@src/features/wish-list/wish-list-recently-viewed';

const ViewCartLoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center gap-5 w-full flex-1 bg-brand-primary-light border border-transparent text-base font-semibold py-3 h-12 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-brand-gold sm:w-full uppercase">
      <div className="w-4 h-4 bg-white animate-ping rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white animate-ping rounded-full flex items-center justify-center"></div>
      </div>
      Loading Cart...
    </div>
  );
};

const ProceedToCheckoutButton = ({
  backgroundColor,
  textColor,
}: {
  backgroundColor?: string;
  textColor?: string;
}) => {
  return (
    <a
      href={`${process.env.NEXT_PUBLIC_CHECKOUT_URL}`}
      className={cn(
        'button-checkout text-sm font-bold block text-white p-4 uppercase text-center w-full md:w-auto',
        {
          'text-white': !textColor,
          'bg-black': !backgroundColor,
        }
      )}
      style={{ color: textColor ?? '', backgroundColor: backgroundColor ?? '' }}
    >
      Checkout
    </a>
  );
};

export const MiniCart = () => {
  const { query } = useRouter();
  const { miniCartState, cart, fetchingCart, cartUpdating, currentCurrency, settings } =
    useSiteContext();
  const [open, setOpen] = miniCartState;
  const isClient = useIsClient();

  const hasCartItems = cart !== null && cart?.products?.length > 0 ? true : false;

  useEffect(() => {
    setTimeout(() => {
      const html = document.body.parentNode as HTMLElement;
      html.style.overflow = open ? 'hidden' : 'unset';
    }, 1000);
  }, [open]);

  useEffect(() => {
    if (+(query?.cart as string) === 1) {
      setOpen(true);
    }
  }, [query?.cart, setOpen]);

  const subtotalDisplay = settings?.isTaxExclusive ? cart.subtotal : cart.total;
  return (
    <Transition.Root
      show={open}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="font-sans relative z-20"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-[calc(100%-3rem)] md:max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-[344px]">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between border-b pb-4">
                        <Dialog.Title className="font-bold text-black text-sm uppercase">
                          Your Cart ({cart?.products?.length || 0})
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="button-close-minicart -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <HiX
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>

                      <FreeShippingProgress />

                      <div className="mt-8">
                        <div className="flow-root">
                          {hasCartItems ? (
                            <ul
                              role="list"
                              className="-my-4 minicart-items"
                            >
                              {cart.products.map((cartItem, i: number) => {
                                return (
                                  <li
                                    key={i}
                                    className="flex py-4 flex-wrap"
                                  >
                                    <MiniCartItem cartItem={cartItem} />
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <>
                              {!fetchingCart && <p className="text-center">No Items in the cart</p>}
                            </>
                          )}
                          {fetchingCart && (
                            <ul
                              role="list"
                              className="-my-4"
                            >
                              <li className="py-4">
                                <MiniCartItemSkeleton />
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                    {hasCartItems && <CouponCode />}

                    {hasCartItems ? (
                      <div className=" py-6 pt-0 px-4 sm:px-6">
                        <AppliedCoupon appliedCoupons={cart.appliedCoupons} />
                        {parseInt(cart.feeTotal || '', 10) > 0 && (
                          <div className="flex text-black justify-between text-base border-t font-bold border-y-brand-second-gray pt-6 pb-2 ">
                            <p>Discount:</p>
                            <p className="subtotal">
                              {getCurrencySymbol(currentCurrency)}
                              {cart.feeTotal}
                            </p>
                          </div>
                        )}

                        <div className="flex text-black justify-between text-base border-t font-bold border-y-brand-second-gray pt-6 pb-2 ">
                          <p>Subtotal:</p>
                          <p className="subtotal">
                            {getCurrencySymbol(currentCurrency)}
                            {numberFormat(parseFloat(subtotalDisplay || ''))}
                          </p>
                        </div>
                        {/* <div className="flex text-brand-primary justify-between text-lg font-bold">
                          <p>Total:</p>
                          <p>{numberFormat(parseFloat(cart.total || '0'))}</p>
                        </div> */}
                        <div className="mt-6">
                          {isClient && (cartUpdating || fetchingCart) ? (
                            <ViewCartLoadingIndicator />
                          ) : (
                            <ProceedToCheckoutButton
                              backgroundColor={settings?.buttonColor?.background as string}
                              textColor={settings?.buttonColor?.text as string}
                            />
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
