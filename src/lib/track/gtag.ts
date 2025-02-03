import TagManager from 'react-gtm-module';

import { AddToCartItemResponse } from '@src/lib/actions/add-to-cart/types';
import { FormattedCart, ProductCartItem } from '@src/lib/hooks/cart';
import { Product } from '@src/models/product';
import { getDefaultCurrency } from '@src/lib/helpers/country';

type EventItemProps = {
  item_id: string;
  item_name: string;
  price?: number;
  quantity?: number;
  index?: number;
};

type SearchEventDataLayerProps = {
  event: 'search';
  search_term: string;
};

type LoginEvenDataLayerProps = {
  event: 'login';
  method: string;
};

type EventDataLayerProps =
  | {
      event:
        | 'add_to_cart'
        | 'add_to_wishlist'
        | 'remove_from_cart'
        | 'view_cart'
        | 'view_item'
        | 'view_item_list';
      value: number;
      items: EventItemProps[];
      currency?: string;
      search_term?: string;
    }
  | SearchEventDataLayerProps
  | LoginEvenDataLayerProps;

const triggerTagManagerDataLayer = (dataLayer: EventDataLayerProps) => {
  const currency = getDefaultCurrency();
  TagManager.dataLayer({
    dataLayer: {
      currency,
      ...dataLayer,
    },
  });
};

const addToCart = (cartItem: AddToCartItemResponse) => {
  const value = parseFloat(cartItem.totalRaw);
  triggerTagManagerDataLayer({
    event: 'add_to_cart',
    value,
    items: [
      {
        item_id: cartItem.product.node.sku,
        item_name: cartItem.product.node.name,
        quantity: cartItem.quantity,
      },
    ],
  });
};

const addToWishList = (product: Product) => {
  const currency = getDefaultCurrency();
  const value = product.currencyPrice(currency);
  triggerTagManagerDataLayer({
    event: 'add_to_wishlist',
    value,
    items: [
      {
        item_id: product.sku as string,
        item_name: product.name as string,
        quantity: 1,
      },
    ],
  });
};

const removeFromCart = (cartItem: ProductCartItem) => {
  const quantity = parseInt(cartItem.qty);
  const value = quantity * cartItem.price;

  triggerTagManagerDataLayer({
    event: 'remove_from_cart',
    value,
    items: [
      {
        item_id: cartItem.sku,
        item_name: cartItem.name,
        quantity,
      },
    ],
  });
};

const viewCart = (cart: FormattedCart) => {
  const hasCartItems = cart !== null && cart?.products?.length > 0 ? true : false;
  if (hasCartItems) {
    const cartItems: EventItemProps[] = [];
    let value = 0;
    cart.products.forEach((cartItem, index: number) => {
      const quantity = parseInt(cartItem.qty);
      cartItems.push({
        item_id: cartItem.sku,
        item_name: cartItem.name,
        quantity,
        index,
      });

      value = value + quantity * cartItem.price;
    });

    triggerTagManagerDataLayer({
      event: 'view_cart',
      value,
      items: cartItems,
    });
  }
};

const viewItem = (product: Product) => {
  const currency = getDefaultCurrency();
  const value = product.currencyPrice(currency);

  triggerTagManagerDataLayer({
    event: 'view_item',
    value,
    items: [
      {
        item_id: product.sku as string,
        item_name: product.name as string,
      },
    ],
  });
};

const viewItemList = (product: Product) => {
  const currency = getDefaultCurrency();
  const value = product.currencyPrice(currency);
  triggerTagManagerDataLayer({
    event: 'view_item_list',
    value,
    items: [
      {
        item_id: product.sku as string,
        item_name: product.name as string,
      },
    ],
  });
};

const login = () => {
  triggerTagManagerDataLayer({
    event: 'login',
    method: 'next_app',
  });
};

const search = (searchTerm: string) => {
  triggerTagManagerDataLayer({
    event: 'search',
    search_term: searchTerm,
  });
};

export const gtag = {
  addToCart,
  addToWishList,
  removeFromCart,
  viewCart,
  viewItem,
  viewItemList,
  login,
  search,
};
