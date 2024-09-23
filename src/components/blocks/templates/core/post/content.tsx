import { BlockComponentProps } from '@src/components/blocks';
import { usePostContext } from '@src/context/post-context';
import { Content } from '@src/components/blocks/content';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';

export const PostContent = ({ block }: BlockComponentProps) => {
  const { post } = usePostContext();
  if ('core/post-content' !== block.blockName || !post?.rawContent) {
    return null;
  }
  const attribute = block.attrs as BlockAttributes;
  const { className } = attribute || {};

  return (
    <div className={cn('post-content', className)}>
      <Content content={post.rawContent} />
    </div>
  );
};
