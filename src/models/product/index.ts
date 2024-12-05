import { find, isArray, isEmpty, map } from 'lodash';
import sanitizeHtml from 'sanitize-html';

import { Reviews, Stats } from '@models/product/reviews';
import type {
  Attribute,
  Attributes,
  Image,
  ImageAttributes,
  ProductMetaData,
  ProductPrice,
  ProductStocStatuses,
  ProductTabs,
  ProductTaxonomy,
  ProductBundleConfiguration,
  Variation,
  ProductAddons,
} from '@models/product/types';
import { AccordionItem } from '@src/components/accordion';
import { MAX_QUERY_LIMIT, WoolessTypesense } from '@src/lib/typesense';
import { GIFT_CARD_TYPE } from '@src/lib/constants/giftcards';
import { formatTextWithNewline } from '@src/lib/helpers/helper';
import { ProductElement, Settings, Store } from '@src/lib/typesense/types';
import {
  getProductTypesForDisplay,
  getVariations,
  transformToProduct,
  transformToProducts,
} from '@src/lib/typesense/product';
import { PRODUCT_TYPES } from '@src/lib/constants/product';
import { Store as TStoreSetting } from '@src/models/settings/store';
import { htmlParser } from '@src/lib/block/react-html-parser';
import { isImage } from '@src/lib/helpers/helper';

export type ProductBackorderStatus = 'yes' | 'no' | 'notify';

export type DefaultAttribute = {
  [key: string]: string;
};

export type ProductTypesenseResponse = Partial<{
  additionalTabs: ProductTabs[];
  addons?: ProductAddons[];
  attributes: Attributes;
  backorder: ProductBackorderStatus;
  bundle?: ProductBundleConfiguration;
  categoryLinks: string[];
  categoryNames: string[];
  createdAt: number;
  crossSellProducts: number[];
  relatedProducts: number[];
  upsellProducts: number[];
  defaultAttributes: DefaultAttribute;
  deliveryInformation: string;
  description: string;
  favouriteLinks: string[];
  favouriteNames: string[];
  galleryImages: Image[];
  id: string;
  ingredients: string;
  isFeatured: boolean;
  judgemeReviews?: Stats & Reviews;
  metaData: ProductMetaData;
  name: string;
  occassionLinks: string[];
  occassionNames: string[];
  onSale: boolean;
  permalink: string;
  price: ProductPrice;
  productId: number;
  products: ProductElement[];
  productType: string;
  publishedAt: number;
  ratings: [];
  regularPrice: ProductPrice;
  reviews: Reviews;
  salePrice: ProductPrice;
  seoFullHead: string;
  settings: Settings;
  shopByLinks: string[];
  shopByNames: string[];
  shortDescription: string;
  sku: string;
  slug: string;
  stats: Stats;
  stockQuantity: number;
  stockStatus: ProductStocStatuses;
  store: Store;
  tagLinks: [];
  tagNames: [];
  taxonomies: ProductTaxonomy[];
  thumbnail: Image;
  totalSales: number;
  typeLinks: [];
  typeNames: [];
  updatedAt: number;
  variations: Product[];
  word: string;
  yotpoReviews?: Stats & Reviews;
}>;

type ProductQuery = Partial<{
  slug: string;
  productId: string;
}>;

