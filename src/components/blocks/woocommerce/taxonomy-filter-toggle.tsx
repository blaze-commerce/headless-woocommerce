import { FilterToggleButton } from '@src/components/category/filter/filter-toggle';
import { ParsedBlock } from '@src/components/blocks';
import { ActiveFilters } from '@src/components/category/filter/active-filters';

import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { isEmpty } from 'lodash';
import { useSiteContext } from '@src/context/site-context';

export const TaxonomyFilterToggle = ({ block }: { block: ParsedBlock }) => {
  const taxonomyCtx = useTaxonomyContext();
  const [filterOpen, setFilterOpen] = taxonomyCtx.slideOverFilter;
  const { settings } = useSiteContext();

  const resetFilterAction = () => {
    const [, , , setPrice] = taxonomyCtx.priceFilter;
    setPrice(null);

    const [, , , setBrands] = taxonomyCtx.brandsFilter;
    setBrands(null);

    const [, , , setSale] = taxonomyCtx.saleFilter;
    setSale(null);

    const [, , , setNew] = taxonomyCtx.newFilter;
    setNew(null);

    const [, , , setCategory] = taxonomyCtx.categoryFilter;
    setCategory(null);

    const [, , , setAvailability] = taxonomyCtx.availabilityFilter;
    setAvailability(null);

    const [, , , setRefinedSelection] = taxonomyCtx.refinedSelection;
    setRefinedSelection(null);

    const [, , , setAttributeState] = taxonomyCtx.attributeFilter;
    setAttributeState([]);
  };

  if (block.attrs?.filterType === 'attribute-filter') {
    return (
      <FilterToggleButton
        className={block.attrs?.className}
        handleFilterByClicked={() => setFilterOpen(!filterOpen)}
      />
    );
  }

  const isFilterSet = !isEmpty(
    taxonomyCtx.priceFilter[2] ||
      taxonomyCtx?.brandsFilter[2] ||
      taxonomyCtx.saleFilter[2] ||
      taxonomyCtx.newFilter[2] ||
      taxonomyCtx.categoryFilter[2] ||
      taxonomyCtx?.availabilityFilter[2] ||
      taxonomyCtx.refinedSelection[2] ||
      taxonomyCtx.attributeFilter[2]
  );

  if (block.attrs?.filterType === 'active-filters') {
    return (
      <div className="active-filters">
        <ActiveFilters {...settings?.shop?.layout?.activeFilters} />
        {isFilterSet && (
          <button
            onClick={resetFilterAction}
            className="clear-button-holder"
          >
            <span className="text-sm">Clear all</span>
          </button>
        )}
      </div>
    );
  }

  return null;
};
