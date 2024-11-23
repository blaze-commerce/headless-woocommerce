import { FilterV2Icon } from '@src/components/svg/filter-v2';

type TProps = {
  handleFilterByClicked: () => void;
  handleSortByClicked: () => void;
};

export const MobileFilterSortButtons = ({ handleFilterByClicked, handleSortByClicked }: TProps) => {
  return (
    <div className="product-archive-filter-sort-mobile">
      <button onClick={handleFilterByClicked}>
        Filter <FilterV2Icon />
      </button>
      <button
        onClick={handleSortByClicked}
        className=""
      >
        Sort By:
      </button>
    </div>
  );
};
