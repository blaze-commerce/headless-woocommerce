import { BlockComponentProps } from '@src/components/blocks';
import { cn } from '@src/lib/helpers/helper';
import { ProductTitle } from '@src/components/blocks/woocommerce/product-title';
import { getHeadingTag } from '@src/lib/block';

export const PostTitle = ({ block }: BlockComponentProps) => {
  const { level, className } = block.attrs;

  const title = 'Post Title'; // later should be replaced with actual post title
  const TagName = getHeadingTag(level as number);

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
