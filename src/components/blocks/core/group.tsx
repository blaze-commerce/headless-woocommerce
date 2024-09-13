import { BlockComponentProps } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { cn } from '@src/lib/helpers/helper';

export const Group = ({ block, className }: BlockComponentProps) => {
  const TagName = block.attrs.tagName as keyof JSX.IntrinsicElements;
  return (
    <TagName
      id={block?.id}
      className={cn(className)}
    >
      <Content content={block.innerBlocks} />
    </TagName>
  );
};
