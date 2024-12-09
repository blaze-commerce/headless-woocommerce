import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { useHits } from 'react-instantsearch-hooks-web';

import { PrefetchLink } from '@src/components/common/prefetch-link';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { useEffect } from 'react';
import { useSearchContext } from '@src/context/search-context';

type SearchCategoryHitsProps = {
  block: ParsedBlock;
};

export const SearchCategoryHits = ({ block }: SearchCategoryHitsProps) => {
  const { hits } = useHits();
  const { searchTermState, setCategoryPermalink } = useSearchContext();
  const [searchTerm] = searchTermState;

  useEffect(() => {
    const firstHit = hits.length > 0 ? hits[0] : null;
    const name = firstHit?.name ? `${firstHit.name}` : '';

    let categoryPermalink = '';
    if (searchTerm && name.toLowerCase() === searchTerm.toLowerCase()) {
      categoryPermalink = firstHit?.permalink ? (firstHit?.permalink as string) : '';
    }
    setCategoryPermalink(categoryPermalink);
  }, [hits, searchTerm, setCategoryPermalink]);

  const attribute = block.attrs as BlockAttributes;
  return (
    <div className={attribute.className}>
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
