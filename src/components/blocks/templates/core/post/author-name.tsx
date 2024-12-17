import { BlockComponentProps } from '@src/components/blocks';
import { usePostContext } from '@src/context/post-context';
import { capitalizeString } from '@src/lib/helpers';

export const PostAuthorName = ({ block }: BlockComponentProps) => {
  const { post } = usePostContext();
  if ('core/post-author-name' !== block.blockName || !post || !post.author) {
    return null;
  }

  return <>{capitalizeString(post.author.displayName)}</>;
};
