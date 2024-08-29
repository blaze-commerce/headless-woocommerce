import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { HiX } from 'react-icons/hi';

import { WishListItems } from '@src/features/wish-list/wish-list-items';
import { WishListRecentlyViewed } from '@src/features/wish-list/wish-list-recently-viewed';
import { font } from '@public/fonts';
import { useSiteContext } from '@src/context/site-context';

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
        className={`${font.variable} font-sans relative z-20`}
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
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-[429px]">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="overflow-y-auto py-5 px-4 sm:px-5">
                      <div className="flex items-center al justify-between border-b pb-4">
                        <Dialog.Title className="font-bold text-black text-base uppercase">
                          WISHLIST
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

                      <div className="">
                        <div className="flow-root">
                          <WishListItems />
                          <WishListRecentlyViewed />
                        </div>
                      </div>
                    </div>
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
