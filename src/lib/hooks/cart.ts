import { numberFormat } from '@src/lib/helpers/product';
import { keyBy } from 'lodash';

/**
 * Extracts and returns float value from a string.
 *
 * @param {string} value String
 * @return {any}
 */
export const getNumberFromCurrency = (value: string) => {
  return Number(value.replace(/[^0-9.-]+/g, ''));
};

type ProductCartItemAttribute = {
  id: string;
  label: string;
  name: string;
  value: string;
};

type MetaData = {
  key: string;
  value: string;
};

export type ProductCartItem = {
  productId: string;
  cartKey: string;
  name: string;
  qty: string;
  stockQuantity?: number;
  price: number;
  totalPrice: string;
  sku: string;
  slug?: string;
  link?: string;
  image: {
    sourceUrl: string;
    srcSet: string;
    altText: string;
    title: string;
  };
  attributes?: ProductCartItemAttribute[];
  variantId?: number;
  type: string;
  cartItemType: string;
  extraData?: MetaData[];
  bundledItemsCartKeys?: string[];
  bundledProductItems?: ProductCartItem[];
};

export type CouponCode = {
  code: string;
  description?: string;
  discountAmount: string;
  discountTax: string;
};

export type FormattedCart = {
  products: ProductCartItem[];
  totalProductsCount?: number;
  totalProductsPrice?: string;
  appliedCoupons?: CouponCode[];
  subtotal?: string;
  total?: string;
  totalTax?: string;
  feeTotal?: string;
};

/**
 * Returns cart data in the required format.
 * @param {String} data Cart data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFormattedCart = (data: any): FormattedCart => {
  if (undefined === data || !data.cart.contents.nodes.length) {
    return { products: [] };
  }
  const givenProducts = data.cart.contents.nodes;

  // Create an empty object.
  let totalProductsCount = 0;
  const products: ProductCartItem[] = [];
  let allBundledItemsCartKeys: string[] = [];

  for (let i = 0; i < givenProducts.length; i++) {
    let givenProduct = givenProducts?.[i]?.product?.node;
    const link = givenProduct?.link ?? '';
    const slug = givenProduct?.slug ?? '';
    const productId = givenProduct?.productId ?? '';
    const sku = givenProduct?.sku ?? '';
    const cartKey = givenProducts?.[i]?.key ?? '';
    const cartItemType = givenProducts?.[i].__typename;
    const extraData = givenProducts?.[i].extraData;

    let bundledItemsCartKeys: string[] = [];
    const bundledItemsMeta = extraData.find(
      (item: { key: string }) => item.key === 'bundled_items'
    );

    if (bundledItemsMeta) {
      bundledItemsCartKeys = JSON.parse(bundledItemsMeta.value);
      allBundledItemsCartKeys = allBundledItemsCartKeys.concat(bundledItemsCartKeys);
    }

    let price;

    if (givenProduct?.type === 'VARIABLE') {
      givenProduct = givenProducts?.[i]?.variation?.node;
      totalProductsCount += givenProducts?.[i]?.quantity;
      price = givenProducts?.[i]?.variation?.node?.price;
    } else {
      price = givenProduct?.price;
    }

    if (
      cartItemType === 'CartItem' ||
      (cartItemType === 'CompositeCartItem' && givenProduct?.type === 'COMPOSITE')
    ) {
      totalProductsCount += givenProducts?.[i]?.quantity;
    }

    if (
      cartItemType === 'SimpleCartItem' &&
      ['UNSUPPORTED', 'SIMPLE'].indexOf(givenProduct?.type) > -1
    ) {
      totalProductsCount += givenProducts?.[i]?.quantity;
    }

    const productData: ProductCartItem = {
      productId,
      cartKey,
      name: givenProduct?.name ?? '',
      qty: givenProducts?.[i]?.quantity,
      price,
      totalPrice: givenProducts?.[i]?.total ?? '',
      slug,
      link,
      image: {
        sourceUrl: givenProduct?.image?.sourceUrl ?? '',
        srcSet: givenProduct?.image?.srcSet ?? '',
        title: givenProduct?.image?.title ?? '',
        altText: givenProduct?.image?.altText ?? '',
      },
      stockQuantity: givenProduct?.stockQuantity,
      type: givenProduct?.type,
      cartItemType: givenProducts?.[i].__typename,
      extraData: givenProducts?.[i].extraData,
      sku,
      bundledItemsCartKeys,
    };

    if (givenProducts?.[i]?.variation?.attributes) {
      productData.attributes = givenProducts?.[i]?.variation?.attributes;
      productData.variantId = givenProduct.variationId;
    }

    // Push each item into the products array.
    products.push(productData);
  }

  const total = parseFloat(data?.cart?.total ?? '') || 0;
  const totalTax = parseFloat(data?.cart?.totalTax ?? '') || 0;
  const shippingTotal = parseFloat(data?.cart?.shippingTotal ?? '') || 0;
  const totalWithoutShipping = total - shippingTotal;
  const feeTotal = parseFloat(data?.cart?.feeTotal ?? '') || 0;
  const feeTax = parseFloat(data?.cart?.feeTax ?? '') || 0;
  const feeTotalWithTax = parseFloat((feeTotal + feeTax).toString() || '');
  const subtotal = parseFloat(data?.cart?.subtotal) + parseFloat(data?.cart?.subtotalTax);

  const productsKeyByCartKey = keyBy(products, 'cartKey');

  const finalProducts: ProductCartItem[] = [];
  products.forEach((product) => {
    if (
      'BundleCartItem' === product.cartItemType &&
      product.bundledItemsCartKeys &&
      product.bundledItemsCartKeys.length > 0
    ) {
      const bundledProductItems = product.bundledItemsCartKeys.map((cartKey) => {
        return productsKeyByCartKey[cartKey];
      });

      const modifiedProduct = {
        ...product,
        bundledProductItems,
      };

      finalProducts.push(modifiedProduct);
    }

    if (
      'BundleCartItem' !== product.cartItemType &&
      !allBundledItemsCartKeys.includes(product.cartKey)
    ) {
      finalProducts.push(product);
    }
  });

  return {
    products: finalProducts,
    totalProductsCount,
    totalProductsPrice: data?.cart?.total ?? '',
    appliedCoupons: data?.cart?.appliedCoupons ?? [],
    subtotal: subtotal.toString() ?? '',
    total: totalWithoutShipping.toString() ?? '',
    totalTax: totalTax.toString() ?? '',
    feeTotal: numberFormat(feeTotalWithTax) ?? '',
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setCartLocalStorage = (newCart: any) => {
  return localStorage.setItem('woo-next-cart', JSON.stringify(newCart));
};

export const getCartLocalStorage = () => {
  return localStorage.getItem('woo-next-cart');
};

export const removeCartLocalStorage = () => {
  return localStorage.removeItem('woo-next-cart');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setCartKey = (newCart: any) => {
  return localStorage.setItem('woo-cart-key', JSON.stringify(newCart));
};

export const removeCartKey = () => {
  return localStorage.removeItem('woo-cart-key');
};

export const getCartKey = () => {
  const cartKey: string[] = [];
  if (typeof window !== 'undefined') {
    const cartStorage = localStorage.getItem('woo-next-cart');

    const cartItems = JSON.parse(cartStorage as string);

    cartItems.products.map((cartItem: ProductCartItem) => {
      cartKey.push(cartItem.cartKey);
    });
  }

  return cartKey;
};
