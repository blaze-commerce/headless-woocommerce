import { ParsedBlock } from '@src/components/blocks';

interface PostTitleProps {
  block: {
    id?: string;
    innerBlocks: ParsedBlock[];
    attrs: {
      className?: string;
      uniqueId?: string;
      level: number;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    componentProps?: any;
  };
}

export const PostTitle = ({ block }: PostTitleProps) => {
  const { level, className } = block.attrs;
  let TagName: keyof JSX.IntrinsicElements;
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
  return <TagName className={className}>Post Title</TagName>;
};
