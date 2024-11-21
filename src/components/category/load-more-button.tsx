import { ArrowRightIcon } from '@heroicons/react/20/solid';
import React from 'react';

import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';
import { Store } from '@src/models/settings/store';
import { cn } from '@src/lib/helpers/helper';

type Props = {
  loadMoreItems: (_arg: number | null) => void;
};

export const LoadMoreButton: React.FC<Props> = ({ loadMoreItems }) => {
  return (
    <button
      id="btnLoadMoreReviews"
      onClick={() => loadMoreItems(null)}
      className={cn(
        'mx-auto mt-10 mb-2.5',
        'flex bg-background hover:bg-black/80 text-black/80 hover:text-white border border-border  text-sm font-bold  rounded-md py-2 px-4  justify-center items-center gap-2.5 h-10'
      )}
    >
      Load More
    </button>
  );
};
