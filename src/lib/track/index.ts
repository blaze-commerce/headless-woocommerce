import { AddToCartItemResponse } from '@src/lib/actions/add-to-cart/types';
import { FormattedCart, ProductCartItem } from '@src/lib/hooks/cart';
import { gtag } from '@src/lib/track/gtag';
import { klaviyo } from '@src/lib/track/klaviyo';
import { meta } from '@src/lib/track/meta';
import { Product } from '@src/models/product';

const addToCart = (cartItem: AddToCartItemResponse) => {
  gtag.addToCart(cartItem);
  meta.addToCart(cartItem);
};

const addToWishList = (product: Product) => {
  gtag.addToWishList(product);
  meta.addToWishList(product);
};

const removeFromCart = (cartItem: ProductCartItem) => {
  gtag.removeFromCart(cartItem);
};

const viewCart = (cart: FormattedCart) => {
  gtag.viewCart(cart);
};

const viewItem = (product: Product) => {
  gtag.viewItem(product);
  klaviyo.viewItem(product);
  gtag.viewItem(product);
};

const viewItemList = (product: Product) => {
  gtag.viewItemList(product);
};

const login = () => {
  gtag.login();
};

const search = (searchTerm: string) => {
  gtag.search(searchTerm);
  meta.search(searchTerm);
};

export const track = {
  addToCart,
  addToWishList,
  removeFromCart,
  viewCart,
  viewItem,
  viewItemList,
  login,
  search,
};
