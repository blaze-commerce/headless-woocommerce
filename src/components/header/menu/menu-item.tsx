import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useIntersectionObserver, useUpdateEffect } from 'usehooks-ts';

import { RawLink } from '@src/components/common/raw-link';
import Menu from '@components/header/menu';
import { ChevronDown } from '@components/svg/chevron-down';
import { MegaMenu } from '@src/components/header/menu/mega-menu';
import { useSiteContext } from '@src/context/site-context';
import type { DisplayType, MegaMenuItem } from '@src/lib/helpers/menu';
import { getDisplayTypeValues } from '@src/lib/helpers/menu';
import { cn, makeLinkRelative } from '@src/lib/helpers/helper';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

export type MenuItemType = {
  href?: string;
  component?: JSX.Element;
  onClick?: () => void;
  icon?: JSX.Element;
  isLast?: boolean;
  displayType?: DisplayType | string | null;
  borderless?: boolean;
  isSubmenu?: boolean;
  label?: string;
  subMenuItems?: MenuItemType[] | JSX.Element[];
  name?: string;
  className?: string;
  linkClassName?: string;
} & MegaMenuItem;

export const MenuItem: React.FC<MenuItemType> = ({
  href,
  component,
  onClick,
  icon,
  label,
  isLast,
  subMenuItems,
  displayType = 'both',
  borderless = false,
  isSubmenu = false,
  className = '',
  linkClassName = '',
  isMegaMenu,
  megaMenuItems,
}) => {
  const { currentCountry, settings } = useSiteContext();

  const { push, prefetch, asPath } = useRouter();

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const [isOpen, setIsOpen] = useState(false);
  const relativeLink = makeLinkRelative(href as string);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  useUpdateEffect(() => {
    setIsHovering(false);
  }, [asPath]);

  useEffect(() => {
    if (isVisible && href) {
      prefetch(`/${currentCountry}${relativeLink}`);
    }
  }, [isVisible, currentCountry, prefetch, href, relativeLink]);

  if (component) return React.cloneElement(component, { isLast });

  const { showIcon, showText } = getDisplayTypeValues(displayType);

  const handleMouseLinkHover = () => {
    if (href) {
      prefetch(`/${currentCountry}${relativeLink}`);
    }
  };

  const handleMouseOver = () => {
    handleMouseLinkHover();
    setIsHovering(true);
  };

  const handleMouseClick = () => {
    if (href) {
      push(`/${currentCountry}${relativeLink}`, relativeLink);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleOnTouchStart = () => {
    setIsTouching(true);
  };

  const handleOnTouchEnd = () => {
    setIsTouching(false);
  };

  const shouldShowSubmenuItems = () => subMenuItems || megaMenuItems;
  const shouldShowSubmenu = () => isSubmenu || isMegaMenu;

  const classes = cn('flex items-center', className, {
    // 'after:content-["|"]': !shouldShowSubmenu() && !borderless && !isLast,
    'is-open': isOpen,
  });

  const getLinkClasses = () => {
    return cn(
      'nav-item p-4 h-full inline-flex items-center group w-full hover:cursor-pointer text-ellipsis',
      linkClassName,
      {
        'has-submenu flex-wrap': href && shouldShowSubmenuItems(),
        relative: subMenuItems,
        'gap-2': !href || !shouldShowSubmenuItems(),
        'hover:text-brand-primary hover:bg-white':
          (!href || !shouldShowSubmenuItems()) &&
          shouldShowSubmenu() &&
          !settings?.header?.customColors?.enabled,
        'lg:hover:bg-brand-primary':
          href && shouldShowSubmenuItems() && !settings?.header?.customColors?.enabled,
      }
    );
  };

  const linkStyles = {
    color: isHovering
      ? (settings?.header?.customColors?.mainMenu?.hoverColor as string)
      : (settings?.header?.customColors?.mainMenu?.color as string),
    backgroundColor: isHovering
      ? (settings?.header?.customColors?.mainMenu?.hoverBackground as string)
      : (settings?.header?.customColors?.mainMenu?.background as string),
    fontWeight: settings?.header?.mainMenu?.font?.weight as string,
    fontSize: settings?.header?.mainMenu?.font?.size as string,
  };

  const mobileLinkStyles = {
    color: isTouching
      ? (settings?.header?.customColors?.mainMenu?.hoverColor as string)
      : (settings?.header?.customColors?.mainMenu?.color as string),
    fontWeight: settings?.header?.mainMenu?.font?.weight as string,
    fontSize: settings?.header?.mainMenu?.font?.size as string,
  };

  let link;
  if (href && (subMenuItems || megaMenuItems)) {
    link = (
      <div
        ref={ref}
        onClick={handleMouseClick}
        onMouseOver={handleMouseLinkHover}
        style={settings?.header?.customColors?.enabled ? linkStyles : {}}
      >
        {showIcon && icon} {showText && label}
      </div>
    );
  } else if (href) {
    link = (
      <div
        ref={ref}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseClick}
        className={getLinkClasses()}
        style={settings?.header?.customColors?.enabled ? linkStyles : {}}
      >
        {/* Menu item links */}
        <RawLink href={href}>
          {showIcon && icon} {showText && <ReactHTMLParser html={label || ''} />}
        </RawLink>
      </div>
    );
  } else if (onClick) {
    link = (
      <div onClick={onClick}>
        {showIcon && icon} {showText && label}
      </div>
    );
  }

  const renderSubMenuItems = () => {
    if (!subMenuItems || !isHovering) return null;
    return (
      <Menu isSubmenu>
        {subMenuItems.map((item, index) => {
          const props = {
            showIcon: true,
            showText: true,
            ...item,
          };
          if ((item as MenuItemType).label !== undefined) {
            return (
              <MenuItem
                {...props}
                key={index}
                isLast={index === subMenuItems.length - 1}
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

  if (shouldShowSubmenuItems()) {
    return (
      <li
        className={classes}
        onClick={() => setIsOpen(!isOpen)}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        style={!isMobile && settings?.header?.customColors?.enabled ? linkStyles : {}}
      >
        <div
          className={getLinkClasses()}
          onTouchStart={handleOnTouchStart}
          onTouchEnd={handleOnTouchEnd}
          style={
            !isMobile && settings?.header?.customColors?.enabled
              ? linkStyles
              : isMobile && settings?.header?.customColors?.enabled
              ? mobileLinkStyles
              : {}
          }
        >
          {link}
          <ChevronDown
            className={`main-menu-link-fill inline-block ml-auto lg:ml-2 ${
              isOpen ? 'rotate-180 lg:rotate-0' : ''
            }`}
          />
          {renderSubMenuItems()}
          {renderMegaMenuItems()}
        </div>
      </li>
    );
  }

  return <li className={classes}>{link}</li>;
};

MenuItem.defaultProps = {
  href: undefined,
  icon: undefined,
  displayType: 'both',
  isSubmenu: false,
  onClick: () => {},
};