export class Product {
  readonly additionalTabs?: ProductTabs[];
  readonly addons?: ProductAddons[];
  readonly attributes?: Attributes | { [key: string]: string };
  readonly defaultAttributes?: DefaultAttribute;
  readonly backorder?: ProductBackorderStatus;
  readonly bundle?: ProductBundleConfiguration;
  readonly categoryLinks?: string[];
  readonly categoryNames?: string[];
  readonly createdAt?: number;
  readonly crossSellProducts?: number[];
  readonly relatedProducts?: number[];
  readonly upsellProducts?: number[];
  readonly deliveryInformation?: string;
  readonly description?: string;
  readonly favouriteLinks?: string[];
  readonly favouriteNames?: string[];
  readonly galleryImages?: Image[];
  readonly id?: string;
  readonly ingredients?: string;
  readonly isFeatured?: boolean;
  readonly judgemeReviews?: Stats & Reviews;
  readonly metaData?: ProductMetaData;
  readonly name?: string;
  readonly occassionLinks?: string[];
  readonly occassionNames?: string[];
  readonly onSale?: boolean;
  readonly permalink?: string;
  readonly price?: ProductPrice;
  readonly productId?: number;
  readonly products?: ProductElement[];
  readonly productType?: string;
  readonly publishedAt?: number;
  readonly ratings?: [];
  readonly regularPrice?: ProductPrice;
  readonly reviews?: Reviews;
  readonly salePrice?: ProductPrice;
  readonly seoFullHead?: string;
  readonly settings?: Settings;
  readonly shopByLinks?: string[];
  readonly shopByNames?: string[];
  readonly shortDescription?: string;
  readonly sku?: string;
  readonly slug?: string;
  readonly stats?: Stats;
  readonly stockQuantity?: number;
  readonly stockStatus?: ProductStocStatuses;
  readonly store?: Store;
  readonly tagLinks?: [];
  readonly tagNames?: [];
  readonly taxonomies?: ProductTaxonomy[];
  readonly thumbnail?: Image;
  readonly totalSales?: number;
  readonly typeLinks?: [];
  readonly typeNames?: [];
  readonly updatedAt?: number;
  readonly variations?: Product[];
  readonly word?: string;
  readonly yotpoReviews?: Stats & Reviews;

  constructor(props: ProductTypesenseResponse) {
    this.additionalTabs = isEmpty(props.additionalTabs) ? [] : props.additionalTabs;
    this.addons = props?.addons;
    this.backorder = props.backorder;
    this.bundle = props.bundle;
    this.categoryLinks = props.categoryLinks;
    this.categoryNames = props.categoryNames;
    this.createdAt = props.createdAt;
    this.crossSellProducts = props.crossSellProducts || [];
    this.relatedProducts = props.relatedProducts || [];
    this.upsellProducts = props.upsellProducts || [];
    this.defaultAttributes = props.defaultAttributes;
    this.deliveryInformation = props.deliveryInformation;
    this.description = props.description || '';
    this.favouriteLinks = props.favouriteLinks;
    this.favouriteNames = props.favouriteNames;
    this.galleryImages = [];
    this.id = props.id;
    this.ingredients = props.ingredients;
    this.isFeatured = props.isFeatured;
    this.judgemeReviews = props.judgemeReviews;
    this.metaData = props.metaData;
    this.name = props.name;
    this.occassionLinks = props.occassionLinks;
    this.occassionNames = props.occassionNames;
    this.onSale = props.onSale;
    this.permalink = props.permalink;
    this.price = props.price;
    this.productId = props.productId;
    this.products = props.products;
    this.productType = props.productType;
    this.publishedAt = props.publishedAt;
    this.ratings = props.ratings;
    this.regularPrice = props.regularPrice;
    this.reviews = props.reviews;
    this.salePrice = props.salePrice;
    this.seoFullHead = props.seoFullHead;
    this.settings = props.settings;
    this.shopByLinks = props.shopByLinks;
    this.shopByNames = props.shopByNames;
    this.shortDescription = props.shortDescription;
    this.sku = props.sku;
    this.slug = props.slug;
    this.stats = props.stats;
    this.stockQuantity = props.stockQuantity;
    this.stockStatus = props.stockStatus;
    this.store = props.store;
    this.tagLinks = props.tagLinks;
    this.tagNames = props.tagNames;
    this.taxonomies = props.taxonomies;
    this.thumbnail = props.thumbnail;
    this.totalSales = props.totalSales;
    this.typeLinks = props.typeLinks;
    this.typeNames = props.typeNames;
    this.updatedAt = props.updatedAt;
    this.variations = props.variations;
    this.word = props.word;
    this.yotpoReviews = props.yotpoReviews;

    if (props.thumbnail) {
      this.galleryImages.push(props.thumbnail);
    }

    if (props.galleryImages) {
      this.galleryImages.push(...props.galleryImages);
    }

    this.attributes = props.attributes;
    this.bundle = props.bundle;
  }

