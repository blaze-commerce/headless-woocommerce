import { Transition } from '@headlessui/react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useUpdateEffect } from 'usehooks-ts';

type NavbarWithOverlayProps = {
  // eslint-disable-next-line no-unused-vars
  children: ({
    // eslint-disable-next-line no-unused-vars
    isShowing,
    // eslint-disable-next-line no-unused-vars
    setIsShowing,
  }: {
    isShowing: boolean;
    setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
  paddingless?: boolean;
  className?: string;
  content: React.ReactNode;
};

const defaultProps = {
  paddingless: true,
};

export const NavbarWithOverlay: React.FC<NavbarWithOverlayProps> = ({
  children,
  className,
  paddingless,
  content,
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const classes = cx('mx-auto flex items-center relative w-full', className, {
    'py-4': !paddingless,
  });

  const { asPath } = useRouter();

  useEffect(() => {
    const html = document.body.parentNode as HTMLElement;
    html.style.overflow = isShowing ? 'hidden' : 'unset';
  }, [isShowing]);

  useUpdateEffect(() => {
    setIsShowing(false);
  }, [asPath]);

  return (
    <>
      <div className="bg-brand-primary">
        <div className={classes}>{children({ isShowing, setIsShowing })}</div>
      </div>
      <Transition.Root
        show={isShowing}
        as={React.Fragment}
      >
        <div className="fixed inset-y-0 inset-x-0 z-20">
          <Transition.Child
            as={React.Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setIsShowing(false)}
            ></div>
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="transform ease-in-out duration-500 sm:duration-700"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="mr-10 z-40 bg-white block h-full">
              <div className="p-4 border-b">
                <FiX
                  className="cursor-pointer text-black ml-auto h-6 w-6"
                  onClick={() => setIsShowing(false)}
                />
              </div>
              <div className="overflow-y-auto p-2.5 navbar-overlay-content">{content}</div>
            </div>
          </Transition.Child>
        </div>
      </Transition.Root>
    </>
  );
};

NavbarWithOverlay.defaultProps = defaultProps;
