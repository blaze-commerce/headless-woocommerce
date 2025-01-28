import { ParsedBlock } from '@src/components/blocks';
import { SortByButton } from '@src/components/category/filter/sort-by-button';

import { useTaxonomyContext } from '@src/context/taxonomy-context';

export const TaxonomyCatalogSorting = ({ block }: { block: ParsedBlock }) => {
  const taxonomyCtx = useTaxonomyContext();
  const [, setSortByOpen] = taxonomyCtx.slideOverSort;
  const [selectedSortOption] = taxonomyCtx.sortByState;

  return (
    <div className={block.attrs.className}>
      <SortByButton
        setSortByOpen={setSortByOpen}
        selectedSortOption={selectedSortOption}
      />
    </div>
  );
};
