import { useProductContext } from '@src/context/product-context';
import { BlockComponentProps } from '@src/components/blocks';
import { cn } from '@src/lib/helpers/helper';

export const ProductSKU = ({ block }: BlockComponentProps) => {
  const { className } = block.attrs;
  const { product } = useProductContext();

  if (!product || !product?.sku || product.sku === '') return null;

  return (
    <div className={cn('product-sku', block?.id, className)}>
      <span className="product-sku__label">SKU:</span>
      <span className="product-sku__value">{product.sku}</span>
    </div>
  );
};
