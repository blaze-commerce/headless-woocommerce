import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import parse from 'html-react-parser';

type ListItemProps = {
  block: ParsedBlock;
};

export const ListItem = ({ block }: ListItemProps) => {
  if ('core/list-item' !== block.blockName && !block.innerBlocks[0]) {
    return null;
  }
  return <>{parse(block.innerHTML)}</>;
};
