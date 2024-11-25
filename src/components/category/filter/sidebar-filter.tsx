import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { useSiteContext } from '@src/context/site-context';
import { FilterV2Icon } from '@src/components/svg/filter-v2';
import { FilterOptionBlocks } from '@components/filter-option-blocks';
import { PriceRangeFilter } from '@src/components/category/filter/price-range';

type TProps = {
  applyFilterClicked: () => void;
  resetFilterAction: () => void;
};

export const SidebarFilter = (props: TProps) => {
  const { applyFilterClicked, resetFilterAction } = props;
  const taxonomyCtx = useTaxonomyContext();
  const { currentCountry } = useSiteContext();
  return (
    <div className="product-archive-filter">
      <h2 className="filter-main-title">
        Filters <FilterV2Icon />
      </h2>
      <FilterOptionBlocks
        blocks={taxonomyCtx.filterOptionContent}
        baseCountry={currentCountry}
      />

      <PriceRangeFilter
        enableDisclosure={true}
        defaultShow={true}
      />

      <button
        className="hidden mt-3 w-full border border-black mb-2 p-2.5"
        onClick={applyFilterClicked}
      >
        APPLY
      </button>
      <button
        onClick={resetFilterAction}
        className="hidden w-full border border-black mb-2 p-2.5"
      >
        RESET
      </button>
    </div>
  );
};
