import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import React from 'react';

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

  return <ReactHTMLParser html={content} />;
};
