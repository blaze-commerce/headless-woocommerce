import { Product } from '@src/models/product';
import { ITSBreadcrumbs } from '@src/lib/typesense/types';

export type ProductStocStatuses = 'instock' | 'outofstock';

// We should append all supported currencies here
export type ProductPrice = Record<string, number>;

export type ProductTaxonomy = {
  name: string;
  url: string;
  type: string;
  breadcrumbs?: ITSBreadcrumbs[];
  parentTerm?: string;
  slug?: string;
  nameAndType?: string;
  childAndParentTerm?: string;
};

export type Image = {
  altText?: string;
  src: string;
  title?: string;
  id?: string;
  wpSrc?: string;
};

export type ProductTabs = {
  content: string;
  title: string;
  isOpen: boolean;
  location: '' | 'default' | 'side';
};

export type ProductDialog = {
  content: string;
  title: string;
  icon: string;
  link?: string;
};

export type ProductDialogs = ProductDialog[];

export type AttributeOptions = {
  label: string;
  name: string;
  slug: string;
  term_id: string;
  value: string;
};

export type Attribute = {
  name: string;
  label: string;
  options: AttributeOptions[];
};

export type Attributes = Attribute[];

export type Variation = {
  attributes: { [key: string]: string };
  image?: Image;
  thumbnail?: Image;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metaData?: Record<string, any>;
  onSale: boolean;
  price: ProductPrice;
  regularPrice: ProductPrice;
  salePrice: ProductPrice;
  sku: string;
  stockQuantity: number;
  stockStatus: string;
  variationId: number;
  backorder: string;
};

export type Variations = Variation[];

export type Variant = {
  label: string;
  value: string;
};

export type ProductRecommendations = Partial<Product>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ProductMetaData = Record<string, any>;

export type ProductBundle = {
  products: {
    product: {
      id: number;
      stockStatus: ProductStocStatuses;
      bundleId: number;
    };
    settings: {
      defaultQuantity: number;
      description: string;
      discountPercent: number;
      hideThumbnail: boolean;
      maxQuantity: number;
      minQuantity: number;
      optional: boolean;
      overrideTitle: boolean;
      priceVisible: boolean;
      pricedIndividually: boolean;
      productVisible: boolean;
      shippedIndividually: boolean;
      title: string;
    };
  }[];
  settings: {
    editInCart: boolean;
    formLocation: string;
    layout: string;
    maxBundleSize: number | null;
    minBundleSize: number | null;
  };
  minPrice: { [key: string]: number };
  maxPrice: { [key: string]: number };
};

export type ObjectData = { [key: string]: string | number | boolean };
