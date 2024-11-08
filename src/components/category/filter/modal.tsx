import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { Fragment } from 'react';

type Props = {
  open: boolean;
  setOpen: (_arg0: boolean) => void;
  name?: string;
  children: React.ReactNode;
  position?: string;
};

export const Modal: React.FC<Props> = ({ open, setOpen, name, children, position }) => {
  return (
    <Transition.Root
      show={open}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-30"
        onClose={setOpen}
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div
          className="fixed inset-0 bg-black/30"
          aria-hidden="true"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={classNames('pointer-events-none fixed inset-y-0 flex max-w-full', {
                'left-0 pr-10': position === 'left',
                'right-0 pl-10': position === 'right',
              })}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom={classNames({
                  '-translate-x-full': position === 'left',
                  'translate-x-full': position === 'right',
                })}
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo={classNames({
                  '-translate-x-full': position === 'left',
                  'translate-x-full': position === 'right',
                })}
              >
                <Dialog.Panel className="pointer-events-auto w-96">
                  <div className="flex h-full flex-col overflow-y-auto bg-white py-2.5 shadow-xl">
                    <div className="px-3.5">
                      <div className="flex items-end justify-end pb-1.5">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary-light focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon
                              className="h-6 w-6 text-[#818A91]"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                      {name && (
                        <Dialog.Title className=" font-semibold text-[#303030] flex gap-3 border-b border-t border-brand-second-gray py-3 text-lg">
                          {name}
                        </Dialog.Title>
                      )}
                    </div>
                    <div className="relative flex-1 px-3.5">{children}</div>
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
