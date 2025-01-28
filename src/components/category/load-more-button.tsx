import React from 'react';

type Props = {
  loadMoreItems: (_arg: number | null) => void;
  className?: string;
};

export const LoadMoreButton: React.FC<Props> = ({ className, loadMoreItems }) => {
  return (
    <button
      id="btnLoadMoreReviews"
      onClick={() => loadMoreItems(null)}
      className={className}
    >
      Load More
    </button>
  );
};
