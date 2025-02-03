import { env } from '@src/lib/env';
import { getDefaultCurrency } from '@src/lib/helpers/country';
import { Product } from '@src/models/product';
const { NEXT_PUBLIC_LIVE_URL } = env();

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    klaviyo: any;
  }
}

type Productitem = {
  ProductName: string;
  ProductID: string;
  SKU: string;
  ImageURL: string;
  URL: string;
  Price: number;
  Brand?: string;
  Categories?: string[];
};

type Callback = () => void;

const triggerEvent = (callback: Callback) => {
  if (typeof window !== 'undefined' && window.klaviyo) {
    callback();
  }
};

const viewItem = (product: Product) => {
  triggerEvent(() => {
    const currency = getDefaultCurrency();
    const productLink = `${NEXT_PUBLIC_LIVE_URL}/${product?.permalink}`;
    const item: Productitem = {
      ProductName: product.name as string,
      ProductID: product.id as string,
      SKU: product.sku as string,
      ImageURL: product.thumbnail?.src as string,
      URL: productLink,
      Categories: product.categories?.map((tax) => tax.name),
      Price: product.currencyPrice(currency),
    };
    window.klaviyo.push(['track', 'Viewed Product', item]);
  });
};

const login = () => {};

export const klaviyo = {
  viewItem,
  login,
};
