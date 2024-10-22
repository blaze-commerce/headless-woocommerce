import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { Content } from '@src/components/blocks/content';
import { HitsPerPage, Index } from 'react-instantsearch-hooks-web';
import TS_CONFIG from '@src/lib/typesense/config';

type SearchBlogIndexProps = {
  block: ParsedBlock;
};

export const SearchBlogIndex = ({ block }: SearchBlogIndexProps) => {
  return (
    <Index indexName={TS_CONFIG.collectionNames.page}>
      <HitsPerPage
        className="hidden"
        items={[
          {
            label: 'hits per page',
            value: 5,
            default: true,
          },
        ]}
      />
      <Content content={block.innerBlocks} />
    </Index>
  );
};
