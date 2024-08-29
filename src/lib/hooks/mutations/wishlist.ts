import { useMutation } from '@apollo/client';

import { useSiteContext } from '@src/context/site-context';
import { ADD_TO_WISHLIST } from '@src/lib/graphql/queries';
import { track } from '@src/lib/track';
import { Product } from '@src/models/product';
import { useWishListStorage } from '@src/lib/hooks';

export const useAddProductToWishListMutation = (product: Product) => {
  const {
    wishListState: [, setWishListIsOpen],
  } = useSiteContext();

  const { addWishList: addWishListLocalStorage } = useWishListStorage();

  return useMutation(ADD_TO_WISHLIST, {
    onCompleted: (data) => {
      if (data?.addProductToWishList?.productId) {
        // On Success:
        track.addToWishList(product);

        // 1. we set local storage for wishlist items so that we can query ts
        // Save the wishlist to local storage
        addWishListLocalStorage(
          parseInt(data?.addProductToWishList?.productId as string),
          parseInt(data?.addProductToWishList?.wishlistId as string)
        );

        // Open Wishlist Slide Over
        setWishListIsOpen((prev: boolean) => !prev);

        // 3. @TODO - we might set the product that it is already added in wishlist
      }
    },
    onError: (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error?.graphQLErrors?.[0]?.message ?? '');
      }
    },
  });
};
