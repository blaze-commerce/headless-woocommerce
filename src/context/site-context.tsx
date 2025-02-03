import { useMutation, useQuery } from '@apollo/client';
import { Dictionary } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { find, isEmpty, keyBy } from 'lodash';
import { useRouter } from 'next/router';
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useLocalStorage, useUpdateEffect } from 'usehooks-ts';

import regionSettings from '@public/region.json';
import siteSettings from '@public/site.json';

import { GET_CART, UPDATE_CUSTOMER, UPDATE_SHIPPING_METHOD } from '@src/lib/graphql/queries';
import { useCalculateShipping } from '@src/lib/hooks';
import { FormattedCart, getFormattedCart } from '@src/lib/hooks/cart';
import { track } from '@src/lib/track';
import { getCookie, setCookie } from '@src/lib/helpers/cookie';
import { Settings } from '@src/models/settings';
import { RegionalData, ShippingMethodRates } from '@src/types';
import type { CalculateShippingHook } from '@src/lib/hooks';
import {
  getCurrencyByCountry,
  getDefaultCountry,
  getDefaultCurrency,
} from '@src/lib/helpers/country';

type SiteContextType = Partial<{
  settings: Settings;
  history: {
    back: () => void;
    list: string[];
    getPrevUrl: () => string | undefined;
    setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  };
}> & {
  currencies: Dictionary<RegionalData>;
  currentCurrency: string;
  currentCountry: string;
  cartUpdating: boolean;
  cart: FormattedCart;
  setCart: Dispatch<SetStateAction<FormattedCart>>;
  setCartUpdating: Dispatch<SetStateAction<boolean>>;
  wooSession: string | null;
  miniCartState: [boolean, Dispatch<SetStateAction<boolean>>];
  wishListState: [boolean, Dispatch<SetStateAction<boolean>>];
  loginPopupState: [boolean, Dispatch<SetStateAction<boolean>>];
  fetchingCart: boolean;
  fetchCart: () => void;
  calculateShipping?: CalculateShippingHook;
  selectedShippingMethod: string;
  onSelectShippingMethod: (_shippingMethod: string) => void;
  handleCountryChange: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
  availableCountries: string[];
  useSelectedCountry: [string, Dispatch<SetStateAction<string>>];
  useSelectedState: [string, Dispatch<SetStateAction<string>>];
  availableShippingMethods: ShippingMethodRates[];
  ageVerified: boolean;
  setAgeVerified: Dispatch<SetStateAction<boolean>>;
  availableFreeShippingMethod?: ShippingMethodRates;
  showSearch: boolean;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
};

export const SiteContext = createContext<SiteContextType>({
  currencies: {},
  currentCurrency: '',
  currentCountry: '',
  setCart: () => {},
  cart: { products: [] },
  cartUpdating: false,
  setCartUpdating: () => {},
  wooSession: '',
  miniCartState: [false, () => {}],
  wishListState: [false, () => {}],
  loginPopupState: [false, () => {}],
  fetchingCart: false,
  fetchCart: () => {},
  selectedShippingMethod: '',
  onSelectShippingMethod: () => {},
  handleCountryChange: () => {},
  availableCountries: [],
  useSelectedCountry: ['', () => {}],
  useSelectedState: ['', () => {}],
  availableShippingMethods: [],
  ageVerified: false,
  setAgeVerified: () => {},
  showSearch: false,
  setShowSearch: () => {},
  showMenu: false,
  setShowMenu: () => {},
});

