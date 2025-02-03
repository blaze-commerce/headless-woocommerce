import { BlockComponentProps } from '@src/components/blocks';
import { ProductRatingCount } from '@src/features/product/product-rating-count';
export const ProductRating = ({ block }: BlockComponentProps) => {
  const { className } = block.attrs;
  return (
    <ProductRatingCount
      className={className}
      id={block?.id}
    />
  );
};
