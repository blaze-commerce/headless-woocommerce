/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  OperationVariables,
  useMutation,
} from '@apollo/client';

import { CartItemSchema } from '@src/lib/actions/add-to-cart/schema';
import { ADD_TO_CART } from '@src/lib/graphql/queries';
import { track } from '@src/lib/track';

export const useAddToCartMutation = (
  options:
    | MutationHookOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
    | undefined
) => {
  const { onCompleted, ...restOptions } = options || {};

  return useMutation(ADD_TO_CART, {
    ...restOptions,
    onCompleted: (data) => {
      if (data.addToCart?.cartItem?.product) {
        const cartItem = CartItemSchema.safeParse(data.addToCart.cartItem);
        if (cartItem.success) {
          track.addToCart(cartItem.data);
        }

        if (onCompleted) {
          onCompleted(data);
        }
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