export const SiteContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const { asPath, push, pathname } = useRouter();
  const [history, setHistory] = useState<string[]>([]);
  const defaultCurrency = getDefaultCurrency();
  const [currentCurrency, setCurrentCurrency] = useState(defaultCurrency);
  const [currentCountry, setCurrentCountry] = useState('');

  const [openLoginPopUp, setOpenLoginPopUp] = useState(false);

  const [settings] = useState<Settings>(Settings.build(siteSettings));

  const [wishlistOpen, setWishListOpen] = useState(false);

  // Cart related states
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  // const [cartKey, setCartKey] = useLocalStorage('woo-cart-key', '');
  const [cart, setCart] = useLocalStorage<FormattedCart>('woo-next-cart', { products: [] });

  const [wooSession, setWooSession] = useState<string | null>('');

  const [cartUpdating, setCartUpdating] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [availableShippingMethods, setAvailableShippingMethods] = useState<ShippingMethodRates[]>(
    []
  );
  const [availableFreeShippingMethod, setAvailableFreeShippingMethod] =
    useState<ShippingMethodRates>();
  const [selectedShippingMethod, setSelectedShippingMethod] = useLocalStorage(
    'wooless-current-shipping-method',
    ''
  );

  const [availableCountries, setAvailableCountries] = useLocalStorage<string[]>(
    'wooless-countries',
    []
  );
  const [selectedCountry, setSelectedCountry] = useLocalStorage('wooless-selected-country', '');
  const [selectedState, setSelectedState] = useLocalStorage('wooless-selected-state', '');
  const [ageVerified, setAgeVerified] = useLocalStorage<boolean>('age-verified', false);

  useEffect(() => {
    setShowMenu(false);
  }, [asPath]);

  useMutation(UPDATE_CUSTOMER, {
    variables: {
      input: {
        billing: {
          country: selectedCountry,
          state: selectedState,
        },
        shippingSameAsBilling: true,
      },
    },
  });

  const [updateShippingMethod] = useMutation(UPDATE_SHIPPING_METHOD);

  const { loading, refetch } = useQuery(
    GET_CART(settings?.store?.isCompositeEnabled || false, currentCurrency),
    {
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        try {
          const formattedCartData = getFormattedCart(data);
          setCart(formattedCartData);
          setAvailableCountries(data.allowedCountries);
          setSelectedShippingMethod(data.cart.chosenShippingMethods[0] || '');
          setAvailableShippingMethods(data.cart.availableShippingMethods[0]?.rates);
          setAvailableFreeShippingMethod(data.cart.freeShippingMethods);

          setCookie(
            'woocommerce_total_product_in_cart',
            `${formattedCartData.totalProductsCount || 0}`,
            30
          );

          const sessionToken = getCookie('woo-session');

          if (!isEmpty(sessionToken) && sessionToken !== null) {
            // jtw-decode is an open-source package
            const decoded = jwtDecode<{ data: { customer_id: string } }>(sessionToken);
            setWooSession(decoded.data.customer_id);
            setCookie('woocommerce_customer_session_id', `${decoded.data.customer_id}`, 30);
          }

          const freeShipping = find(availableShippingMethods, { methodId: 'free_shipping' });
          if (freeShipping) {
            const freeShippingId = freeShipping?.id;
            updateShippingMethod({
              variables: {
                input: {
                  shippingMethods: [freeShippingId],
                },
              },
            });
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          // eslint-disable-next-line no-console
          console.error('useEffect: ' + error.message);
          setWooSession(null);
          setCookie('woocommerce_customer_session_id', '', -30);
        }
      },
    }
  );

  useEffect(() => setCartUpdating(loading), [loading]);

  useUpdateEffect(() => {
    if (true === miniCartOpen && false === loading) {
      track.viewCart(cart);
    }
  }, [miniCartOpen]);

  const back = () => {
    for (let i = history.length - 2; i >= 0; i--) {
      const route = history[i];
      if (!route.includes('#') && route !== pathname) {
        push(route);
        // if you want to pop history on back
        const newHistory = history.slice(0, i);
        setHistory(newHistory);
        break;
      }
    }
  };

  const getPrevUrl = () => {
    return history.at(-2);
  };

  useEffect(() => {
    setHistory((previous) => [...previous, asPath]);
    const selectedCountry = getCookie('currentCountry') || getDefaultCountry();
    const currency = getCurrencyByCountry(selectedCountry);
    setCurrentCountry(selectedCountry);
    setCurrentCurrency(currency);

    setCookie('aelia_cs_selected_currency', currency, 30);
    setShowSearch(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);

  const handleCountryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setCurrentCountry(selectedCountry);
    setCookie('currentCountry', selectedCountry, 30);
    const currency = getCurrencyByCountry(selectedCountry);
    setCookie('aelia_cs_selected_currency', currency, 30);
    setCurrentCurrency(currency);
    await updateCustomer({
      variables: {
        input: {
          billing: {
            country: e.target.value,
          },
          shippingSameAsBilling: true,
        },
      },
    });
    localStorage.removeItem('woo-next-cart');
    window.location.reload();
  };

  const onSelectShippingMethod = async (shippingMethod: string) => {
    setSelectedShippingMethod(shippingMethod);
    await refetch();
  };

  const currencies = keyBy(regionSettings, 'currency');

  return (
    <SiteContext.Provider
      value={{
        history: {
          back,
          list: history,
          getPrevUrl,
          setHistory,
        },
        setCart,
        cartUpdating,
        setCartUpdating,
        settings,
        currencies,
        currentCurrency,
        currentCountry,
        wooSession,
        miniCartState: [miniCartOpen, setMiniCartOpen],
        wishListState: [wishlistOpen, setWishListOpen],
        loginPopupState: [openLoginPopUp, setOpenLoginPopUp],
        cart,
        fetchingCart: loading,
        fetchCart: refetch,
        calculateShipping: useCalculateShipping(),
        selectedShippingMethod,
        onSelectShippingMethod,
        handleCountryChange,
        availableCountries,
        useSelectedCountry: [selectedCountry, setSelectedCountry],
        useSelectedState: [selectedState, setSelectedState],
        availableShippingMethods,
        ageVerified,
        setAgeVerified,
        availableFreeShippingMethod,
        showSearch,
        setShowSearch,
        showMenu,
        setShowMenu,
      }}
    >
      <style
        jsx
        global
      >{`
        :root {
          --colors-brandPrimary: ${settings?.colors?.background?.primary};
          --colors-brandSecondary: ${settings?.colors?.background?.secondary};
          --colors-brandTertiary: ${settings.colors?.background?.tertiary};
          --colors-brandIcons: ${settings?.colors?.background?.icons};
          --colors-brandFont: ${settings.fonts?.siteFont?.fontColor};
          --colors-brandLinks: ${settings.fonts?.link?.fontColor};
          --colors-subTitle: #333;
          --colors-brandHoverLinks: ${settings.fonts?.link?.hoverFontColor};
          --colors-brandButtonBackground: ${settings.buttonColor?.background};
          --colors-brandButtonText: ${settings.buttonColor?.text};
          --colors-brandHoverButtonBackground: ${settings.buttonHoverColor?.background};
          --colors-brandHoverButtonText: ${settings.buttonHoverColor?.text};
          --colors-brandHoverButtonText: ${settings.buttonHoverColor?.text};
          --colors-brandWishlistBackground: ${settings.wishlistColor?.background};
          --colors-brandWishlistIconFill: ${settings.wishlistColor?.iconFill};
          --colors-brandWishlistIconStroke: ${settings.wishlistColor?.iconStroke};
          --colors-brandWishlistHoverBackground: ${settings.wishlistColor?.hoverBackground};
          --colors-brandWishlistHoverIconFill: ${settings.wishlistColor?.hoverIconFill};
          --colors-brandWishlistHoverIconStroke: ${settings.wishlistColor?.hoverIconStroke};

          --main-menu-background: ${settings?.header?.mainMenu?.backgroundColor};
          --main-menu-sub-menu-background: ${settings?.header?.mainMenu?.subMenuBackgroundColor};
          --main-menu-link-color: ${settings?.header?.customColors?.mainMenu?.color ?? '#000000'};
          --main-menu-link-hover-color: ${settings?.header?.customColors?.mainMenu?.hoverColor ??
          '#000000'};

          --header-link-color: ${settings?.header?.customColors?.link?.color};
          --header-link-hover-color: ${settings?.header?.customColors?.link?.hoverColor};

          --price-font-weight: ${settings?.product?.font?.price?.weight};
          --price-regurlar-color: ${settings?.product?.font?.regularPrice?.color};
          --price-sale-color: ${settings?.product?.font?.salePrice?.color ?? 'rgb(75 85 99)'};
        }
      `}</style>
      {props.children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => useContext(SiteContext);
