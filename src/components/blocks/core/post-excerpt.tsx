import { BlockComponentProps } from '@src/components/blocks';
import dynamic from 'next/dynamic';

const ProductShortDescription = dynamic(() =>
  import('@src/features/product/product-short-description').then(
    (mod) => mod.ProductShortDescription
  )
);

export const PostExcerpt = ({ block }: BlockComponentProps) => {
  const { className } = block.attrs;

  // if block is from WooCommerce then display product short description
  if (typeof block.attrs.__woocommerceNamespace !== 'undefined') {
    return (
      <ProductShortDescription
        classNames={className}
        id={block?.id}
      />
    );
  }

  return <>Excerpt</>;
};
