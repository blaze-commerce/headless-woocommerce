/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import cx from 'classnames';
import Image from 'next/image';

import { Navbar, NavbarItems, NavbarLink } from '@src/components/navbar';
import { NavbarItem as NavbarItemNew } from '@src/components/navbar/new/navbar-item';
import { NavbarLink as NavbarLinkNew } from '@src/components/navbar/new/navbar-link';
import { MiniCart } from '@src/features/mini-cart';
import { CartBasketIcon } from '@src/features/mini-cart/cart-icon';
import { WishList } from '@src/features/wish-list';
import { WishListIcon } from '@src/features/wish-list/wish-list-icon';
import { PrefetchLink } from '@src/components/common/prefetch-link';
import { NavigationMenu } from '@src/components/header/navigation-menu';
import { TopHeader } from '@src/components/header/top-header';
import { LoginMenuPopup } from '@src/components/header/account/login-menu-popup';
import { CourtesyNav } from '@src/components/header/menu/courtesy-nav';
import { Search } from '@src/components/header/search';
import { EmailIcon } from '@src/components/svg/email';
import { PhoneIcon } from '@src/components/svg/phone';
import { useSiteContext } from '@src/context/site-context';
import { getDisplayTypeValues } from '@src/lib/helpers/menu';
import { Header } from '@src/models/settings/header';
import { Search as SearchProps } from '@src/models/settings/search';

export const DesktopLayout1 = () => {
  const { settings } = useSiteContext();

  if (!settings) return null;
  const { header, search, store } = settings;
  const { options, customColors } = header as Header;
  const { input, results } = search as SearchProps;
  const searchAttributes = {
    input,
    results,
  };

  const renderPhoneMenuItem = () => {
    const { value, displayType, valueDisplayText, label, enabled } = options.phoneNumber;
    if (!enabled) return null;
    const { showText, showIcon } = getDisplayTypeValues(displayType);
    const linkText = valueDisplayText || value || label;
    return (
      <NavbarItemNew>
        <NavbarLinkNew
          href={`tel:${value}`}
          className="has-divider-right flex items-center gap-2 h-full"
        >
          {showIcon && <PhoneIcon fillColor={settings?.header?.customColors?.link?.color || ''} />}
          <span className="hidden lg:inline-block">{linkText}</span>
          {showText && valueDisplayText && label && (
            <span className="hidden lg:inline-block font-bold">{label}</span>
          )}
        </NavbarLinkNew>
      </NavbarItemNew>
    );
  };

  const renderEmailMenuItem = () => {
    if (!options.email) return null;
    const { value, displayType, label, enabled } = options.email;
    if (!enabled) return null;
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

  const renderMyAccount = () => {
    if (!options.email) return null;
    const { displayType, label } = options.myAccount;
    return (
      <NavbarItemNew>
        <NavbarLinkNew className="has-divider-right flex items-center gap-2 h-full">
          <LoginMenuPopup
            displayType={displayType}
            label={label}
          />
        </NavbarLinkNew>
      </NavbarItemNew>
    );
  };

  const renderWishlistMenuItem = () => {
    if (!options.wishlist) return null;
    const { displayType, label, enabled } = options.wishlist;
    if (!enabled || !store?.wishlist?.enabled) return null;
    const { showText, showIcon } = getDisplayTypeValues(displayType);
    return (
      <NavbarLink href="#">
        <WishListIcon
          action="open"
          showIcon={showIcon}
          showText={showText}
          label={label}
          buttonStrokeColor={settings?.header?.customColors?.link?.color || ''}
        />
      </NavbarLink>
    );
  };

  const renderCartMenuItem = () => {
    if (!options.cart) return null;
    const { displayType, label } = options.cart;
    const { showText, showIcon } = getDisplayTypeValues(displayType);
    return (
      <NavbarItemNew>
        <NavbarLinkNew className="flex items-center gap-2 h-full">
          <CartBasketIcon
            showText={showText}
            showIcon={showIcon}
            label={label}
          />
        </NavbarLinkNew>
      </NavbarItemNew>
    );
  };

  const navbarContainerClasses = cx('hidden lg:block', {
    sticky: options?.isSticky,
    'top-0': options?.isSticky,
    'z-10': options?.isSticky,
  });

  const shouldUseCustomColors = customColors.enabled;
  const primaryBackground = customColors?.background?.primary;
  const linkColor = customColors?.link?.color;
  const navbarClasses = cx('text-white h-24 flex lg:px-10 xl:px-0', {
    'bg-brand-primary': !shouldUseCustomColors || !primaryBackground,
    'text-white': !shouldUseCustomColors || !linkColor,
    'border-b': header?.layout?.navbarSeparator,
  });

  const hasCustomLogo = header?.logo.desktop?.src;

  return (
    <>
      <div className={navbarContainerClasses}>
        <TopHeader />
        <Navbar
          className={navbarClasses}
          style={{
            backgroundColor: primaryBackground as string,
            color: linkColor as string,
          }}
        >
          <NavbarItems>
            <PrefetchLink
              unstyled
              href="/"
            >
              <Image
                src={
                  hasCustomLogo
                    ? `/logo.${header?.logo.desktop?.src?.split('.')?.[1]}`
                    : (header?.logo?.desktop?.wpSrc as string) || ''
                }
                alt="site logo"
                width={160}
                height={40}
                className="h-full"
              />
            </PrefetchLink>
          </NavbarItems>
          <NavbarItems className="flex-1">
            <Search {...searchAttributes} />
          </NavbarItems>
          <NavbarItems className="!space-x-0">
            {renderPhoneMenuItem()}
            {/* {renderEmailMenuItem()} */}
            {renderMyAccount()}
            <CourtesyNav {...options.courtesyNav} />
            {renderWishlistMenuItem()}
            {renderCartMenuItem()}
          </NavbarItems>
        </Navbar>
        <div
          className="bg-brand-secondary shadow"
          style={{ backgroundColor: settings?.header?.mainMenu?.backgroundColor || '' }}
        >
          <div className="container mx-auto max-w-[1200px] hidden lg:block">
            <NavigationMenu menuItems={settings.navigationMenuItems} />
          </div>
        </div>
      </div>
      <MiniCart />
      <WishList />
    </>
  );
};
