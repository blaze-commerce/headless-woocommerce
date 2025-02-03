import { ChevronDown } from '@src/components/svg/chevron-down';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { cn } from '@src/lib/helpers/helper';

type TProps = {
  setSortByOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSortOption: { label: string; value: string };
  className?: string;
};
export const SortByButton = (props: TProps) => {
  const { setSortByOpen, selectedSortOption } = props;
  return (
    <div className="group/sortby">
      <button
        onClick={() => {
          setSortByOpen((prev) => !prev);
        }}
        className={cn('button-sort-by', props.className)}
      >
        <ReactHTMLParser html={selectedSortOption?.label || 'Sort by'} />
        {/* <ChevronDown /> */}
      </button>
    </div>
  );
};
