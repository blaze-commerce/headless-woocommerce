import { BlockComponentProps } from '@src/components/blocks';
import { usePostContext } from '@src/context/post-context';
import { formatDate } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';

export const PostDate = ({ block }: BlockComponentProps) => {
  const { post } = usePostContext();
  if ('core/post-date' !== block.blockName || !post || !post.createdAt) {
    return null;
  }

  const attribute = block.attrs as BlockAttributes;
  const { format = 'M j, Y' } = attribute || {};

  return <>{formatDate(post.createdAt, format)}</>;
};
