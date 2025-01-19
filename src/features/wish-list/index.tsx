import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { useSiteContext } from '@src/context/site-context';
import { Content } from '@src/components/blocks/content';

import wishlistBlocks from '@public/wishlist.json';

// @TODO Check if the wishilist feature is turned on

export const WishList = () => {
  const { query } = useRouter();
  const { wishListState } = useSiteContext();
  const [open, setOpen] = wishListState;

  useEffect(() => {
    setTimeout(() => {
      const html = document.body.parentNode as HTMLElement;
      html.style.overflow = open ? 'hidden' : 'unset';
    }, 1000);
  }, [open]);

  useEffect(() => {
    if (+(query?.wishlist as string) === 1) {
      setOpen(true);
    }
  }, [query?.wishlist, setOpen]);

  return (
    <Transition.Root
      show={open}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="wishlist wishlist-dialog"
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
              content={wishlistBlocks}
            />
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
