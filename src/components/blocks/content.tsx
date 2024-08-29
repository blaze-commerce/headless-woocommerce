import { ParsedBlock, parse } from '@wordpress/block-serialization-default-parser';

import { BlockName, ParsedBlock as NewParsedBlock, blocks } from '@src/components/blocks';

type ContentProps = {
  content: string | ParsedBlock[];
};

export const Content = ({ content }: ContentProps) => {
  const parsedContent = typeof content === 'string' ? parse(content) : content;

  if (!parsedContent) {
    return null;
  }
  return (
    <>
      {parsedContent.map((block, index) => {
        const BlockComponent = blocks[block.blockName as BlockName];
        if (!BlockComponent || typeof BlockComponent === 'undefined') {
          return null;
        }

        return (
          <BlockComponent
            key={index}
            block={block as NewParsedBlock}
          />
        );
      })}
    </>
  );
};
