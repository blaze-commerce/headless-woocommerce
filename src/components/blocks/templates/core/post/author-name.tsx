import { BlockComponentProps } from '@src/components/blocks';

export const PostAuthorName = ({ block }: BlockComponentProps) => {
  if ('core/post-author-name' !== block.blockName) {
    return null;
  }

  return <>post author name</>;
};
