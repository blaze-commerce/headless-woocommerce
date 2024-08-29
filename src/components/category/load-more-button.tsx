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
  const { settings } = useSiteContext();
  const { store } = settings as Settings;
  const { reviewService } = store as Store;
  return (
    <button
      id="btnLoadMoreReviews"
      onClick={() => loadMoreItems(null)}
      className={cn(
        'mx-auto mt-10 mb-2.5',
        'flex bg-[#FAF6F2] hover:bg-[#C1B19E] text-[#111111] hover:text-white border border-[#111111] hover:border-[#C1B19E] rounded-[4px] py-3.5 px-4 text-base font-normal leading-6 justify-center items-center gap-2.5 h-10 uppercase'
      )}
    >
      Load More
    </button>
  );
};
