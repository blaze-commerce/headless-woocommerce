import { BlockComponentProps } from '@src/components/blocks';

export const PostDate = ({ block }: BlockComponentProps) => {
  if ('core/post-date' !== block.blockName) {
    return null;
  }

  return <>date</>;
};
