import { isEmpty } from 'lodash';
import { useEffect } from 'react';

import { ResultCount } from '@src/components/category/filter/result-count';

import { ActiveFilters } from '@src/components/category/filter/active-filters';
import { Modal } from '@src/components/category/filter/modal';
import { SortByOptions } from '@src/components/category/filter/sort-by-options';
import { useSiteContext } from '@src/context/site-context';
import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { Settings } from '@src/models/settings';
import { Shop } from '@src/models/settings/shop';
import TSTaxonomy from '@src/lib/typesense/taxonomy';
import { useRouter } from 'next/router';
import { FilterIcon } from '@src/components/svg/filter';

import { SortByButton } from '@src/components/category/filter/sort-by-button';
import { MobileFilterSortButtons } from '@src/components/category/filter/mobile-filter-sort-buttons';
import { MobileActiveFilters } from '@src/components/category/filter/mobile-active-filters';
import { SidebarFilter } from '@src/components/category/filter/sidebar-filter';
import { FilterToggleButton } from '@src/components/category/filter/filter-toggle';
import { ParsedBlock } from '@src/components/blocks';
import { findBlock } from '@src/lib/block';
import taxonomyProductCatBlocks from '@public/taxonomy-product-cat.json';

type Props = {
  pageNo: number;
  productCount: number;
  applyFilter: () => void;
  onSortChange: (_e: { target: { value: string } }) => void;
  children: React.ReactNode;
};

export const Filter: React.FC<Props> = (props) => {
  const { pageNo, productCount, applyFilter, onSortChange } = props;
  const taxonomyCtx = useTaxonomyContext();
  const { settings, currentCountry, currentCurrency } = useSiteContext();
  const { shop } = settings as Settings;
  const { layout } = shop as Shop;
  const router = useRouter();

  const [filterOpen, setFilterOpen] = taxonomyCtx.slideOverFilter;
  const [sortByOpen, setSortByOpen] = taxonomyCtx.slideOverSort;

  const [selectedSortOption, setSelectedSortOption] = taxonomyCtx.sortByState;

  useEffect(() => {
    const sortValue = localStorage.getItem('sortValue') as string;

    if (!sortValue || sortValue === '') return;

    const { label, value } = JSON.parse(sortValue as string);

    if (label && value) {
      setSelectedSortOption({
        label,
        value,
      });

      onSortChange({ target: { value } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterByClicked = () => {
    setFilterOpen(!filterOpen);
  };

  const handleSortByClicked = () => {
    setSortByOpen(!sortByOpen);
  };

  const applyFilterClicked = () => {
    setFilterOpen(false);
    applyFilter();
  };

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

  /**
   * Reset props on url slug change
   */
  useEffect(() => {
    router.events.on('routeChangeComplete', resetFilterAction);

    return () => {
      router.events.off('routeChangeComplete', resetFilterAction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

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

  const renderProductGrid = () => {
    const { layout } = shop as Shop;
    return (
      <>
        {layout?.productFilters == '1' ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <form className="hidden lg:block">
              <SidebarFilter
                applyFilterClicked={applyFilterClicked}
                resetFilterAction={resetFilterAction}
              />

              <button
                className="hidden mt-3 w-full border border-black mb-2 p-2.5"
                onClick={applyFilterClicked}
              >
                APPLY
              </button>
              <button
                onClick={resetFilterAction}
                className="w-full border border-black mb-2 p-2.5"
              >
                RESET
              </button>
            </form>
            <div className="mt-4 lg:col-span-3">
              <div className="mb-4 w-full flex justify-between items-center">
                <FilterToggleButton handleFilterByClicked={handleFilterByClicked} />
                <ResultCount
                  pageNo={pageNo}
                  productCount={productCount}
                />
                <SortByButton
                  setSortByOpen={setSortByOpen}
                  selectedSortOption={selectedSortOption}
                />
              </div>
              {props.children}
            </div>
          </div>
        ) : (
          <div className="product-grid-container">{props.children}</div>
        )}
      </>
    );
  };

  const renderFilterBy = () => {
    return (
      <div className="group/filter">
        {layout.productFilters == '1' ? (
          <h3 className="flex-1 text-[#2D3648] text-lg font-semibold pb-2">FILTER BY PRODUCTS</h3>
        ) : (
          <button
            onClick={handleFilterByClicked}
            className="button-filter-by flex bg-[#FAF6F2] group-hover/filter:bg-[#2563EB] text-[#111111] group-hover/filter:text-white border border-[#111111] group-hover/filter:border-[#2563EB] rounded-[4px] py-3.5 px-4 text-xs font-normal leading-6 justify-center items-center gap-2.5 h-10 uppercase"
          >
            Filter{' '}
            <span className="hidden group-hover/filter:block">
              <FilterIcon fillColor="#ffffff" />
            </span>
            <span className="block group-hover/filter:hidden">
              <FilterIcon fillColor="#111111" />
            </span>
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <Modal
        open={sortByOpen}
        setOpen={setSortByOpen}
        name="SORT BY"
        position="right"
      >
        <SortByOptions
          state={taxonomyCtx.sortByState}
          options={TSTaxonomy.sortOptions(currentCurrency)}
          onSortChange={onSortChange}
        />
      </Modal>
      <div className="product-archive-filter-mobile">
        <MobileFilterSortButtons
          handleFilterByClicked={handleFilterByClicked}
          handleSortByClicked={handleSortByClicked}
        />
        <MobileActiveFilters
          resetFilterAction={resetFilterAction}
          isFilterSet={isFilterSet}
        />
      </div>

      <div>
        <Modal
          open={filterOpen}
          setOpen={setFilterOpen}
          position="left"
        >
          <SidebarFilter
            applyFilterClicked={applyFilterClicked}
            resetFilterAction={resetFilterAction}
          />
        </Modal>
        {/* <FilterToggleButton handleFilterByClicked={handleFilterByClicked} /> */}
        {/* <aside className="product-archive-filter-desktop">
          <SidebarFilter
            applyFilterClicked={applyFilterClicked}
            resetFilterAction={resetFilterAction}
          />
        </aside> */}
        {props.children}
      </div>
    </>
  );
};
