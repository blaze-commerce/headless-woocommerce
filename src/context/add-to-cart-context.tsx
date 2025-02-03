import React, { Dispatch, SetStateAction } from 'react';
import createCtx from '@src/context/create-ctx';
import { TAddOnItem } from '@src/types/addToCart';

export type AddToCartContextValue = {
  addons: [TAddOnItem[], Dispatch<SetStateAction<TAddOnItem[]>>];
};

export type AddToCartContextProps = AddToCartContextValue & {
  children: React.ReactNode;
  addons: [TAddOnItem[], Dispatch<SetStateAction<TAddOnItem[]>>];
};

export const [useAddToCartContext, AddToCartContext] = createCtx<AddToCartContextValue>();

export const AddToCartContextProvider = (props: AddToCartContextProps) => {
  const { children } = props;

  const providerValue: AddToCartContextValue = { ...props };

  return <AddToCartContext value={providerValue}>{children}</AddToCartContext>;
};
