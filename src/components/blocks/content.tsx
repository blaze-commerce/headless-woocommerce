import { ParsedBlock, parse } from '@wordpress/block-serialization-default-parser';

import { BlockName, ParsedBlock as NewParsedBlock, blocks } from '@src/components/blocks';
import { ContentContextProvider } from '@src/context/content-context';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

export type ContentPropTypes = 'page' | 'post' | 'mini-cart';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContentGlobalDataType = any;

type ContentProps = {
  content: string | ParsedBlock[];
  type?: ContentPropTypes;
  globalData?: ContentGlobalDataType;
};

export const Content = ({ content, type, globalData }: ContentProps) => {
  const parsedContent = typeof content === 'string' ? parse(content) : content;

  if (!parsedContent) {
    return null;
  }

  return (
    <>
      <ContentContextProvider
        type={type}
        data={globalData}
      >
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