  getAvailableAttributes() {
    const availableAttributes: Attributes = [];
    if (this.variations) {
      const variationAttributes = this.variations.reduce((accumulator, variation) => {
        if (variation.purchasable) {
          const attributes = JSON.parse(JSON.stringify(variation.attributes));
          accumulator.push(attributes);
        }
        return accumulator;
      }, [] as Variation['attributes'][]);

      if (!isArray(this.attributes)) {
        return [];
      }

      return this.attributes?.map((attribute) => {
        const attributeSlugs = variationAttributes.map((attr) => attr[attribute.name]);
        const filteredOptions = attribute.options.filter((option) =>
          attributeSlugs.includes(option.slug)
        );
        return {
          ...attribute,
          options: filteredOptions,
        };
      });
    }

    return availableAttributes;
  }

  static buildFromResponse(props: ProductTypesenseResponse) {
    if (props.productType && 'variable' === props.productType && props.variations) {
      const variations: Product[] = props.variations.map((variation) =>
        Product.buildFromResponse(variation as ProductTypesenseResponse)
      );

      return new Product({
        ...props,
        variations: variations,
      });
    }
    return new Product(props);
  }

  static buildFromResponseArray(products: ProductTypesenseResponse[] = []) {
    return map(products, Product.buildFromResponse);
  }

  static async findRaw({ slug }: ProductQuery): Promise<ProductTypesenseResponse[] | undefined> {
    const response = await WoolessTypesense.product
      .documents()
      .search({ q: slug as string, query_by: 'slug' });
    return response.hits?.map((hit) => hit.document);
  }

  static async findAll(
    { page = 1 }: { page?: number } = {},
    initialData: ProductTypesenseResponse[] = []
  ): Promise<ProductTypesenseResponse[]> {
    const productTypes = PRODUCT_TYPES.filter((productType) => productType != 'variation');
    const response = await WoolessTypesense.product.documents().search({
      q: '*' as string,
      query_by: 'name',
      filter_by: `status:=[publish] && productType:=[\`${productTypes.join('`,`')}\`]`,
      page,
      per_page: MAX_QUERY_LIMIT,
    });
    // eslint-disable-next-line no-console
    console.log(
      `Collected ${response.page * (response.hits?.length || 0)}/${
        response.out_of
      } product data in ${response.search_time_ms}ms`
    );

    if (response.hits?.length == MAX_QUERY_LIMIT) {
      return await Product.findAll({ page: response.page + 1 }, [
        ...initialData,
        ...(response.hits?.map((hit) => hit.document) || []),
      ]);
    }
    return [...initialData, ...(response.hits?.map((hit) => hit.document) || [])];
  }

  static async findMultipleBy(
    query: string,
    data: string[] | number[]
  ): Promise<ProductTypesenseResponse[] | undefined> {
    const filterBy = `${query}:${JSON.stringify(data)}`;

    const response = await WoolessTypesense.product.documents().search({
      q: '*' as string,
      query_by: query,
      per_page: MAX_QUERY_LIMIT,
      filter_by: filterBy,
    });

    return transformToProducts(response) || [];
  }

  static async findOneRaw({ slug }: ProductQuery): Promise<ProductTypesenseResponse> {
    const productTypeArgs = getProductTypesForDisplay().join('`,`');
    const searchArgs = {
      q: '*',
      facet_by: 'slug,status,productType',
      query_by: 'slug,status,productType',
      filter_by: `slug:=[\`${slug}\`] && status:=[\`publish\`] && productType:=[\`${productTypeArgs}\`]`,
    };

    const response = await WoolessTypesense.product.documents().search(searchArgs);

    const products = await transformToProducts(response);
    return !isEmpty(products[0]) ? products[0] : {};
  }

