import { FilterV2Icon } from '@src/components/svg/filter-v2';

type TProps = {
  handleFilterByClicked: () => void;
};

export const FilterToggleButton = (prop: TProps) => {
  const { handleFilterByClicked } = prop;
  return (
    <button
      className="filter-button"
      onClick={handleFilterByClicked}
    >
      Filter <FilterV2Icon />
    </button>
  );
};
