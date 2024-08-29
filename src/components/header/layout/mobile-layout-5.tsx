import cx from 'classnames';
import Image from 'next/image';

import { Navbar, NavbarItem, NavbarItems } from '@src/components/navbar';
import { CartBasketIcon } from '@src/features/mini-cart/cart-icon';
import { NavbarWithOverlay } from '@src/components/navbar/navbar-with-overlay';
import { WishListIcon } from '@src/features/wish-list/wish-list-icon';
import { PrefetchLink } from '@src/components/common/prefetch-link';
import { LoginMenuPopup } from '@src/components/header/account/login-menu-popup';
import { MenuItem } from '@src/components/header/menu/menu-item';
import { Search } from '@src/components/header/search';
import { EmailIcon } from '@src/components/svg/email';
import { HamburgerIcon } from '@src/components/svg/hamburger';
import { PhoneIcon } from '@src/components/svg/phone';
import { useSiteContext } from '@src/context/site-context';
import { getDisplayTypeValues, getMenuById } from '@src/lib/helpers/menu';
import { Header } from '@src/models/settings/header';
import { Search as SearchProps } from '@src/models/settings/search';

export const MobileLayout5 = () => {
  const { settings } = useSiteContext();

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
      <li className={'flex items-center after:content-["|"] last-of-type:after:content-[""]'}>
        <PrefetchLink
          unstyled
          href={`tel:${value}`}
        >
          <div className="flex items-center gap-2 h-full">
            {showIcon && (
              <PhoneIcon fillColor={settings?.header?.customColors?.link?.color || ''} />
            )}
            <span>{showText && linkText}</span>
            {showText && valueDisplayText && label && (
              <span className="hidden lg:inline-block font-bold">{label}</span>
            )}
          </div>
        </PrefetchLink>
      </li>
    );
  };

  // const renderEmailMenuItem = () => {
  //   if (!options.email) return null;
  //   const { value, displayType, label } = options.email;
  //   const { showText, showIcon } = getDisplayTypeValues(displayType);
  //   return (
  //     <li className={'flex items-center after:content-["|"] last-of-type:after:content-[""]'}>
  //       <PrefetchLink
  //         unstyled
  //         href={`mailto:${value}`}
  //       >
  //         <div className="flex items-center gap-2 h-full">
  //           {showIcon && <EmailIcon />}
  //           <span>{showText && label}</span>
  //         </div>
  //       </PrefetchLink>
  //     </li>
  //   );
  // };

  const renderCourtesyNavMenu = () => {
    if (!options.courtesyNav || !options.courtesyNav.enabled) return null;
    const { menuId } = options.courtesyNav;

    let items: { href?: string; text?: string }[] = [];
    const mainMenu = getMenuById(parseInt(menuId as string, 10));

    if (mainMenu) {
      items = mainMenu.items.map((menu) => ({ href: menu.url, text: menu.title }));
    }

    return (
      <>
        {items.map(
          (item) =>
            item.href && (
              <MenuItem
                {...item}
                href={item.href}
                label={item.text}
                key={item.href}
                borderless
                className="font-bold uppercase text-sm"
                // className="p-4 lg:px-4 cursor-pointer w-full link flex items-center text-black"
              />
            )
        )}
      </>
    );
  };

  const renderMyAccount = () => {
    if (!options.email) return null;
    const { displayType, label } = options.myAccount;
    return (
      <NavbarItem>
        <div>
          <div className="inline-flex items-center gap-2 h-full 3">
            <LoginMenuPopup
              displayType={displayType}
              label={label}
            />
          </div>
        </div>
      </NavbarItem>
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
      <NavbarItem>
        <div className="flex items-center gap-2 h-full">
          <CartBasketIcon
            showText={showText}
            showIcon={showIcon}
            label={label}
          />
        </div>
      </NavbarItem>
    );
  };

  const NavbarOverlayContent = (
    <>
      <NavbarItems isVertical>
        {settings.navigationMenuItems.map((item, index) => {
          const props = {
            showIcon: true,
            showText: true,
            ...item,
          };
          return (
            <MenuItem
              {...props}
              key={index}
              isLast={index === settings.navigationMenuItems.length - 1}
              borderless
              className="font-bold uppercase text-sm"
            />
          );
        })}
        {renderCourtesyNavMenu()}
      </NavbarItems>
    </>
  );

  const classes = cx('lg:hidden sticky top-0 z-20');

  const hasMobileCustomLogo = header?.logo.mobile?.src;
  const hasDesktopCustomLogo = header?.logo.desktop?.src;

  return (
    <div className={classes}>
      <NavbarWithOverlay
        className="text-white bg-brand-primary px-4 py-2"
        content={NavbarOverlayContent}
      >
        {({ setIsShowing }) => (
          <>
            <NavbarItems className="space-x-2">
              <NavbarItem
                onClick={() => setIsShowing(true)}
                className="space-x-2"
              >
                <HamburgerIcon />
              </NavbarItem>
              {renderPhoneMenuItem()}
            </NavbarItems>
            <NavbarItems position="center">
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
            <NavbarItems
              position="right"
              className="space-x-0.5"
            >
              {renderMyAccount()}
              {renderCartMenuItem()}
            </NavbarItems>
          </>
        )}
      </NavbarWithOverlay>
      <Navbar className="bg-brand-primary px-4 py-2 bg-gray-200 border-brand-secondary">
        {renderWishlistMenuItem()}
        <Search {...searchAttributes} />
      </Navbar>
    </div>
  );
};
