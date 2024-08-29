import cx from 'classnames';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver, useMediaQuery } from 'usehooks-ts';

import { ChevronDown } from '@components/svg/chevron-down';
import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';

type NavbarLinkProps = {
  children: React.ReactNode;
  href: string;
  isSubmenu: boolean;
  icon?: React.ReactNode;
  hasChevronDownIcon?: boolean | null;
};

const defaultProps = {
  isSubmenu: false,
  icon: undefined,
};

export const NavbarLink = ({ children, href, hasChevronDownIcon }: NavbarLinkProps) => {
  const [text, submenu] = React.Children.toArray(children);
  const [prefetched, setPrefetched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { push, prefetch } = useRouter();
  const matches = useMediaQuery('(min-width: 768px)');
  const { settings, currentCountry } = useSiteContext();
  const { header } = settings as Settings;

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const classes = cx('text-xs', 'group-[.vertical]:border-b group-[.vertical]:after:content-[""]', {
    'navbar-has-submenu': !!submenu,
    'h-full': !!submenu,
    open: isOpen,
    'flex relative items-center after:content-["|"] last-of-type:after:content-[""] after:text-2xl after:font-thin after:text-[#EBEBEB]':
      header?.layout?.navIconSeparator,
  });

  useEffect(() => {
    if (isVisible) {
      prefetch(`/${currentCountry}${href}`);
    }
  }, [isVisible, currentCountry, prefetch, href]);

  const handleMouseEnter = () => {
    if (!prefetched) {
      prefetch(`/${currentCountry}${href}`);
      setPrefetched(true);
    }
  };

  const handleOnClick = () => {
    if (matches || isOpen || !submenu) {
      push(href, href + '#top', { scroll: true });
      return;
    }

    setIsOpen(true);
  };

  const handleOnToggle = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  if (isEmpty(href)) {
    return (
      <li className={classes}>
        <div className="py-4 px-2 lg:px-4 cursor-pointer w-full link flex items-center">
          {text}
          {!!submenu && hasChevronDownIcon && (
            <span className="inline-block ml-2">
              <ChevronDown
                color="none"
                fillColor={settings?.header?.customColors?.link?.color || ''}
              />
            </span>
          )}
        </div>
        {submenu}
      </li>
    );
  }
  return (
    <li className={classes}>
      <div
        onMouseEnter={handleMouseEnter}
        onClick={handleOnClick}
        className="h-full p-4 px-2 cursor-pointer w-full link flex items-center"
      >
        {text}
        {!!submenu && hasChevronDownIcon && (
          <span
            onClick={handleOnToggle}
            className="inline-block ml-2"
          >
            <ChevronDown
              color="none"
              fillColor={settings?.header?.customColors?.link?.color || ''}
            />
          </span>
        )}
      </div>
      {submenu}
    </li>
  );
};

NavbarLink.defaultProps = defaultProps;
