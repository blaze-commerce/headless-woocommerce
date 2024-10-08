import { BlockComponentProps } from '@src/components/blocks';
import { cn } from '@src/lib/helpers/helper';
import { ProductTitle } from '@src/components/blocks/woocommerce/product-title';

export const PostTitle = ({ block }: BlockComponentProps) => {
  const { level, className } = block.attrs;
  let TagName: keyof JSX.IntrinsicElements;
  const title = 'Post Title'; // later should be replaced with actual post title

  switch (level) {
    case 1:
      TagName = 'h1';
      break;
    case 2:
      TagName = 'h2';
      break;
    case 3:
      TagName = 'h3';
      break;
    case 4:
      TagName = 'h4';
      break;
    case 5:
      TagName = 'h5';
      break;
    case 6:
      TagName = 'h6';
      break;
    default:
      TagName = 'h1'; //
  }

  return (
    <TagName className={cn(block?.id, 'post-title', className)}>
      {block.attrs?.__woocommerceNamespace &&
      block.attrs?.__woocommerceNamespace === 'woocommerce/product-query/product-title' ? (
        <ProductTitle />
      ) : (
        title
      )}
    </TagName>
  );
};