  get middleCrumb() {
    return find(this.taxonomies, ['type', 'occassion']);
  }

  get categoryList() {
    return this.taxonomies?.map((tax) => tax.name).join(', ');
  }

  get categories() {
    return this.taxonomies?.filter((tax) => tax.type === 'product_cat');
  }

  get isNew() {
    // TODO: add logic for new
    return false;
  }

  get isOutOfStock() {
    if (this.productType === 'variable') {
      return this.stockStatus === 'outofstock';
    }

    return (
      (this.stockQuantity == null || this.stockQuantity < 1) && this.stockStatus === 'outofstock'
    );
  }

  get maxQuantity() {
    if ((this.stockQuantity == null || this.stockQuantity < 1) && this.stockStatus !== 'outofstock')
      return 100;

    return this.stockQuantity;
  }

  get purchasable() {
    if (this.productType === 'variable') {
      if (!this.isOutOfStock) {
        return true;
      }

      return false;
    }

    if (!this.isOutOfStock) {
      return true;
    }

    if (this.isBackorder) {
      return true;
    }

    return false;
  }

  get isNotifyBackorder() {
    return 'notify' === this.backorder && this.isOutOfStock;
  }

  get isAllowedBackorder() {
    return 'yes' === this.backorder && this.isOutOfStock;
  }

  get isBackorder() {
    return this.isNotifyBackorder || this.isAllowedBackorder;
  }

  get tabs(): AccordionItem[] {
    const returnedTabs = [
      {
        title: 'Description',
        content: htmlParser(
          formatTextWithNewline(this.description || this?.shortDescription || '')
        ),
        isOpen: true,
        location: '',
      },
    ];

    this.additionalTabs?.forEach((tab) => {
      returnedTabs.push({
        title: tab.title,
        content: htmlParser(sanitizeHtml(tab.content)),
        isOpen: Boolean(tab.isOpen),
        location: tab.location,
      });
    });

    return returnedTabs;
  }

  get isSimple() {
    return this.productType === 'simple';
  }

  get hasVariations() {
    return this.productType === 'variable';
  }

  get hasBundle() {
    return this.productType === 'bundle';
  }

  get isGiftCard() {
    return this.productType === GIFT_CARD_TYPE;
  }

  currencyPrice(currency: string) {
    return this.price && this.price[currency] ? this.price[currency] : 0;
  }

  get variantMinPrice() {
    return this.variations?.reduce<ProductPrice>((carry, currentValue) => {
      for (const key in currentValue.price) {
        const price = currentValue.price[key];

        if (!Object.prototype.hasOwnProperty.call(carry, key)) {
          carry[key] = price;
          continue;
        }

        if (price && (carry[key] as number) > price) {
          carry[key] = price;
        }
      }

      return carry;
    }, {});
  }

  get variantMinPriceWithTax() {
    return this.variations?.reduce<ProductPrice>((carry, currentValue) => {
      const { priceWithTax } = currentValue?.metaData || {};
      for (const key in priceWithTax) {
        const price = priceWithTax[key];

        if (!Object.prototype.hasOwnProperty.call(carry, key)) {
          carry[key] = price;
          continue;
        }

        if (price && (carry[key] as number) > price) {
          carry[key] = price;
        }
      }

      return carry;
    }, {});
  }

  get variantMaxPrice() {
    return this.variations?.reduce<ProductPrice>((carry, currentValue) => {
      for (const key in currentValue.price) {
        const price = currentValue.price[key];

        if (!Object.prototype.hasOwnProperty.call(carry, key)) {
          carry[key] = price;
          continue;
        }

        if (price && (carry[key] as number) < price) {
          carry[key] = price;
        }
      }

      return carry;
    }, {});
  }

