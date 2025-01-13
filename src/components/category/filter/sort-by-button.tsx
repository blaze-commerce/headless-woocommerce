import { ChevronDown } from '@src/components/svg/chevron-down';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type TProps = {
  setSortByOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSortOption: { label: string; value: string };
};
export const SortByButton = (props: TProps) => {
  const { setSortByOpen, selectedSortOption } = props;
  return (
    <div className="group/sortby">
      <button
        onClick={() => {
          setSortByOpen((prev) => !prev);
        }}
        className="button-sort-by "
      >
        <ReactHTMLParser html={selectedSortOption?.label || 'Sort by'} />
        {/* <ChevronDown /> */}
      </button>
    </div>
  );
};
