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

type SearchCategoryHitsProps = {
  block: ParsedBlock;
};

export const SearchCategoryHits = ({ block }: SearchCategoryHitsProps) => {
  const { hits } = useHits();

  return (
    <div>
      {hits.length > 0 &&
        hits.map((hit: any) => (
          <PrefetchLink
            key={hit.objectID}
            unstyled
            href={hit.permalink}
          >
            <div className="group flex justify-start items-center py-1 cursor-pointer mb-2.5 hover:bg-[#F2F2F2]">
              <p className={cn('text-[#585858] text-sm font-normal uppercase')}>
                <ReactHTMLParser html={hit.name} />
              </p>
            </div>
          </PrefetchLink>
        ))}
    </div>
  );
};
