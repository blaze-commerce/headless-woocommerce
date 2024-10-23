import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { Content } from '@src/components/blocks/content';
import { HitsPerPage, Index } from 'react-instantsearch-hooks-web';
import TS_CONFIG from '@src/lib/typesense/config';
import { BlockAttributes } from '@src/lib/block/types';

type SearchProductIndexProps = {
  block: ParsedBlock;
};

export const SearchProductIndex = ({ block }: SearchProductIndexProps) => {
  const attribute = block.attrs as BlockAttributes;
  return (
    <div className={attribute.className}>
      <Index indexName={TS_CONFIG.collectionNames.product}>
        <HitsPerPage
          className="hidden"
          items={[
            {
              label: 'hits per page',
              value: 10,
              default: true,
            },
          ]}
        />
        <Content content={block.innerBlocks} />
      </Index>
    </div>
  );
};
