import React from 'react';

import { Product, ProductTypesenseResponse } from '@src/models/product';
import { SubCategory } from '@src/schemas/taxonomy-schema';
import { ContentBlock } from '@src/types';
import { IProduct } from '@src/lib/types/product';
import { ITSImage } from '../typesense/types';
import { ITSProductQueryResponse, ITSTaxonomy } from '../typesense/types';
import { ParsedBlock } from '@src/components/blocks';

export interface IFilterOptionData {
  label: string;
  count?: number;
  value: string;
  type?: string;
  slug?: string;
  parent?: string;
  order?: number;
  permalink?: string;
  parentSlug?: string;
  thumbnailSrc?: string;
  componentType?: 'color' | 'image' | 'button' | 'radio' | '';
  componentValue?: string;
}

export type IFilterOptionState = [
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  value: IFilterOptionData[] | IFilterOptionData | null | undefined,
  setValue: React.Dispatch<
    React.SetStateAction<IFilterOptionData[] | IFilterOptionData | null | undefined>
  >
];

export interface IFilterOptions {
  categoryPriceFilter: IFilterOptionData;
  categoryTypeFilter: IFilterOptionData;
  categoryOccasionFilter: IFilterOptionData;
  categoryShopByFilter: IFilterOptionData;
  categorySortOption: IFilterOptionData;
}

export interface ICategoryBanner {
  className?: string;
  sourceUrl: string;
  name: string;
  description?: string;
  subtitle?: string;
  style?: {
    [key: string]: string;
  };
}

export interface ICategoryItem {
  name: string;
  slug: string;
  img: string;
}

export interface IPaginationInfo {
  total: number;
  hasMore: boolean;
  hasPrevious?: boolean;
}

export type TProducts = Array<IProduct> | [];

export interface ITaxonomyFilterVars {
  priceFilter: IFilterOptionData | null;
  typeFilter: IFilterOptionData | null;
  ocassionFilter: IFilterOptionData | null;
  suitableForFilter: IFilterOptionData | null;
  sortByState: IFilterOptionData | null;
}

export interface ITaxonomyFilterProps {
  pageNumber: number;
  appendProducts: boolean;
  queryVars: IQueryVars;
  filterVars: ITaxonomyFilterVars;
}

export interface ITaxonomyContextProps {
  children?: React.ReactNode;
  defaultSortBy?: IFilterOptionData;
  taxonomyFilterOptions?: IFilterOptionData[];
  filterOptionContent?: ContentBlock[];
  tsFetchedData?: ITSProductQueryResponse;
  hero?: ICategoryBanner;
  subCategories?: SubCategory[];
}

export interface ITaxonomyContext {
  activeFilter: Array<String> | null;
  pageNo: [get: number, set: React.Dispatch<React.SetStateAction<number>>];
  concatProducts: [get: boolean, set: React.Dispatch<React.SetStateAction<boolean>>];
  pageInfo: [get: IPaginationInfo, set: React.Dispatch<React.SetStateAction<IPaginationInfo>>];
  priceFilter: [open: TProducts, setOpen: React.Dispatch<React.SetStateAction<TProducts>>];
}

export type IQueryVarStateData = [
  value: IFilterOptionData[] | IFilterOptionData | null | undefined,
  setValue: React.Dispatch<
    React.SetStateAction<IFilterOptionData[] | IFilterOptionData | null | undefined>
  >
];

export interface ITaxonomyContextValue {
  priceFilter: IFilterOptionState;
  brandsFilter: IFilterOptionState;
  saleFilter: IFilterOptionState;
  newFilter: IFilterOptionState;
  categoryFilter: IFilterOptionState;
  attributeFilter: IFilterOptionState;
  availabilityFilter: IFilterOptionState;
  refinedSelection: IFilterOptionState;
  sortByState: [
    selected: IFilterOptionData,
    setSelected: React.Dispatch<React.SetStateAction<IFilterOptionData>>
  ];
  slideOverFilter: [value: boolean, seValue: React.Dispatch<React.SetStateAction<boolean>>];
  slideOverSort: [value: boolean, seValue: React.Dispatch<React.SetStateAction<boolean>>];
  filterOptionContent?: ContentBlock[];
  tsFetchedData?: ITSProductQueryResponse;
  queryVarsCategoryData: IQueryVarStateData;
  queryVarsSaleData: IQueryVarStateData;
  queryVarsNewData: IQueryVarStateData;
  queryVarsBrandsData: IQueryVarStateData;
  queryVarsAvailabilityData: IQueryVarStateData;
  queryVarsRefinedSelectionData: IQueryVarStateData;
  previouslySelectedFilter: [value: string, setValue: React.Dispatch<React.SetStateAction<string>>];
  onSortByChanged: [
    isSortByChanged: boolean,
    setIsSortByChanged: React.Dispatch<React.SetStateAction<boolean>>
  ];
  hero?: ICategoryBanner;
  productsResults: [value: Product[], setValue: React.Dispatch<React.SetStateAction<Product[]>>];
  subCategories?: SubCategory[];
}

export interface ITaxonomyContentProps {
  fullHead?: string;
  hero: ICategoryBanner;
  categoryName: string;
  popular?: ProductTypesenseResponse[];
  taxonomyDescription?: string;
  showPerfectGiftHelper?: boolean;
  topDescription?: string;
  tsFetchedData: ITSProductQueryResponse;
  defaultSortBy: IFilterOptionData;
  taxonomyData: ITSTaxonomy;
  contents?: ContentBlock[];
  searchQuery?: string | null;
  subCategories?: SubCategory[];
  showBreadCrumbs?: boolean;
  showBanner?: boolean;
  pagedUrl?: boolean;
}

export interface IQueryVars {
  offSet: number;
  minPrice: number | null;
  maxPrice: number | null;
  orderByField: string;
  orderBySort: string;
  onSale: boolean | null;
}

export type TaxonomyPathsParams = {
  params: {
    taxonomyFrontendSlug: string;
    taxonomyItemSlug: string[];
  };
};

export type ProductPathsParams = {
  params: {
    productSlug: string[];
  };
};

export type TaxonomyPageParams = {
  name?: string;
  permalink?: string;
  thumbnail?: ITSImage;
};

export interface ITaxonomyMainPageProps {
  taxonomies?: TaxonomyPageParams[];
  hero: ICategoryBanner;
  fullHead: string;
}

export interface IPriceRangeValues {
  currency: string;
  price: number;
}
