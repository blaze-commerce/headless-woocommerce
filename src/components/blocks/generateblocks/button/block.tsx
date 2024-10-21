import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

type ButtonProps = {
  block: ParsedBlock;
};

export const GENERATE_BLOCKS_BUTTON_BLOCK_NAME = 'generateblocks/button';

export const GenerateBlocksButton = ({ block }: ButtonProps) => {
  if ('generateblocks/button' !== block.blockName && !block.innerBlocks[0]) {
    return null;
  }

  return <ReactHTMLParser html={block.innerHTML} />;
};
