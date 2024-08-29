import HTMLReactParser from 'html-react-parser';
import { formatTextWithNewline } from '@src/lib/helpers/helper';
import { useSiteContext } from '@src/context/site-context';
import { useProductContext } from '@src/context/product-context';

export const ProductShortDescription: React.FC = () => {
  const { settings } = useSiteContext();
  const { product } = useProductContext();

  if (settings?.product?.features.shortDescription?.enabled === false) return null;
  if (!product || !product.shortDescription) return null;

  return (
    <div className="mt-4 border-t py-4 product-short-description">
      {HTMLReactParser(formatTextWithNewline(product.shortDescription))}
    </div>
  );
};
