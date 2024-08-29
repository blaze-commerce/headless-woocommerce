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
        className={cn('flex flex-row items-center gap-2.5', {
          'text-sm': !settings?.search?.results?.seeAll?.font?.size,
          'font-semibold': !settings?.search?.results?.seeAll?.font?.weight,
          'text-[#928A76]': !settings?.search?.results?.seeAll?.font?.color,
        })}
        style={{
          color: settings?.search?.results?.seeAll?.font?.color ?? '',
          fontSize: settings?.search?.results?.seeAll?.font?.size ?? '',
          fontWeight: settings?.search?.results?.seeAll?.font?.weight ?? '',
        }}
      >
        See All Products ({results?.nbHits}) <ArrowRightIcon className="w-3.5 h-3.5" />
      </span>
    </PrefetchLink>
  );
};
