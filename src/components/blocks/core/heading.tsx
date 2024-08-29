import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import parse from 'html-react-parser';

type HeadingProps = {
  block: ParsedBlock;
};

export const Heading = ({ block }: HeadingProps) => {
  if ('core/heading' !== block.blockName) {
    return null;
  }
  return <>{parse(block.innerHTML)}</>;
};
