import { BlockComponentProps } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';

export const Group = ({ block }: BlockComponentProps) => {
  const { className } = block.attrs;
  const TagName = block.attrs?.tagName
    ? (block.attrs.tagName as keyof JSX.IntrinsicElements)
    : ('div' as keyof JSX.IntrinsicElements);

  if (!block.innerBlocks) return null;

  const attributes = block.attrs as BlockAttributes;
  const groupType = attributes.layout?.type;
  const justifyContent = attributes.layout?.justifyContent;
  const orientation = attributes.layout?.orientation;

  const justifyContentClasses = {
    center: 'justify-center',
    left: 'justify-start',
    right: 'justify-end',
    'space-between': 'justify-between',
  };

  return (
    <TagName
      className={cn(
        block?.id,
        'core-group',
        groupType == 'flex' && 'flex',
        groupType == 'grid' && 'grid',
        justifyContent && justifyContentClasses[justifyContent],
        orientation == 'vertical' && 'flex-col',
        className
      )}
    >
      <Content content={block.innerBlocks} />
    </TagName>
  );
};
