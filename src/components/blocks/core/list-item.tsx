import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

type ListItemProps = {
  block: ParsedBlock;
};

export const ListItem = ({ block }: ListItemProps) => {
  if ('core/list-item' !== block.blockName && !block.innerBlocks[0]) {
    return null;
  }

  return <ReactHTMLParser html={block.innerHTML} />;
};
