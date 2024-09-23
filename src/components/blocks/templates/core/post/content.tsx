import { BlockComponentProps } from '@src/components/blocks';

export const PostContent = ({ block }: BlockComponentProps) => {
  if ('core/post-content' !== block.blockName) {
    return null;
  }

  return <div>post content</div>;
};
