import { htmlParser } from '@src/lib/block/react-html-parser';
import { Product } from '@src/models/product';

type ICardProductCategory = {
  product: Product;
};

export const CardProductCategory: React.FC<ICardProductCategory> = (props) => {
  const { product } = props;

  if (!product || !product.categories || product.categories.length === 0) return null;

  const categories = product.categories.map((category) => htmlParser(category.name));

  return <div className={'product-category'}>{categories.join(', ')}</div>;
};
