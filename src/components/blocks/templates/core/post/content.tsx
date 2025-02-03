import { BlockComponentProps } from '@src/components/blocks';
import { usePostContext } from '@src/context/post-context';
import { Content } from '@src/components/blocks/content';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { usePageContext } from '@src/context/page-context';
import { useContentContext } from '@src/context/content-context';

export const PostContent = ({ block }: BlockComponentProps) => {
  const { post } = usePostContext();
  const { page } = usePageContext();
  const { type } = useContentContext();

  if (
    'core/post-content' !== block.blockName ||
    ('post' === type && !post?.rawContent) ||
    ('page' === type && !page?.rawContent)
  ) {
    return null;
  }

  const attribute = block.attrs as BlockAttributes;
  const { className } = attribute || {};

  return (
    <div className={cn('post-content', className)}>
      <Content content={'page' === type && page ? page.rawContent || '' : post?.rawContent || ''} />
    </div>
  );
};
