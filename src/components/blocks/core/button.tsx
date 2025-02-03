import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

type ButtonProps = {
  block: ParsedBlock;
};

export const Button = ({ block }: ButtonProps) => {
  if ('core/button' !== block.blockName && !block.innerBlocks[0]) {
    return null;
  }

  return <ReactHTMLParser html={block.innerHTML} />;
};
