import HTMLReactParser from 'html-react-parser';
import { formatTextWithNewline } from '@src/lib/helpers/helper';
import { cn } from '@src/lib/helpers/helper';
import { useProductContext } from '@src/context/product-context';

type TProps = {
  classNames?: string;
};

export const ProductShortDescription: React.FC = (props: TProps) => {
  const { classNames } = props;
  const { product } = useProductContext();

  if (!product || !product.shortDescription) return null;

  return (
    <div className={cn('product-short-description', classNames)}>
      {HTMLReactParser(formatTextWithNewline(product.shortDescription))}
    </div>
  );
};
