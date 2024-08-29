import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUpdateEffect } from 'usehooks-ts';

import { useSiteContext } from '@src/context/site-context';
import createCtx from '@src/context/create-ctx';
import { Product } from '@src/models/product';
import {
  IFilterOptionData,
  ITaxonomyContextProps,
  ITaxonomyContextValue,
} from '@src/lib/types/taxonomy';
import TSTaxonomy from '@src/lib/typesense/taxonomy';

export const [useTaxonomyContext, TaxonomyCtxProvider] = createCtx<ITaxonomyContextValue>();

export const TaxonomyContext = (props: ITaxonomyContextProps) => {
  const { currentCountry, currentCurrency } = useSiteContext();
  const router = useRouter();
  const [priceFilterOpen, setPriceFilterOpen] = useState<boolean>(true);
  const [priceState, setPriceState] = useState<
    IFilterOptionData[] | IFilterOptionData | null | undefined
  >(null);

  const { defaultSortBy } = props;

  const [brandsFilterOpen, setBrandsFilterOpen] = useState<boolean>(false);
  const [brandsState, setBrandsState] = useState<
    IFilterOptionData[] | IFilterOptionData | null | undefined
  >(null);

  const [saleFilterOpen, setSaleFilterOpen] = useState<boolean>(false);
  const [saleState, setSaleState] = useState<
    IFilterOptionData[] | IFilterOptionData | null | undefined
  >(null);

  const [newFilterOpen, setNewFilterOpen] = useState<boolean>(false);
  const [newState, setNewState] = useState<
    IFilterOptionData[] | IFilterOptionData | null | undefined
  >(null);

  const [categoryFilterOpen, setCategoryFilterOpen] = useState<boolean>(false);
  const [categoryState, setCategoryState] = useState<
    IFilterOptionData[] | IFilterOptionData | null | undefined
  >(null);

  const [attributeFilterOpen, setAttributeFilterOpen] = useState<boolean>(false);
  const [attributeState, setAttributeState] = useState<
    IFilterOptionData[] | IFilterOptionData | null | undefined
  >([]);

  const [availabilityFilterOpen, setAvailabilityFilterOpen] = useState<boolean>(false);
  const [availabilityState, setAvailabilityState] = useState<
    IFilterOptionData[] | IFilterOptionData | null | undefined
  >(null);

  const [refinedSelectionOpen, setRefinedSelectionOpen] = useState<boolean>(false);
  const [refinedSelectionState, setRefinedSelectionState] = useState<
    IFilterOptionData[] | IFilterOptionData | null | undefined
  >(null);

  const [sortByState, setSortByState] = useState<IFilterOptionData>(
    defaultSortBy ? defaultSortBy : TSTaxonomy.sortOptions(currentCurrency)[0]
  );

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortByOpen, setSortByOpen] = useState(false);

  const [categoryQueryState, setCategoryQueryState] = useState<
    IFilterOptionData[] | IFilterOptionData | null | undefined
  >(null);
  const [saleQueryState, setSaleQueryState] = useState<
    IFilterOptionData[] | IFilterOptionData | null | undefined
  >(null);
  const [newQueryState, setNewQueryState] = useState<
    IFilterOptionData[] | IFilterOptionData | null | undefined
  >(null);
  const [brandsQueryState, setBrandsQueryState] = useState<
    IFilterOptionData[] | IFilterOptionData | null | undefined
  >(null);
  const [availabilityQueryState, setAvailabilityQueryState] = useState<
    IFilterOptionData[] | IFilterOptionData | null | undefined
  >(null);
  const [refinedSelectionQueryState, setRefinedSelectionQueryState] = useState<
    IFilterOptionData[] | IFilterOptionData | null | undefined
  >(null);
  const [previousSelectedFilterState, setPreviousSelectedFilterState] = useState<string>('');

  const [productsData, setProductsData] = useState<Product[]>(
    Product.buildFromResponseArray(props?.tsFetchedData?.products) ?? []
  );

  const [isSortByChanged, setIsSortByChanged] = useState(false);

  /**
   * Reset props on url slug change
   */
  useUpdateEffect(() => {
    setPriceState(null);
    setBrandsState(null);
    setSaleState(null);
    setNewState(null);
    setCategoryState(null);
    setAvailabilityState(null);
    setRefinedSelectionState(null);
    setIsSortByChanged(false);
    setProductsData(Product.buildFromResponseArray(props?.tsFetchedData?.products) ?? []);
  }, [router.asPath, currentCountry]);

  return (
    <TaxonomyCtxProvider
      value={{
        priceFilter: [priceFilterOpen, setPriceFilterOpen, priceState, setPriceState],
        brandsFilter: [brandsFilterOpen, setBrandsFilterOpen, brandsState, setBrandsState],
        saleFilter: [saleFilterOpen, setSaleFilterOpen, saleState, setSaleState],
        newFilter: [newFilterOpen, setNewFilterOpen, newState, setNewState],
        categoryFilter: [
          categoryFilterOpen,
          setCategoryFilterOpen,
          categoryState,
          setCategoryState,
        ],
        attributeFilter: [
          attributeFilterOpen,
          setAttributeFilterOpen,
          attributeState,
          setAttributeState,
        ],
        availabilityFilter: [
          availabilityFilterOpen,
          setAvailabilityFilterOpen,
          availabilityState,
          setAvailabilityState,
        ],
        refinedSelection: [
          refinedSelectionOpen,
          setRefinedSelectionOpen,
          refinedSelectionState,
          setRefinedSelectionState,
        ],
        sortByState: [sortByState, setSortByState],
        slideOverFilter: [filterOpen, setFilterOpen],
        slideOverSort: [sortByOpen, setSortByOpen],
        filterOptionContent: props.filterOptionContent,
        tsFetchedData: props.tsFetchedData,
        queryVarsCategoryData: [categoryQueryState, setCategoryQueryState],
        queryVarsSaleData: [saleQueryState, setSaleQueryState],
        queryVarsNewData: [newQueryState, setNewQueryState],
        queryVarsBrandsData: [brandsQueryState, setBrandsQueryState],
        queryVarsAvailabilityData: [availabilityQueryState, setAvailabilityQueryState],
        queryVarsRefinedSelectionData: [refinedSelectionQueryState, setRefinedSelectionQueryState],
        previouslySelectedFilter: [previousSelectedFilterState, setPreviousSelectedFilterState],
        productsResults: [productsData, setProductsData],
        onSortByChanged: [isSortByChanged, setIsSortByChanged],
        hero: props.hero,
        subCategories: props.subCategories,
      }}
    >
      {props.children}
    </TaxonomyCtxProvider>
  );
};
