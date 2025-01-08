import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { LoggedIn } from '@src/components/header/account/logged-in';
import { Login } from '@src/components/header/account/login';
import { AccountIcon } from '@src/components/svg/account';
import { ChevronDown } from '@src/components/svg/chevron-down';
import { useSiteContext } from '@src/context/site-context';
import { useUserContext } from '@src/context/user-context';
import { REMOVE_CART_ITEM } from '@src/lib/graphql/queries';
import { FormattedCart } from '@src/lib/hooks/cart';
import { setCookie } from '@src/lib/helpers/cookie';
import { DisplayType } from '@src/lib/helpers/menu';
import { useAuth } from '@src/lib/hooks';
import { Html } from '@src/components/blocks/core/html';
import { ParsedBlock } from '@src/components/blocks';
import { Paragraph } from '@src/components/blocks/core/paragraph';
import { isString } from 'lodash';

type Props = {
  displayType?: DisplayType | string | null;
  label?: ParsedBlock | string | null;
  hasChevronDownIcon?: boolean | null;
  color?: string;
  iconBlock?: ParsedBlock | null;
};

export const LoginMenuPopup: React.FC<Props> = ({
  label,
  hasChevronDownIcon,
  color,
  iconBlock,
}) => {
  const { logout, refetchViewer } = useAuth();
  const { push, query } = useRouter();
  const { setCart, loginPopupState } = useSiteContext();
  const [openLoginPopUp, setOpenLoginPopUp] = loginPopupState;
  const [isOpenLogin, setIsOpenLogin] = useState(openLoginPopUp);
  const { isLoggedIn, loginSessionId } = useUserContext();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [removeItemFromCart] = useMutation(REMOVE_CART_ITEM);

  const loginPopOverRef = useRef(null);
  /**
   * We controlled the state of the login popover because we had to open the login via wishlist modal
   * signin button so this will close the login popover if the user clicks outside of the element
   */
  useOnClickOutside(loginPopOverRef, () => {
    setIsOpenLogin(false);
  });

  // We can't use the global state for opening and closing the login popup so we had to modify the local state on global state to true
  useEffect(() => {
    if (true === openLoginPopUp) {
      setIsOpenLogin(true);
    }
  }, [openLoginPopUp]);

  // When Local state is false then we have to set the global state to false too to avoid issues where the login popup not opening
  useEffect(() => {
    if (false === isOpenLogin) {
      setOpenLoginPopUp(false);
    }
  }, [isOpenLogin, setOpenLoginPopUp]);

  useEffect(() => {
    const handleLogout = async () => {
      setCart({} as FormattedCart);
      await logout(loginSessionId);
      setIsLoggedOut(true);
      push({ pathname: '/', query: { logout: 1 } }, '/');
    };

    if (query.action === 'logout') {
      setCookie('woo-session', '', -30);
      setCookie('woocommerce_customer_session_id', '', -30);
      if (!isLoggedOut) {
        localStorage.removeItem('woo-next-cart');

        handleLogout();
      }
    }
  }, [
    isLoggedIn,
    isLoggedOut,
    loginSessionId,
    logout,
    push,
    query.action,
    removeItemFromCart,
    setCart,
    refetchViewer,
  ]);

  const renderAccountIcon = (): JSX.Element => (
    <>
      {iconBlock && iconBlock.blockName === 'core/html' ? (
        <Html block={iconBlock} />
      ) : (
        <AccountIcon fillColor={color || ''} />
      )}

      {label && (
        <span className="hidden md:inline-block">
          {isString(label) ? label : <Paragraph block={label} />}
        </span>
      )}
      {hasChevronDownIcon && (
        <ChevronDown
          className="hidden md:inline-block ml-2"
          color="none"
          fillColor={color || ''}
        />
      )}
    </>
  );

  const shouldShow = isOpenLogin;
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpenLogin((prev) => !prev)}
        className="menu-item-account group cursor-pointer h-full focus:outline-none space-x-2 my-account-popup-button items-center"
      >
        {renderAccountIcon()}
      </button>
      <div ref={loginPopOverRef}>
        {shouldShow && (
          <div className="login-popup rounded">
            <div className="overflow-hidden rounded-sm shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-5">
                {isLoggedIn ? (
                  <LoggedIn label={'My Account'} />
                ) : (
                  <Login onClose={() => setIsOpenLogin(false)} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
