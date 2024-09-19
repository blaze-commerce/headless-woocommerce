import { BlockComponentProps } from '@src/components/blocks';
import { ProductPrice as BasicProductPrice } from '@src/features/product/product-price';
export const ProductPrice = ({ block }: BlockComponentProps) => {
  return <BasicProductPrice />;
};
