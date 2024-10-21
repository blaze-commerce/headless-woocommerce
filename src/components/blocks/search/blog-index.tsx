import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { Content } from '@src/components/blocks/content';
import { NoResultsBoundary } from '@src/components/header/search/no-results-boundary';
import { NoResults } from '@src/components/header/search/no-results';
import { Hits, HitsPerPage, Index, InstantSearch } from 'react-instantsearch-hooks-web';
import TS_CONFIG from '@src/lib/typesense/config';

type SearchBlogIndexProps = {
  block: ParsedBlock;
};

export const SearchBlogIndex = ({ block }: SearchBlogIndexProps) => {
  return (
    <Index indexName={TS_CONFIG.collectionNames.page}>
      <Content content={block.innerBlocks} />
    </Index>
  );
};
