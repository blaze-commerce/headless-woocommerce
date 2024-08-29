import cx from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

import { NavbarItem, NavbarItems, NavbarLink } from '@src/components/navbar';
import { CartBasketIcon } from '@src/features/mini-cart/cart-icon';
import { NavbarWithOverlay } from '@src/components/navbar/navbar-with-overlay';
import { WishListIcon } from '@src/features/wish-list/wish-list-icon';
import { Divider } from '@src/components/common/divider';
import { PrefetchLink } from '@src/components/common/prefetch-link';
import { LoginMenuPopup } from '@src/components/header/account/login-menu-popup';
import { Search } from '@src/components/header/search';
import { EmailIcon } from '@src/components/svg/email';
import { HamburgerIcon } from '@src/components/svg/hamburger';
import { PhoneIcon } from '@src/components/svg/phone';
import { useSiteContext } from '@src/context/site-context';
import { getDisplayTypeValues, getMenuById } from '@src/lib/helpers/menu';
import { Header } from '@src/models/settings/header';
import { Search as SearchProps } from '@src/models/settings/search';
import { makeLinkRelative } from '@src/lib/helpers/helper';

export const MobileLayout2 = () => {
  const { settings } = useSiteContext();
  const [showSearch, setShowSearch] = useState(false);

  if (!settings) return null;
  const { header, search, store } = settings;
  const { options } = header as Header;
  const { input, results } = search as SearchProps;
  const searchAttributes = {
    input,
    results,
  };

  const renderPhoneMenuItem = () => {
    const { value, displayType, valueDisplayText, label } = options.phoneNumber;
    const { showText, showIcon } = getDisplayTypeValues(displayType);
    const linkText = valueDisplayText || label;
    return (
      <NavbarLink href={`tel:${value}`}>
        <div className="flex items-center gap-2 h-full">
          {showIcon && <PhoneIcon />}
          <span className="hidden lg:inline-block">{showText && linkText}</span>
          {showText && valueDisplayText && label && (
            <span className="hidden lg:inline-block font-bold">{label}</span>
          )}
        </div>
      </NavbarLink>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const renderEmailMenuItem = () => {
    if (!options.email) return null;
    const { value, displayType, label } = options.email;
    const { showText, showIcon } = getDisplayTypeValues(displayType);
    return (
      <NavbarLink href={`mailto:${value}`}>
        <div className="flex items-center gap-2 h-full">
          {showIcon && <EmailIcon />}
          <span className="hidden lg:inline-block">{showText && label}</span>
        </div>
      </NavbarLink>
    );
  };

  const renderCourtesyNavMenu = () => {
    if (!options.courtesyNav || !options.courtesyNav.enabled) return null;
    const { label, menuId } = options.courtesyNav;

    let items: { href?: string; text?: string }[] = [];
    const mainMenu = getMenuById(parseInt(menuId as string, 10));

    if (mainMenu) {
      items = mainMenu.items.map((menu) => ({ href: menu.url, text: menu.title }));
    }

    return (
      <NavbarLink href="#">
        <div className="inline-flex items-center gap-2 h-full">
          <span>{label}</span>
        </div>
        <NavbarItems
          isSubmenu
          className="z-[30]"
        >
          {items.map(
            (item) =>
              item.href && (
                <li key={item.href}>
                  <PrefetchLink
                    unstyled
                    className="p-4 px-2 lg:px-4 cursor-pointer w-full link flex items-center text-black"
                    href={makeLinkRelative(item.href)}
                  >
                    {item.text}
                  </PrefetchLink>
                </li>
              )
          )}
        </NavbarItems>
      </NavbarLink>
    );
  };

  const renderMyAccount = () => {
    if (!options.email) return null;
    const { displayType, label } = options.myAccount;
    return (
      <li className={'flex items-center after:content-["|"] last-of-type:after:content-[""]'}>
        <PrefetchLink
          unstyled
          href=""
        >
          <div className="inline-flex items-center gap-2 h-full 4">
            <LoginMenuPopup
              displayType={displayType}
              label={label}
            />
          </div>
        </PrefetchLink>
      </li>
    );
  };

  const renderWishlistMenuItem = () => {
    if (!options.wishlist || !store?.wishlist?.enabled) return null;
    const { displayType, label } = options.wishlist;
    const { showText, showIcon } = getDisplayTypeValues(displayType);
    return (
      <WishListIcon
        action="open"
        showIcon={showIcon}
        showText={showText}
        label={label}
        buttonStrokeColor={settings?.header?.customColors?.link?.color || ''}
      />
    );
  };

  const renderCartMenuItem = () => {
    if (!options.cart) return null;
    const { displayType, label } = options.cart;
    const { showText, showIcon } = getDisplayTypeValues(displayType);
    return (
      <NavbarLink href="/cart">
        <div className="flex items-center gap-2 h-full">
          {showIcon && (
            <CartBasketIcon
              showText={showText}
              showIcon={showIcon}
              label={label}
            />
          )}
          <span className="hidden lg:inline-block">{showText && label}</span>
        </div>
      </NavbarLink>
    );
  };

  const NavbarOverlayContent = (
    <>
      <NavbarItems isVertical>
        {settings.navigationMenuItems.map((item, index) => (
          <li key={index}>
            <PrefetchLink
              unstyled
              className="p-4 px-2 lg:px-4 cursor-pointer w-full link flex items-center"
              href={makeLinkRelative(item.href as string)}
            >
              {item.label}
            </PrefetchLink>
          </li>
        ))}
        {renderCourtesyNavMenu()}
      </NavbarItems>
      <Divider />
      <NavbarItems
        className="uppercase"
        isVertical
      >
        {renderMyAccount()}
      </NavbarItems>
    </>
  );

  const classes = cx({
    sticky: options?.isSticky,
    'top-0': options?.isSticky,
    'z-20': options?.isSticky,
  });

  const hasMobileCustomLogo = header?.logo.mobile?.src;
  const hasDesktopCustomLogo = header?.logo.desktop?.src;

  return (
    <div className={`lg:hidden ${classes}`}>
      <NavbarWithOverlay
        className="text-white bg-brand-primary px-4 py-2"
        content={NavbarOverlayContent}
      >
        {({ setIsShowing }) => (
          <>
            <NavbarItems>
              <NavbarItem onClick={() => setIsShowing(true)}>
                <HamburgerIcon />
              </NavbarItem>
            </NavbarItems>
            <NavbarItems>
              <PrefetchLink
                unstyled
                href="/"
                className="flex justify-center"
              >
                <Image
                  src={
                    hasMobileCustomLogo
                      ? `/mobile-logo.${header?.logo.mobile?.src?.split('.')?.[1]}`
                      : hasDesktopCustomLogo
                      ? `/logo.${header?.logo.desktop?.src?.split('.')?.[1]}`
                      : (header?.logo?.mobile?.wpSrc as string) || ''
                  }
                  alt="site logo"
                  width={100}
                  height={40}
                />
              </PrefetchLink>
            </NavbarItems>
            <NavbarItems position="right">
              <NavbarItem>
                <div
                  className="full w-6 flex items-center justify-center"
                  onClick={() => setShowSearch(true)}
                >
                  <FiSearch className="text-white w-6 h-6" />
                </div>
              </NavbarItem>
              {renderPhoneMenuItem()}
              {renderWishlistMenuItem()}
              {renderCartMenuItem()}
            </NavbarItems>
          </>
        )}
      </NavbarWithOverlay>
      {showSearch && (
        <div className="search grow p-4 absolute inset-0 bg-brand-primary z-10">
          <FiX
            className="text-white ml-auto h-6 w-6 mb-4"
            onClick={() => setShowSearch(false)}
          />
          <Search {...searchAttributes} />
        </div>
      )}
    </div>
  );
};
