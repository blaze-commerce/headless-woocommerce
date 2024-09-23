import { BlockComponentProps } from '@src/components/blocks';

export const PostTitle = ({ block }: BlockComponentProps) => {
  if ('core/post-title' !== block.blockName) {
    return null;
  }

  return <>POST TITLE</>;
};
