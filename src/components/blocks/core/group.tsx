import { Content } from '@src/components/blocks/content';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

type GroupProps = {
  block: ParsedBlock;
};

export const Group = ({ block }: GroupProps) => {
  if ('core/group' !== block.blockName && !block.innerBlocks[0]) {
    return null;
  }

  console.log('core group', block);

  return <div className="core-group">this is group</div>;
};
