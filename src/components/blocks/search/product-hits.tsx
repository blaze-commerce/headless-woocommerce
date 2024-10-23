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
import { SearchResultsCount } from '@src/components/header/search/search-results-count';
import { useSearchContext } from '@src/context/search-context';

type SearchProductHitsProps = {
  block: ParsedBlock;
};

export const SearchProductHits = ({ block }: SearchProductHitsProps) => {
  const { hits } = useHits();
  const { searchResultsLink } = useSearchContext();

  return (
    <div className="product-hits">
      {hits.length > 0 &&
        hits.map((hit: any) => (
          <ProductHit
            hit={hit}
            key={hit.id}
          />
        ))}
      <SearchResultsCount searchResultsLink={searchResultsLink} />
    </div>
  );
};
