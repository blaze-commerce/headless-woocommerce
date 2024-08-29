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
          <div
            className="mr-10 z-40 block h-full relative"
            style={style}
          >
            <div
              className={cn('p-4', {
                'border-b': bordered,
              })}
            >
              <FiX
                className="cursor-pointer ml-auto h-6 w-6"
                onClick={() => setIsShowing(false)}
                style={{
                  color: baseTextColor || '#000',
                }}
              />
            </div>
            <div className="overflow-y-auto navbar-overlay-content">{children}</div>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
};
