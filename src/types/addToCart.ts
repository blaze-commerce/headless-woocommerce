import { ProductAddonsPriceType } from '@src/models/product/types';

export type TAddOnItemOption = {
  label: string;
  price: number;
  image: string;
  priceType: ProductAddonsPriceType;
  value?: string;
};

export type TAddOnItem = {
  id: string;
  name: string;
  price: number;
  priceType: ProductAddonsPriceType;
  quantity: number;
  isCalculated: boolean;
  options?: TAddOnItemOption[];
  display: string;
  className?: string;
};
