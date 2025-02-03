import { BlockComponentProps } from '@src/components/blocks';
import { cn } from '@src/lib/helpers/helper';
import { Content } from '@src/components/blocks/content';

export const Columns = ({ block }: BlockComponentProps) => {
  if ('core/columns' !== block.blockName) {
    return null;
  }
  return (
    <div className={cn(`_${block.id}`, 'core-columns')}>
      <Content content={block.innerBlocks} />
    </div>
  );
};
