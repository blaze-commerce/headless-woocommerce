import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import ReactHTMLParser from 'react-html-parser';

type ParagraphProps = {
  block: ParsedBlock;
};

export const Paragraph = ({ block }: ParagraphProps) => {
  if ('core/paragraph' !== block.blockName && !block.innerBlocks[0]) {
    return null;
  }

  const theContent: string = block.innerHTML;

  //change shortcodes variables
  const content = theContent.replace('{{current_year}}', String(new Date().getFullYear()));

  return <>{ReactHTMLParser(content)}</>;
};
