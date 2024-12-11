import { Transition } from '@headlessui/react';
import { cn } from '@src/lib/helpers/helper';
import cx from 'classnames';
import { useRouter } from 'next/router';
import React, { CSSProperties, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useUpdateEffect } from 'usehooks-ts';

type Props = {
  children: React.ReactNode;
  isShowing: boolean;
  className?: string;
  baseTextColor?: string;
  bordered?: boolean;
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
  style: CSSProperties;
};

export const Overlay: React.FC<Props> = ({
  isShowing,
  className,
  children,
  style,
  setIsShowing,
  baseTextColor,
  bordered = true,
}) => {
  const classes = cx('mx-auto flex items-center relative w-full', className);

  // const { asPath } = useRouter();

  // useEffect(() => {
  //   const html = document.body.parentNode as HTMLElement;
  //   html.style.overflow = isShowing ? 'hidden' : 'unset';
  // }, [isShowing]);

  // useUpdateEffect(() => {
  //   setIsShowing(false);
  // }, [asPath]);

  return (
    <Transition.Root
      show={isShowing}
      as={React.Fragment}
    >
      <div className="fixed inset-y-0 inset-x-0 z-50">
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
          <div
            className="mr-10 px-4 max-w-[349px] block h-full relative"
            style={style}
          >
            <div
              className={cn('py-4', {
                'border-b': bordered,
              })}
            >
              <svg
                onClick={() => setIsShowing(false)}
                className="cursor-pointer ml-auto h-9 w-9"
                width="30"
                height="31"
                viewBox="0 0 30 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15 0.875C6.9225 0.875 0.375 7.4225 0.375 15.5C0.375 23.5775 6.9225 30.125 15 30.125C23.0775 30.125 29.625 23.5775 29.625 15.5C29.625 7.4225 23.0775 0.875 15 0.875ZM12.42 11.33C12.317 11.2195 12.1928 11.1308 12.0548 11.0693C11.9168 11.0078 11.7678 10.9748 11.6168 10.9721C11.4657 10.9694 11.3157 10.9972 11.1756 11.0538C11.0355 11.1104 10.9083 11.1946 10.8014 11.3014C10.6946 11.4083 10.6104 11.5355 10.5538 11.6756C10.4972 11.8157 10.4694 11.9657 10.4721 12.1168C10.4748 12.2678 10.5078 12.4168 10.5693 12.5548C10.6308 12.6928 10.7195 12.817 10.83 12.92L13.41 15.5L10.83 18.08C10.7195 18.183 10.6308 18.3072 10.5693 18.4452C10.5078 18.5832 10.4748 18.7322 10.4721 18.8832C10.4694 19.0343 10.4972 19.1843 10.5538 19.3244C10.6104 19.4645 10.6946 19.5917 10.8014 19.6986C10.9083 19.8054 11.0355 19.8896 11.1756 19.9462C11.3157 20.0028 11.4657 20.0306 11.6168 20.0279C11.7678 20.0252 11.9168 19.9922 12.0548 19.9307C12.1928 19.8692 12.317 19.7805 12.42 19.67L15 17.09L17.58 19.67C17.683 19.7805 17.8072 19.8692 17.9452 19.9307C18.0832 19.9922 18.2322 20.0252 18.3832 20.0279C18.5343 20.0306 18.6843 20.0028 18.8244 19.9462C18.9645 19.8896 19.0917 19.8054 19.1986 19.6986C19.3054 19.5917 19.3896 19.4645 19.4462 19.3244C19.5028 19.1843 19.5306 19.0343 19.5279 18.8832C19.5252 18.7322 19.4922 18.5832 19.4307 18.4452C19.3692 18.3072 19.2805 18.183 19.17 18.08L16.59 15.5L19.17 12.92C19.2805 12.817 19.3692 12.6928 19.4307 12.5548C19.4922 12.4168 19.5252 12.2678 19.5279 12.1168C19.5306 11.9657 19.5028 11.8157 19.4462 11.6756C19.3896 11.5355 19.3054 11.4083 19.1986 11.3014C19.0917 11.1946 18.9645 11.1104 18.8244 11.0538C18.6843 10.9972 18.5343 10.9694 18.3832 10.9721C18.2322 10.9748 18.0832 11.0078 17.9452 11.0693C17.8072 11.1308 17.683 11.2195 17.58 11.33L15 13.91L12.42 11.33Z"
                  fill="#777777"
                />
              </svg>
            </div>
            <div className="overflow-y-auto navbar-overlay-content z-20 h-[calc(100vh-120px)]">
              {children}
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
};
