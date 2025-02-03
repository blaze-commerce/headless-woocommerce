import { Product } from '@src/models/product';
import { ITSBreadcrumbs } from '@src/lib/typesense/types';
import { from } from '@apollo/client';

export type ObjectData = Record<string, unknown>;

export type ProductStocStatuses = 'instock' | 'outofstock';

// We should append all supported currencies here
export type ProductPrice = Record<string, number>;

export type ProductTaxonomy = {
  name: string;
  url: string;
  type: string;
  breadcrumbs?: ITSBreadcrumbs[];
  componentType?: string;
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
  slug: string;
  type?: string;
};

export type ImageAttributes = {
  [key: string]: Image;
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

export type ProductVariationBundle = {
  id: string;
  prefix: string;
  name: string;
  label: string;
  options: Record<
    number,
    {
      price: ProductPrice;
      description: string;
      label: string;
    }
  >;
};

export type ProductBundleSettings = {
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

export type ProductBundle = {
  product: {
    id: number;
    stockStatus: ProductStocStatuses;
    bundleId: number;
    image?: string;
  };
  settings: ProductBundleSettings;
  variations?: ProductVariationBundle[];
};

export type ProductBundleConfiguration = {
  products: ProductBundle[];
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

export type ProductAddonsPriceType = 'flat_fee' | 'quantity_based' | 'percentage_based';

export type ProductAddons = {
  id: string;
  name: string;
  title_format: 'label' | 'heading' | 'hide';
  description: string;
  description_enable: boolean;
  type:
    | 'multiple_choice'
    | 'checkbox'
    | 'custom_text'
    | 'custom_textarea'
    | 'file_upload'
    | 'custom_price'
    | 'input_multiplier'
    | 'heading'
    | 'datepicker';
  display: 'select' | 'radiobutton' | 'images';
  position: number;
  required: boolean;
  restrictions: number;
  restrictions_type:
    | 'any_text'
    | 'email'
    | 'only_letters'
    | 'only_numbers'
    | 'only_letters_numbers';
  adjust_price: boolean;
  price_type: ProductAddonsPriceType;
  price: string;
  min: number;
  max: number;
  placeholder?: string;
  options: {
    label: string;
    price: number;
    image: string;
    price_type: ProductAddonsPriceType;
  }[];
  classNames?: string[];
};

export type ProductDiscountRuleRange = {
  from: number;
  to: number;
  type: 'percentage' | 'fixed';
  value: number;
  label: string;
};

export type ProductDiscountRule = {
  message: {
    display: boolean;
    badgeBackgroundColor: string;
    badgeTextColor: string;
  };
  adjustment: {
    operator: 'product_cumulative' | 'percentage' | 'fixed'; // need to fix this later
    ranges: ProductDiscountRuleRange[];
  };
};
