import cx from 'classnames';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import { Navbar, NavbarItem, NavbarItems, NavbarLink } from '@src/components/navbar';
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

export const DesktopLayout2 = () => {
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
    if (isEmpty(options.phoneNumber) || !options?.phoneNumber?.enabled) return null;

    const { value, displayType, valueDisplayText, label } = options.phoneNumber;
    const { showText, showIcon } = getDisplayTypeValues(displayType);
    const linkText = valueDisplayText || label;
    return (
      <NavbarLink href={`tel:${value}`}>
        <div className="flex items-center gap-2 h-full">
          {showIcon && <PhoneIcon fillColor={settings?.header?.customColors?.link?.color || ''} />}
          <span className="hidden lg:inline-block">{showText && linkText}</span>
          {showText && valueDisplayText && label && (
            <span className="hidden lg:inline-block font-bold">{label}</span>
          )}
        </div>
      </NavbarLink>
    );
  };

  const renderEmailMenuItem = () => {
    if (isEmpty(options.email) || !options?.email?.enabled) return null;
    const { value, displayType, label } = options.email;
    const { showText, showIcon } = getDisplayTypeValues(displayType);
    return (
      <NavbarLink href={`mailto:${value}`}>
        <div className="flex items-center gap-2 h-full">
          {showIcon && <EmailIcon fillColor={settings?.header?.customColors?.link?.color || ''} />}
          <span className="hidden lg:inline-block">{showText && label}</span>
        </div>
      </NavbarLink>
    );
  };

  const renderMyAccount = () => {
    if (isEmpty(options.myAccount)) return null;
    const { displayType, label, hasChevronDownIcon } = options.myAccount;
    return (
      <NavbarLink href="">
        <div className="inline-flex items-center gap-2 h-full 2">
          <LoginMenuPopup
            displayType={displayType}
            label={label}
            hasChevronDownIcon={hasChevronDownIcon}
          />
        </div>
      </NavbarLink>
    );
  };

  const renderWishlistMenuItem = () => {
    if (isEmpty(options.wishlist) || !options?.wishlist?.enabled || !store?.wishlist?.enabled)
      return null;
    const { displayType, label } = options.wishlist;
    const { showText, showIcon } = getDisplayTypeValues(displayType);
    return (
      <NavbarLink href="#">
        <WishListIcon
          action="open"
          showIcon={showIcon}
          showText={showText}
          label={label}
          fillColor={settings?.header?.customColors?.link?.color || ''}
          buttonStrokeColor={settings?.header?.customColors?.link?.color || ''}
        />
      </NavbarLink>
    );
  };

  const renderCartMenuItem = () => {
    if (isEmpty(options.cart)) return null;
    const { displayType, label } = options.cart;
    const { showText, showIcon } = getDisplayTypeValues(displayType);
    return (
      <NavbarLink href="#">
        <div className="flex items-center gap-2 h-full">
          <CartBasketIcon
            showText={showText}
            showIcon={showIcon}
            label={label}
          />
        </div>
      </NavbarLink>
    );
  };

  const classes = cx('hidden lg:block', {
    sticky: options?.isSticky,
    'top-0': options?.isSticky,
    'z-10': options?.isSticky,
  });

  const hasCustomLogo = header?.logo.desktop?.src;

  const shouldUseCustomColors = customColors.enabled;
  const primaryBackground = customColors?.background?.primary;
  const linkColor = customColors?.link?.color;
  const navbarClasses = cx('h-24 flex lg:px-10 xl:px-0', {
    'bg-brand-primary': !shouldUseCustomColors || !primaryBackground,
    'text-white': !shouldUseCustomColors || !linkColor,
    'bg-white': !shouldUseCustomColors && !primaryBackground,
    'border-b': header?.layout?.navbarSeparator,
  });
  const navbarStyles = {
    backgroundColor: primaryBackground as string,
  };

  const renderNavIconByOrder = () => {
    const { topNavOrder } = header as Header;

    return (
      <>
        <div style={{ order: topNavOrder?.phoneNumber }}>{renderPhoneMenuItem()}</div>
        <div style={{ order: topNavOrder?.contactUs }}>{renderEmailMenuItem()}</div>
        <div style={{ order: topNavOrder?.myAccount }}>{renderMyAccount()}</div>
        <div style={{ order: topNavOrder?.courtesyNavigation }}>
          <CourtesyNav {...options.courtesyNav} />
        </div>
        <div style={{ order: topNavOrder?.wishlist }}>{renderWishlistMenuItem()}</div>
        <div style={{ order: topNavOrder?.cart }}>{renderCartMenuItem()}</div>
      </>
    );
  };

  return (
    <>
      <div className={classes}>
        <TopHeader />
        <Navbar
          className={navbarClasses}
          style={navbarStyles}
        >
          <NavbarItems>
            <NavbarItem className="w-80">
              <Search {...searchAttributes} />
            </NavbarItem>
          </NavbarItems>
          <NavbarItems className="grow justify-center absolute w-full pointer-events-none">
            <PrefetchLink
              unstyled
              className="flex justify-center pointer-events-auto"
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
                className="w-full h-full"
              />
            </PrefetchLink>
          </NavbarItems>
          <NavbarItems
            position="right"
            style={{ color: settings?.header?.customColors?.link?.color || '' }}
          >
            {renderNavIconByOrder()}
          </NavbarItems>
        </Navbar>
        <div
          className="bg-brand-secondary shadow clip-path-no-top"
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
