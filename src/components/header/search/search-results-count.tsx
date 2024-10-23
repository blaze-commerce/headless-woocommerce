import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useHits } from 'react-instantsearch-hooks-web';

import { PrefetchLink } from '@src/components/common/prefetch-link';
import { useSiteContext } from '@src/context/site-context';
import { cn } from '@src/lib/helpers/helper';

export const SearchResultsCount = ({ searchResultsLink }: { searchResultsLink: string }) => {
  const { results } = useHits();
  const { settings } = useSiteContext();

  return (
    <PrefetchLink
      unstyled
      href={searchResultsLink}
    >
      <span
        className={cn(
          'flex flex-row items-center gap-2.5 text-center text-[#777777] text-base font-bold underline leading-normal'
        )}
      >
        See All Products ({results?.nbHits})
      </span>
    </PrefetchLink>
  );
};
