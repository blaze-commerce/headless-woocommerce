import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';
import { CarFinder } from '@src/features/product-finder/car-finder';

export const SearchAnotherProduct = ({
  hideSearchButton = false,
  popupIsOpen = false,
  categorySlugs = [],
}: {
  hideSearchButton?: boolean;
  popupIsOpen?: boolean;
  categorySlugs?: string[];
}) => {
  const { settings } = useSiteContext();
  const { store } = settings as Settings;

  const [open, setOpen] = useState(popupIsOpen);
  if (!store?.url?.includes('ezywiper')) return null;

  return (
    <>
      {!hideSearchButton && (
        <div className="pb-2.5 border-b border-[#e5e7eb] lg:pt-0.5 lg:pb-4 mb-4">
          <button
            className={
              'border w-full md:w-auto bg-white font-normal text-base leading-6 text-brand-primary hover:text-white hover:bg-brand-primary px-6 md:px-10 py-2.5 rounded-sm border-brand-primary uppercase'
            }
            type="button"
            onClick={() => setOpen(true)}
          >
            Search For Another Car
          </button>
        </div>
      )}

      <Transition.Root
        show={open}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-30"
          onClose={setOpen}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 bg-cyan-950/50">
              <Dialog.Panel className="w-full max-w-xl bg-white text-black p-8 text-center rounded-sm">
                <Dialog.Title
                  as="h3"
                  className="font-semibold sm:text-3xl sm:leading-9 mb-8 text-xl leading-6"
                >
                  Find&nbsp;
                  <span className="text-brand-primary">Wipers</span> For Your Car
                </Dialog.Title>
                <CarFinder categorySlugs={categorySlugs} />
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
