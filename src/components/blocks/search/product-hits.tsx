import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { Content } from '@src/components/blocks/content';
import { NoResultsBoundary } from '@src/components/header/search/no-results-boundary';
import { NoResults } from '@src/components/header/search/no-results';
import { Hits, HitsPerPage, Index, InstantSearch, useHits } from 'react-instantsearch-hooks-web';
import TS_CONFIG from '@src/lib/typesense/config';
import { PrefetchLink } from '@src/components/common/prefetch-link';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { ProductHit } from '@src/components/header/search/product-hit';

type SearchProductHitsProps = {
  block: ParsedBlock;
};

export const SearchProductHits = ({ block }: SearchProductHitsProps) => {
  const { hits } = useHits();

  return (
    <div className="product-hits">
      {hits.length > 0 &&
        hits.map((hit: any) => (
          <ProductHit
            hit={hit}
            key={hit.id}
          />
        ))}
    </div>
  );
};
