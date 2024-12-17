import { ProductAddonsPriceType } from '@src/models/product/types';

export type TAddOnItemOption = {
  label: string;
  price: number;
  image: string;
  priceType: ProductAddonsPriceType;
};

export type TAddOnItem = {
  id: string;
  name: string;
  price: number;
  priceType: ProductAddonsPriceType;
  quantity: number;
  isCalculated: boolean;
  options?: TAddOnItemOption[];
};
