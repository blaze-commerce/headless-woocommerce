import { BlockComponentProps } from '@src/components/blocks';
import { usePostContext } from '@src/context/post-context';
import { BlockAttributes } from '@src/lib/block/types';

export const PostTitle = ({ block }: BlockComponentProps) => {
  const { post } = usePostContext();
  if ('core/post-title' !== block.blockName || !post) {
    return null;
  }

  const attribute = block.attrs as BlockAttributes;
  const { className } = attribute || {};

  return <h1 className={className}>{post.name} </h1>;
};
