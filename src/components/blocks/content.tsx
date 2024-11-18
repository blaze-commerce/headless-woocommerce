import { ParsedBlock, parse } from '@wordpress/block-serialization-default-parser';

import { BlockName, ParsedBlock as NewParsedBlock, blocks } from '@src/components/blocks';
import { ContentContextProvider } from '@src/context/content-context';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type ContentProps = {
  content: string | ParsedBlock[];
  type?: 'page' | 'post';
};

export const Content = ({ content, type }: ContentProps) => {
  const parsedContent = typeof content === 'string' ? parse(content) : content;

  if (!parsedContent) {
    return null;
  }

  return (
    <>
      <ContentContextProvider type={type}>
        {parsedContent.map((block, index) => {
          const BlockComponent = blocks[block.blockName as BlockName];
          if (!BlockComponent || typeof BlockComponent === 'undefined') {
            return (
              <ReactHTMLParser
                key={index}
                html={block.innerHTML}
              />
            );
          }

          return (
            <BlockComponent
              key={index}
              block={block as NewParsedBlock}
            />
          );
        })}
      </ContentContextProvider>
    </>
  );
};
