import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import parse from 'html-react-parser';

type Props = {
  block: ParsedBlock;
};

export const Html = ({ block }: Props) => {
  if ('core/html' !== block.blockName) {
    return null;
  }
  return <>{parse(block.innerHTML)}</>;
};
