import { SearchTerm } from '@src/components/blocks/search/search-term';
import { isBlockNameA } from '@src/lib/block';
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

  if (isBlockNameA(block, 'SearchTerm')) {
    return <SearchTerm block={block} />;
  }

  const theContent: string = block.innerHTML;

  //change shortcodes variables
  const content = theContent.replace('{{current_year}}', String(new Date().getFullYear()));

  return <ReactHTMLParser html={content} />;
};
