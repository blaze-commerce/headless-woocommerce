import { ProductAddonsPriceType } from '@src/models/product/types';

export type TAddOnItem = {
  id: string;
  name: string;
  price: number;
  priceType: ProductAddonsPriceType;
  quantity: number;
  isCalculated: boolean;
};
