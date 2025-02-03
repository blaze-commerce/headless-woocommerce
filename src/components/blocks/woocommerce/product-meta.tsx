import { BlockComponentProps } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { cn } from '@src/lib/helpers/helper';

export const ProductMeta = ({ block }: BlockComponentProps) => {
  const { className } = block.attrs;

  if (!block.innerBlocks) return null;

  return (
    <div className={cn('product-meta', block?.id, className)}>
      <Content content={block.innerBlocks} />
    </div>
  );
};
