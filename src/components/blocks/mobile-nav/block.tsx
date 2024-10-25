/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import cx from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

import { NavbarItem, NavbarItems, NavbarLink } from '@src/components/navbar';
import { MenuItem } from '@src/components/header/menu/menu-item';
import { CartBasketIcon } from '@src/features/mini-cart/cart-icon';
import { NavbarWithOverlay } from '@src/components/navbar/navbar-with-overlay';
import { WishListIcon } from '@src/features/wish-list/wish-list-icon';
import { Divider } from '@src/components/common/divider';
import { PrefetchLink } from '@src/components/common/prefetch-link';
import { TopHeader } from '@src/components/header/top-header';
import { LoginMenuPopup } from '@src/components/header/account/login-menu-popup';
import { Search } from '@src/components/header/search';
import { EmailIcon } from '@src/components/svg/email';
import { HamburgerIcon } from '@src/components/svg/hamburger';
import { PhoneIcon } from '@src/components/svg/phone';
import { useSiteContext } from '@src/context/site-context';
import { getDisplayTypeValues, getMenuById } from '@src/lib/helpers/menu';
import { Header } from '@src/models/settings/header';
import { Search as SearchProps } from '@src/models/settings/search';
import { cn, makeLinkRelative } from '@src/lib/helpers/helper';
import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { BlockAttributes } from '@src/lib/block/types';

type Props = {
  block: ParsedBlock;
};

export const MobileNav: React.FC<Props> = ({ block }) => {
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
    const { menuId } = options.courtesyNav;

    let items: { href?: string; text?: string }[] = [];
    const mainMenu = getMenuById(parseInt(menuId as string, 10));

    if (mainMenu) {
      items = Object.values(mainMenu.items).map((menu) => ({ href: menu.url, text: menu.title }));
    }

    return (
      <NavbarLink href="#">
        <NavbarItems className="z-[30] flex flex-col">
          {items.map(
            (item) =>
              item.href && (
                <li key={item.href}>
                  <PrefetchLink
                    unstyled
                    className="p-4 px-2 lg:px-4 cursor-pointer w-full link flex items-center text-sm font-bold leading-tight"
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
      </NavbarItems>
      <Divider />
      <NavbarItems
        className="uppercase"
        isVertical
      >
        {renderCourtesyNavMenu()}
      </NavbarItems>
    </>
  );

  const attribute = block.attrs as BlockAttributes;

  return (
    <div className="lg:hidden sticky top-0 z-20 mobile-menu">
      <TopHeader />
      <NavbarWithOverlay
        className="header header-mobile text-brand-font bg-brand-secondary px-4 py-2 h-16 shadow"
        content={NavbarOverlayContent}
      >
        {({ setIsShowing }) => (
          <>
            <div className={cn(`_${attribute.uniqueId} _${block.id}`, attribute.className)}>
              <Content content={block.innerBlocks} />
            </div>
          </>
        )}
      </NavbarWithOverlay>
      {showSearch && (
        <div className="search absolute w-full top-0 bg-white z-10">
          <div className="p-4 pb-0 border-b">
            <FiX
              className="text-brand-font ml-auto h-6 w-6 mb-4"
              onClick={() => setShowSearch(false)}
            />
          </div>
          <div className="p-4 bg-white shadow">
            <Search {...searchAttributes} />
          </div>
        </div>
      )}
    </div>
  );
};
