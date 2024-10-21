import { formatTextWithNewline } from '@src/lib/helpers/helper';
import { cn } from '@src/lib/helpers/helper';
import { useProductContext } from '@src/context/product-context';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

interface IProps {
  id?: string;
  classNames?: string;
}

export const ProductShortDescription = ({ classNames, id }: IProps) => {
  const { product } = useProductContext();

  if (!product || !product.shortDescription) return null;

  return (
    <div className={cn('product-short-description', classNames, id)}>
      <ReactHTMLParser html={formatTextWithNewline(product.shortDescription)} />
    </div>
  );
};
