/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddToCartItemResponse } from '@src/lib/actions/add-to-cart/types';
import { env } from '@src/lib/env';
import { getDefaultCurrency } from '@src/lib/helpers/country';
import { Product } from '@src/models/product';
const { NEXT_PUBLIC_META_PIXEL_ID } = env();

declare global {
  interface Window {
    fbq: any;
  }
}

// for reference of meta events https://developers.facebook.com/docs/meta-pixel/reference/
type Event = 'PageView' | 'AddToCart' | 'AddToWishlist' | 'ViewContent' | 'Search';

// for reference of meta events https://developers.facebook.com/docs/meta-pixel/reference/
type ContentProps = {
  id: string | number;
  quantity: number;
};

// Common properties for all event objects
type CommonEventObjectProps = {
  value: number;
  currency?: string;
};

// Specific properties for each event type
type AddToCartEventProps = CommonEventObjectProps & {
  content_name: string;
  content_ids: string[] | number[];
  content_type: 'product';
  contents?: ContentProps[];
};

type AddToWishListEventProps = CommonEventObjectProps & {
  content_name: string;
  content_category: string;
  content_ids: string[] | number[];
  contents: ContentProps[];
};

type ViewContentEventProps = CommonEventObjectProps & {
  content_name: string;
  content_ids?: string[] | number[]; // Optional here
  content_category: string;
  content_type: 'page' | 'product' | string;
  contents?: ContentProps[];
};

type SearchEventProps = CommonEventObjectProps & {
  content_category: 'Products & Taxonomies';
  search_string: string;
};

// Union type for all event object possibilities
type EventObjectProps =
  | AddToCartEventProps
  | AddToWishListEventProps
  | ViewContentEventProps
  | SearchEventProps;

const META_PIXEL_ID = NEXT_PUBLIC_META_PIXEL_ID;

const triggerEvent = (event: Event, data?: EventObjectProps) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (typeof data !== 'undefined') {
      const currency = getDefaultCurrency();
      window.fbq('track', event, {
        ...data,
        currency,
      });
    }

    if ('PageView' === event) {
      window.fbq('track', event);
    }
  }
};

const pageView = () => {
  triggerEvent('PageView');
};

const addToCart = (cartItem: AddToCartItemResponse) => {
  const value = parseFloat(cartItem.totalRaw);
  const data: AddToCartEventProps = {
    content_ids: [cartItem.product.node.sku],
    content_name: cartItem.product.node.name,
    content_type: 'product',
    value,
    contents: [
      {
        id: cartItem.product.node.sku,
        quantity: cartItem.quantity,
      },
    ],
  };
  triggerEvent('AddToCart', data);
};

const addToWishList = (product: Product) => {
  const currency = getDefaultCurrency();
  const value = product.currencyPrice(currency);
  const data: AddToWishListEventProps = {
    content_ids: [product.name as string],
    content_name: product.name as string,
    content_category: 'AddToWishlist',
    value,
    contents: [
      {
        id: product.sku as string,
        quantity: 1,
      },
    ],
  };
  triggerEvent('AddToWishlist', data);
};

const viewItem = (product: Product) => {
  const currency = getDefaultCurrency();
  const value = product.currencyPrice(currency);
  const data: ViewContentEventProps = {
    content_ids: [product.sku as string],
    content_category: '',
    content_name: product.name as string,
    content_type: 'product',
    value,
  };
  triggerEvent('ViewContent', data);
};

const search = (searchTerm: string) => {
  const data: SearchEventProps = {
    content_category: 'Products & Taxonomies',
    search_string: searchTerm,
    value: 1,
  };
  triggerEvent('Search', data);
};

export const meta = {
  META_PIXEL_ID,
  pageView,
  triggerEvent,
  addToCart,
  addToWishList,
  viewItem,
  search,
};
