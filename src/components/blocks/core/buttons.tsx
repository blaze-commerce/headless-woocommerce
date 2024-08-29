import { Content } from '@src/components/blocks/content';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

type ButtonsProps = {
  block: ParsedBlock;
};

export const Buttons = ({ block }: ButtonsProps) => {
  if ('core/buttons' !== block.blockName && !block.innerBlocks[0]) {
    return null;
  }

  return (
    <div className="core-buttons flex flex-wrap gap-2">
      <Content content={block.innerBlocks} />
    </div>
  );
};
