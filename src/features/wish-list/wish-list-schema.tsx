import { ProductCards } from '@src/models/settings/shop';
import { Product } from '@src/models/product';

export type Actions = 'open' | 'add' | 'remove';

export type Props = {
  action: Actions;
  showIcon: boolean;
  isSingleProduct?: boolean;
  buttonFillColor?: string;
  hideText?: boolean;
  textButton?: boolean;
} & (OpenProps | AddProps | RemoveProps) &
  ProductCards;

export type OpenProps = {
  action: 'open';
  fillColor?: string | '';
  showText: boolean;
  label?: string;
};

export type AddProps = {
  action: 'add';
  product: Product;
  classNames?: string;
};

export type RemoveProps = {
  action: 'remove';
  classNames?: string;
  productId: number;
};
