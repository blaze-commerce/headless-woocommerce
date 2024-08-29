import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import parse from 'html-react-parser';

type ButtonProps = {
  block: ParsedBlock;
};

export const Button = ({ block }: ButtonProps) => {
  if ('core/button' !== block.blockName && !block.innerBlocks[0]) {
    return null;
  }

  return <>{parse(block.innerHTML)}</>;
};
