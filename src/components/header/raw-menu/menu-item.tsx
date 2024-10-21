import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver, useUpdateEffect } from 'usehooks-ts';

import Menu from '@components/header/menu';
import { ChevronDown } from '@components/svg/chevron-down';
import { MegaMenu } from '@src/components/header/menu/mega-menu';
import { useSiteContext } from '@src/context/site-context';
import type { MegaMenuItem } from '@src/lib/helpers/menu';
import { cn, makeLinkRelative } from '@src/lib/helpers/helper';
import Link from 'next/link';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

export type MenuItemType = {
  href?: string;
  component?: JSX.Element;
  onClick?: () => void;
  borderless?: boolean;
  isSubmenu?: boolean;
  label?: string;
  subMenuItems?: MenuItemType[] | JSX.Element[];
  name?: string;
  className?: string;
  linkClassName?: string;
  children?: React.ReactNode;
} & MegaMenuItem;

export const MenuItem: React.FC<MenuItemType> = ({
  href,
  component,
  label,
  subMenuItems,
  isSubmenu = false,
  className = '',
  linkClassName = '',
  isMegaMenu,
  megaMenuItems,
  children,
}) => {
  const { currentCountry, settings } = useSiteContext();

  const { push, prefetch, asPath } = useRouter();

  const ref = useRef(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const [isOpen, setIsOpen] = useState(false);
  const relativeLink = makeLinkRelative(href as string);
  const [isHovering, setIsHovering] = useState(false);
  // const [isTouching, setIsTouching] = useState(false);

  useUpdateEffect(() => {
    setIsHovering(false);
  }, [asPath]);

  useEffect(() => {
    if (isVisible && href) {
      prefetch(`/${currentCountry}${relativeLink}`);
    }
  }, [isVisible, currentCountry, prefetch, href, relativeLink]);

  const handleMouseOver = () => {
    setIsHovering(true);
    if (href) {
      prefetch(`/${currentCountry}${relativeLink}`);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const shouldShowSubmenuItems = () => subMenuItems || megaMenuItems;
  const shouldShowSubmenu = () => isSubmenu || isMegaMenu;

  const liClasses = cn(className, {
    'is-open': isOpen,
  });

  const linkClasses = cn(linkClassName, {
    'has-submenu flex-wrap': href && shouldShowSubmenuItems(),
    relative: subMenuItems,
    'gap-2': !href || !shouldShowSubmenuItems(),
    'hover:text-brand-primary hover:bg-white':
      (!href || !shouldShowSubmenuItems()) &&
      shouldShowSubmenu() &&
      !settings?.header?.customColors?.enabled,
    'lg:hover:bg-brand-primary':
      href && shouldShowSubmenuItems() && !settings?.header?.customColors?.enabled,
  });

  const renderSubMenuItems = () => {
    if (!subMenuItems || !isHovering) return null;
    return (
      <Menu isSubmenu>
        {subMenuItems.map((item, index) => {
          if ((item as MenuItemType).label !== undefined) {
            return (
              <MenuItem
                {...item}
                key={index}
                isSubmenu
                borderless
                linkClassName="!py-1 !font-bold"
                className="w-max"
              />
            );
          }
        })}
      </Menu>
    );
  };

  const renderMegaMenuItems = () => {
    if (!isMegaMenu || !megaMenuItems) return null;
    return <MegaMenu megaMenuItems={megaMenuItems} />;
  };

  return (
    <li
      className={liClasses}
      onClick={() => setIsOpen(!isOpen)}
    >
      <Link
        href={href ? href : '#'}
        passHref
      >
        <a
          ref={ref}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          className={linkClasses}
        >
          <ReactHTMLParser html={label || ''} />

          {shouldShowSubmenuItems() && (
            <ChevronDown
              className={`main-menu-link-fill inline-block ml-auto lg:ml-2 ${
                isOpen ? 'rotate-180 lg:rotate-0' : ''
              }`}
            />
          )}
        </a>
      </Link>

      {children}
    </li>
  );
};

MenuItem.defaultProps = {
  href: undefined,
  isSubmenu: false,
  onClick: () => {},
};
