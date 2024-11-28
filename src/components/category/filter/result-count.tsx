import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { FilterV2Icon } from '@src/components/svg/filter-v2';
import { useSiteContext } from '@src/context/site-context';
import { useTaxonomyContext } from '@src/context/taxonomy-context';
import { Settings } from '@src/models/settings';

type Props = {
  productCount: number;
  pageNo: number;
  handleFilterByClicked: () => void;
};

export const ResultCount = (props: Props) => {
  const { settings } = useSiteContext();
  const taxonomyCtx = useTaxonomyContext();
  const { asPath } = useRouter();
  const pathIndex = asPath.split('/');
  const { shop } = settings as Settings;
  const { productCount, pageNo, handleFilterByClicked } = props;

  const [, , selectedPriceFilter] = taxonomyCtx.priceFilter;
  const [, , selectedBrandsFilter] = taxonomyCtx.brandsFilter;
  const [, , selectedSaleFilter] = taxonomyCtx.saleFilter;
  const [, , selectedNewFilter] = taxonomyCtx.newFilter;
  const [, , selectedCategoryFilter] = taxonomyCtx.categoryFilter;
  const [, , selectedAvailabilityFilter] = taxonomyCtx.availabilityFilter;
  const [, , selectedRefinedSelection] = taxonomyCtx.refinedSelection;

  const [isSortByChanged] = taxonomyCtx.onSortByChanged;

  const isFilterSet =
    !isEmpty(selectedPriceFilter) ||
    !isEmpty(selectedBrandsFilter) ||
    !isEmpty(selectedSaleFilter) ||
    !isEmpty(selectedNewFilter) ||
    !isEmpty(selectedCategoryFilter) ||
    !isEmpty(selectedAvailabilityFilter) ||
    !isEmpty(selectedRefinedSelection);

  let loadedResult = pageNo * +(settings?.shop?.layout?.productCount as string);
  if (loadedResult > productCount) {
    loadedResult = productCount;
  }

  const resultCountStyle = {
    color: (shop?.layout?.resultCount?.color as string) ?? '#000000',
  };

  return (
    <>
      {(pathIndex[1] !== 'brand' || isFilterSet || isSortByChanged) && (
        <>
          <button
            className="filter-button"
            onClick={handleFilterByClicked}
          >
            Filter <FilterV2Icon />
          </button>
          <div
            className="result-count"
            style={resultCountStyle ? resultCountStyle : {}}
          >
            Items {loadedResult !== 0 && `1 - ${loadedResult} of ${productCount}`}
          </div>
        </>
      )}
    </>
  );
};
