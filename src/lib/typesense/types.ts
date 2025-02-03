import { IFilterOptionData } from '@src/lib/types/taxonomy';
import { ProductTypesenseResponse } from '@src/models/product';
import { ReviewsContent, Percentage } from '@src/models/product/reviews';
import {
  ProductMetaData,
  ProductPrice,
  ProductRecommendations,
  Variations,
} from '@src/models/product/types';

export interface ITSImage {
  altText: string;
  src: string;
  title?: string;
}

export interface ITSAuthor {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
}

export interface ITSBreadcrumb {
  title: string;
  url?: string; // The `url` property is optional as not all items may have it
}

export interface ITSPage {
  id: string;
  name: string;
  permalink: string;
  thumbnail?: {
    altText: string;
    src: string;
    title: string;
  };
  seoFullHead: string;
  slug: string;
  type: string;
  updatedAt: number;
  createdAt: number;
  content: string;
  rawContent: string;
  author: ITSAuthor | null;
  template: string;
  breadcrumbs: ITSBreadcrumb[];
}

// To parse this data:
//
//   import { Convert, ITSProduct } from "./file";
//
//   const iTSProduct = Convert.toITSProduct(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
export interface ITSProductTaxonomy {
  name: string;
  nameAndType: string;
  slug: string;
  type: string;
  url: string;
  parentTerm: string;
  childAndParentTerm: string;
}

export interface ITSBreadCrumbTaxonomy {
  middleCrumb: ITSProductTaxonomy;
  secondaryCrumb: ITSProductTaxonomy;
}

export interface ITSProductTaxonomyData {
  taxData: ITSProductTaxonomy;
  taxSecondaryData: ITSProductTaxonomy;
}

export interface ITSProduct {
  addons?: string;
  categoryLinks?: string[];
  categoryNames?: string[];
  createdAt?: number;
  publishedAt?: number;
  description?: string;
  favouriteLinks?: string[];
  favouriteNames?: string[];
  galleryImages?: ITSImage[];
  id?: string;
  ingredients?: string;
  isFeatured?: boolean;
  name?: string;
  occassionLinks?: string[];
  occassionNames?: string[];
  onSale?: boolean;
  metaData?: ProductMetaData;
  permalink?: string;
  price: ProductPrice;
  productId?: string;
  regularPrice: ProductPrice;
  salePrice?: ProductPrice;
  productType?: string;
  seoFullHead?: string;
  shopByLinks?: string[];
  shopByNames?: string[];
  shortDescription?: string;
  sku?: string;
  slug?: string;
  stockQuantity?: number;
  stockStatus?: string;
  tagLinks?: [];
  tagNames?: [];
  thumbnail?: {
    altText: string;
    src: string;
    title: string;
  };
  totalSales?: number;
  typeLinks?: [];
  typeNames?: [];
  updatedAt?: number;
  store?: Store;
  stats?: Stats;
  reviews?: Reviews;
  ratings?: [];
  settings?: Settings;
  word?: string;
  products?: ProductElement[];
  write_review_link?: string;
  deliveryInformation?: string;
  taxonomies?: ITSProductTaxonomy[];
  crossSellProducts?: ProductRecommendations[];
  relatedProducts?: ProductRecommendations[];
  upsellProducts?: ProductRecommendations[];
  judgemeReviews?: Stats & Reviews;
  yotpoReviews?: Stats & Reviews;
  variations?: Variations;
}

export interface ProductElement {
  sku?: string;
  name?: string;
}

export interface Reviews {
  total?: number;
  per_page?: number;
  current_page?: number;
  last_page?: number;
  from?: number;
  to?: number;
  data?: Datum[];
  externalId?: number;
  content?: ReviewsContent[];
}

export interface Datum {
  votes?: null;
  flags?: null;
  title?: null;
  product_review_id?: number;
  review?: string;
  sku?: string;
  rating?: number;
  date_created?: Date;
  order_id?: string;
  reviewer?: Reviewer;
  replies?: Reply[];
  images?: [];
  ratings?: [];
  product?: DatumProduct;
  author?: Author;
  timeago?: string;
}

export interface Author {
  email?: string;
}

export interface DatumProduct {
  sku?: string;
  name?: string;
  description?: string;
  link?: string;
  image_url?: string;
  mpn?: string;
  brand?: string;
  category?: string;
  custom?: string;
}

export interface Reply {
  id?: number;
  product_review_id?: number;
  partner_id?: null;
  comments?: string;
  date_created?: Date;
  date_updated?: Date;
  recipient?: null;
  private?: number;
}

export interface Reviewer {
  first_name?: string;
  last_name?: string;
  verified_buyer?: string;
  address?: string;
  profile_picture?: string;
  gravatar?: string;
}

export interface Settings {
  write_review_button?: number;
  disable_product_seo_css?: number;
  show_product_review_titles?: number;
}

export interface Stats {
  average?: number;
  count?: number;
  percentage?: Percentage;
  product_score?: number;
  total_reviews?: number;
}

export interface Store {
  name?: string;
  logo?: string;
}
export interface ITSBreadcrumbs {
  permalink?: string;
  name?: string;
}

export type MetaData = {
  name: string;
  value: string;
};

export interface ITSTaxonomy {
  bannerText?: string;
  bannerThumbnail?: string;
  description?: string;
  id?: string;
  name?: string;
  parentTerm?: string;
  permalink?: string;
  slug?: string;
  taxonomy?: string;
  updatedAt?: number;
  seoFullHead?: string;
  type?: string;
  thumbnail?: ITSImage;
  breadcrumbs?: ITSBreadcrumbs[];
  metaData?: MetaData[];
}

export interface ITSTaxonomyProductQueryVars {
  taxonomySlug?: string;
  termSlug?: string;
  termIds?: number[];
  page?: number;
  perPage?: number;
  sortBy?: string;
  nameAndTypes?: string[];
  priceFilter?: string;
  appendProducts?: boolean;
  onSale?: string | null;
  isFeatured?: string | null;
  searchQuery?: string | null;
  childAndParentTerm?: string[];
  newThreshold?: string;
  categoryFilter?: string;
  stockStatus?: string;
  refinedSelection?: string;
  brandsFilter?: string;
  attributeFilter?: string[];
}

export interface ITSPaginationInfo {
  totalFound: number;
  totalPages: number;
  nextPage: number;
  previousPage: number;
  page: number;
  perPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ITSFilterOption {
  label: string;
  items: IFilterOptionData[];
}

export interface PriceRangeAmount {
  minValue: { [key: string]: number };
  maxValue: { [key: string]: number };
}
export interface ITSProductQueryResponse {
  products: ProductTypesenseResponse[];
  queryVars: ITSTaxonomyProductQueryVars;
  pageInfo: ITSPaginationInfo;
  taxonomyFilterOptions: IFilterOptionData[];
  priceFilter: ITSFilterOption | undefined;
  saleFilter: ITSFilterOption | undefined;
  newProductsFilter: ITSFilterOption | undefined;
  brandsFilter: IFilterOptionData[];
  availabilityFilter: ITSFilterOption | undefined;
  refinedSelectionOptions: IFilterOptionData[];
  attributeFilterOptions: IFilterOptionData[];
  priceRangeAmount: PriceRangeAmount;
}
