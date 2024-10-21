import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

type HeadingProps = {
  block: ParsedBlock;
};

export const Heading = ({ block }: HeadingProps) => {
  if ('core/heading' !== block.blockName) {
    return null;
  }
  return <ReactHTMLParser html={block.innerHTML} />;
};
