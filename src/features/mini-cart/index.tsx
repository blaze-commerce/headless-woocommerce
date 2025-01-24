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
import { Recommendation } from '@src/features/mini-cart/recommendation';
import { Content } from '@src/components/blocks/content';

import miniCartBlocks from '@public/minicart.json';

const ViewCartLoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center gap-5 w-full flex-1 bg-muted text-muted-foreground border border-transparent text-base font-semibold py-3 h-12 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-brand-gold sm:w-full uppercase">
      <div className="w-4 h-4 bg-primary animate-ping rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-primary animate-ping rounded-full flex items-center justify-center"></div>
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
        'button-checkout text-sm font-bold text-white bg-primary hover:bg-primary/90 p-4 text-center w-full md:w-auto rounded-md h-10 px-4 py-2 flex items-center justify-center'
      )}
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
        className="font-primary relative z-20 mini-cart"
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
            <Content
              type="mini-cart"
              content={miniCartBlocks}
            />
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