  get variantMaxPriceWithTax() {
    return this.variations?.reduce<ProductPrice>((carry, currentValue) => {
      const { priceWithTax } = currentValue?.metaData || {};
      for (const key in priceWithTax) {
        const price = priceWithTax[key];

        if (!Object.prototype.hasOwnProperty.call(carry, key)) {
          carry[key] = price;
          continue;
        }

        if (price && (carry[key] as number) < price) {
          carry[key] = price;
        }
      }

      return carry;
    }, {});
  }

  get variantImageSrc() {
    return this.variations?.map((variation) => {
      return { ...variation.attributes, ...variation.thumbnail };
    });
  }

  hasSameMinMaxPrice(currency: string) {
    if (!this.variantMinPrice || !this.variantMaxPrice) return true;

    return this.variantMinPrice[currency] === this.variantMaxPrice[currency];
  }

  get requiredAttributes() {
    if (!isArray(this.attributes)) {
      return [];
    }

    return this.attributes?.map((attribute) => attribute.name);
  }

  get isOnSale() {
    return this.onSale && !!this.salePrice;
  }

  get isComposite() {
    return this.productType === 'composite';
  }

  get getBundlePrice() {
    return this.bundle?.minPrice ?? this.price;
  }

  bundleHasSameMinMaxPrice(currency: string) {
    if (!this.bundle) return true;

    return this.bundle.minPrice[currency] === this.bundle.maxPrice[currency];
  }

  isFree(currency: string) {
    if (this.productType === 'bundle') {
      return typeof this.getBundlePrice === 'undefined' || this.getBundlePrice[currency] === 0;
    }
    if (!this.price) return true;

    return this.price[currency] === 0;
  }

  hasAddons() {
    return this.addons && this.addons.length > 0;
  }

  get bundleHasPricedIndividually() {
    // find in bundle.products[].settings if priceIndividually is true
    // return true if found
    if (this.productType !== 'bundle') {
      return false;
    }

    const productWithPricedIndividually = this.bundle?.products?.filter(
      (product) => product.settings.pricedIndividually
    );

    if (productWithPricedIndividually && productWithPricedIndividually.length > 0) return true;

    return false;
  }

  get shouldDisplaySelectOptionsText() {
    if (this.productType === 'variable') {
      return true;
    }

    if (this.productType === 'bundle') {
      return this.bundleHasPricedIndividually;
    }

    return false;
  }

  get variableImages(): null | ImageAttributes {
    if (this.productType !== 'variable') return null;

    if (!this?.variations || this?.variations?.length === 0) return null;

    const imageAttribute =
      this.getAvailableAttributes().find((attribute) => attribute.type === 'image') || null;

    if (!imageAttribute) return null;

    const attr = imageAttribute as Attribute;
    const slug = attr.slug;

    const images: ImageAttributes = {};

    this.variations.forEach((variation) => {
      if (variation.attributes) {
        const key = String(
          (variation.attributes as { [key: string]: string })[`attribute_${slug}`]
        );
        if (!images[key] && variation.thumbnail) {
          images[key] = variation.thumbnail;
        }
      }
    });

    return images;
  }

  hasVariableImages(): boolean {
    if (!this.variableImages) return false;

    return Object.keys(this.variableImages).length > 1;
  }

  get mainImage(): Image {
    if (this.productType !== 'variable') {
      return this.thumbnail as Image;
    }

    const imageVariants = this.variableImages;

    if (!imageVariants) {
      return this.thumbnail as Image;
    }

    const keys = Object.keys(imageVariants);

    if (keys.length === 0) {
      return this.thumbnail as Image;
    }

    return imageVariants[keys[0]] as Image;
  }

  get secondaryImage(): Image | undefined {
    if (this.productType !== 'variable') {
      const mainImage = this.mainImage;
      const galleryImages = this.galleryImages;

      if (typeof galleryImages === 'undefined' || isEmpty(galleryImages[0])) {
        return undefined;
      }

      return isImage(galleryImages, mainImage?.src);
    }
  }
}
