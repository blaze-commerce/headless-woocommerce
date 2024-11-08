import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { ResultCount } from '@src/components/category/filter/result-count';
import { FilterOptionBlocks } from '@components/filter-option-blocks';
import { ActiveFilters } from '@src/components/category/filter/active-filters';
import { Modal } from '@src/components/category/filter/modal';
import { SortByOptions } from '@src/components/category/filter/sort-by-options';

import { PriceRangeSlider } from '@src/features/product/range/price-range-slider';
import { PriceRangeFilter } from '@src/components/category/filter/price-range';

import { useSiteContext } from '@src/context/site-context';
import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { Settings } from '@src/models/settings';
import { Shop } from '@src/models/settings/shop';
import TSTaxonomy from '@src/lib/typesense/taxonomy';
import { cn } from '@src/lib/helpers/helper';
import { useRouter } from 'next/router';
import { FilterIcon } from '@src/components/svg/filter';

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
  const { shop, store } = settings as Settings;
  const router = useRouter();

  const [filterOpen, setFilterOpen] = taxonomyCtx.slideOverFilter;
  const [sortByOpen, setSortByOpen] = taxonomyCtx.slideOverSort;

  const [selectedSortOption] = taxonomyCtx.sortByState;

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

  const renderSortByButton = () => {
    return (
      <div className="group/sortby">
        <button
          onClick={() => {
            setSortByOpen((prev) => !prev);
          }}
          className="button-sort-by hidden lg:flex bg-[#FAF6F2] group-hover/sortby:bg-[#2563EB] text-[#111111] group-hover/sortby:text-white border border-[#111111] group-hover/sortby:border-[#2563EB] rounded-[4px] py-3.5 px-4 text-xs font-normal leading-6 justify-center items-center gap-2.5 h-10 uppercase "
        >
          {selectedSortOption?.label || 'Sort by'}
        </button>
      </div>
    );
  };

  const renderProductGrid = () => {
    const { layout } = shop as Shop;
    return (
      <>
        {layout?.productFilters == '1' ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <form className="hidden lg:block">
              <FilterOptionBlocks
                blocks={taxonomyCtx.filterOptionContent}
                baseCountry={currentCountry}
              />

              <div className="w-full border-b border-brand-second-gray mb-4 pb-4">
                <PriceRangeSlider
                  disclosureProp={taxonomyCtx.priceFilter}
                  min={Math.trunc(
                    taxonomyCtx?.tsFetchedData?.priceRangeAmount?.minValue?.[
                      currentCurrency
                    ] as number
                  )}
                  max={Math.trunc(
                    taxonomyCtx?.tsFetchedData?.priceRangeAmount?.maxValue?.[
                      currentCurrency
                    ] as number
                  )}
                />
              </div>

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
                <ResultCount
                  pageNo={pageNo}
                  productCount={productCount}
                />
                {renderSortByButton()}
              </div>
              {props.children}
            </div>
          </div>
        ) : (
          <div className="mt-4 lg:col-span-3">{props.children}</div>
        )}
      </>
    );
  };

  const renderResultCount = () => {
    const { layout } = shop as Shop;
    return (
      <>
        {layout?.productFilters === '2' && (
          <div className="mt-4 flex items-center">
            <ResultCount
              pageNo={pageNo}
              productCount={productCount}
            />
          </div>
        )}
      </>
    );
  };

  const renderActiveFilters = () => {
    const { layout } = shop as Shop;
    return (
      <div className="flex-1 flex gap-x-6 items-center">
        <ActiveFilters {...layout?.activeFilters} />
        {isFilterSet && (
          <button
            onClick={resetFilterAction}
            className="flex items-center gap-1.5"
          >
            <span className="text-sm">CLEAR ALL</span>
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  };

  const renderFilterBy = () => {
    const { layout } = shop as Shop;
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

  const renderMobileFilterButtons = () => {
    return (
      <div
        className={cn('flex xl:hidden lg:hidden sticky py-3.5 border-y', {
          'mt-4': !store?.breadcrumbMobile?.enabled,
        })}
      >
        <button
          onClick={handleFilterByClicked}
          className="rounded-l-[4px] bg-[#FAF6F2] flex flex-1 uppercase  text-[#111111] group-hover/filter:text-white border border-[#111111] py-3 text-sm leading-3 font-normal justify-center items-center gap-3 border-r-0"
        >
          Filter <FilterIcon fillColor="#111111" />
        </button>
        <button
          onClick={handleSortByClicked}
          className="rounded-r-[4px] bg-[#FAF6F2] flex-1 uppercase  text-[#111111] group-hover/filter:text-white border border-[#111111] py-3 text-sm leading-3 font-normal"
        >
          Sort By:
        </button>
      </div>
    );
  };

  const renderMobileActiveFilters = () => {
    const { layout } = shop as Shop;
    return (
      <>
        {isFilterSet && (
          <div className="mt-3.5 flex items-center justify-between lg:hidden pb-3 border-b border-stone-200">
            <div>
              <ActiveFilters {...layout?.activeFilters} />
            </div>
            <div>
              <button onClick={resetFilterAction}>
                <span className="flex items-center gap-x-2.5 text-sm">
                  CLEAR ALL
                  <XMarkIcon className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>
        )}
      </>
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
      {renderMobileFilterButtons()}
      {renderMobileActiveFilters()}
      <div className="product-archive-container container">
        <aside className="product-archive-filter">
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
        </aside>
        <div>
          <div className="flex flex-row">
            {renderResultCount()}
            {renderActiveFilters()}
            {shop?.layout?.productFilters != '1' && renderSortByButton()}
          </div>
          {renderProductGrid()}
        </div>
      </div>
    </>
  );
};
