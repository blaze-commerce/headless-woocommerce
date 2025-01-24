import { BlockComponentProps } from '@src/components/blocks';
import { useContentContext } from '@src/context/content-context';
import { usePageContext } from '@src/context/page-context';
import { usePostContext } from '@src/context/post-context';
import { BlockAttributes } from '@src/lib/block/types';
import { ProductTitle } from '@src/components/blocks/woocommerce/product-title';
import { cn } from '@src/lib/helpers/helper';
import { WooCommerceProductNameTemplate } from '@src/components/blocks/woocommerce/product-collection/product-template/product-title';
import { getHeadingTag } from '@src/lib/block';

export const PostTitle = ({ block }: BlockComponentProps) => {
  const { post } = usePostContext();
  const { page } = usePageContext();
  const { type } = useContentContext();

  if (
    'core/post-title' !== block.blockName ||
    ('post' === type && !post) ||
    ('page' === type && !page)
  ) {
    return null;
  }

  const attribute = block.attrs as BlockAttributes;
  const { className, level } = attribute || {};

  const title = 'page' === type && page ? page.name : post?.name;
  const TagName = getHeadingTag(level as number);

  if (
    attribute.__woocommerceNamespace &&
    attribute.__woocommerceNamespace === 'woocommerce/product-collection/product-title'
  ) {
    return <WooCommerceProductNameTemplate block={block} />;
  }

  return (
    <TagName className={cn(block?.id, 'post-title', className)}>
      {attribute?.__woocommerceNamespace &&
      attribute?.__woocommerceNamespace === 'woocommerce/product-query/product-title' ? (
        <ProductTitle />
      ) : (
        title
      )}
    </TagName>
  );
};
