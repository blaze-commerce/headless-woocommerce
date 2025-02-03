import { FilterV2Icon } from '@src/components/svg/filter-v2';
import { cn } from '@src/lib/helpers/helper';

type TProps = {
  handleFilterByClicked: () => void;
  className?: string;
};

export const FilterToggleButton = (prop: TProps) => {
  const { handleFilterByClicked } = prop;
  return (
    <button
      className={cn('filter-button', prop.className)}
      onClick={handleFilterByClicked}
    >
      Filter <FilterV2Icon />
    </button>
  );
};
