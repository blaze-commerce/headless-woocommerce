import { BlockComponentProps } from '@src/components/blocks';
import { useContentContext } from '@src/context/content-context';
import { usePageContext } from '@src/context/page-context';
import { usePostContext } from '@src/context/post-context';
import { BlockAttributes } from '@src/lib/block/types';
import { ProductTitle } from '@src/components/blocks/woocommerce/product-title';
import { cn } from '@src/lib/helpers/helper';

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

  let TagName: keyof JSX.IntrinsicElements;
  const title = 'page' === type && page ? page.name : post?.name;

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
