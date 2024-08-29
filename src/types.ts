import { Dictionary } from '@reduxjs/toolkit';

export type RegionalData = {
  countries: string[];
  baseCountry: string;
  currency: string;
  symbol: string;
  default: boolean;
};

export type CalculateShippingProductParam = {
  id: string;
  quantity: number;
  variation?: {
    id: string;
    [attribute: string]: string;
  };
};

export type ContentBlockMetaData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [country: string]: any;
};

export type MetaDataBlock = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [country: string]: any;
};

export type ContentBlock = {
  position: number;
  blockType: string;
  blockId: string;
  config?: Dictionary<string>;
  metaData: ContentBlockMetaData | ContentBlockMetaData[];
};

export type ShippingMethodRates = {
  cost: string;
  id: string;
  instanceId: string;
  label: string;
  methodId: string;
  minAmount: string;
};

export type CompositeProductComponentOptions = {
  databaseId: number;
  name: string;
  sku: string;
  slug: string;
  stockStatus: string;
};

export type CompositeProductComponent = {
  componentId: number;
  defaultOption: {
    databaseId: number;
  };
  minQuantity: number;
  maxQuantity: number;
  slug: string;
  title: string;
  queryOptions: CompositeProductComponentOptions[];
};

export type SelectedCompositeComponent = Dictionary<{
  componentId: number;
  productId: number;
  quantity: number;
}>;

export type User = Partial<{
  name: string;
  email: string;
  user_id: number;
}>;

export type ProductPathsParams<T = string[]> = {
  productSlug: T;
  categorySlug?: string;
  country?: string;
};

export type ProductPaths<T = string[]> = {
  params: ProductPathsParams<T>;
};

export type TaxonomyPathsParams = {
  taxonomyFrontendSlug: string;
  taxonomyItemSlug: string[];
  country?: string;
};

export type TaxonomyPaths = {
  params: TaxonomyPathsParams;
};

export type CountryPathsParams = {
  country?: string;
};

export type CountryPaths = {
  params: CountryPathsParams;
};
