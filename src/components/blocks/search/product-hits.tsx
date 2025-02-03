import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { useHits } from 'react-instantsearch-hooks-web';
import { ProductHit } from '@src/components/header/search/product-hit';
import { SearchResultsCount } from '@src/components/header/search/search-results-count';
import { useSearchContext } from '@src/context/search-context';

type SearchProductHitsProps = {
  block: ParsedBlock;
};

export const SearchProductHits = ({ block }: SearchProductHitsProps) => {
  const { hits } = useHits();
  const { searchResultsLink } = useSearchContext();
  const attribute = block.attrs as BlockAttributes;
  return (
    <div className={cn('product-hits gap-3.5', attribute.className)}>
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
