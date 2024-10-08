import HTMLReactParser from 'html-react-parser';
import { formatTextWithNewline } from '@src/lib/helpers/helper';
import { cn } from '@src/lib/helpers/helper';
import { useProductContext } from '@src/context/product-context';

interface IProps {
  id?: string;
  classNames?: string;
}

export const ProductShortDescription = ({ classNames, id }: IProps) => {
  const { product } = useProductContext();

  if (!product || !product.shortDescription) return null;

  return (
    <div className={cn('product-short-description', classNames, id)}>
      {HTMLReactParser(formatTextWithNewline(product.shortDescription))}
    </div>
  );
};
