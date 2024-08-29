type FontStyle = Partial<{
  dialogs: Partial<{
    color: string;
  }>;
  price: Partial<{
    weight: string;
  }>;
  recentlyViewedAndCrossSells: Partial<{
    weight: string;
    size: string;
  }>;
  regularPrice: Partial<{
    color: string;
  }>;
  salePrice: Partial<{
    color: string;
  }>;
  tabs: Partial<{
    weight: string;
    size: string;
  }>;
}>;

type WishlistLayout = Partial<{
  backgroundColor: string;
  iconColor: string;
  backgroundHoverColor: string;
  buttonType: string;
}>;

type ProductLayout = {
  descriptionTabLocation?: string;
  productTabs: string;
  recentlyViewedAndCrossSellAlignment?: string;
  stockIcon?: {
    enabled: boolean;
  };
  tabsCase?: string;
  titleCase?: string;
  wishlist?: WishlistLayout;
};

type ProductDetails = {
  emailWhenAvailable: boolean;
  newsletter: boolean;
  showStockInformation: boolean;
  showCategories: boolean;
  showBrand: boolean;
  brandTaxonomyIdentifier: string;
  showSku: boolean;
  stockDisplayFormat: string;
};

type ProductGallery = {
  showNewProductBadge: boolean;
  newProductBadgeThreshold: string;
  isGrid?: boolean;
  zoomType: string;
};

type AdditionalWarningMessage = Partial<{
  enabled: boolean;
}>;

type ShortDescription = Partial<{
  enabled: boolean;
}>;

type ProductFeatures = {
  averageRatingText?: {
    enabled?: boolean;
  };
  calculateShipping: CalculateShippingFeature;
  recentlyViewed: RecentlyViewedFeature;
  additionalWarningMessage?: AdditionalWarningMessage;
  shortDescription?: ShortDescription;
};

type CalculateShippingFeature = {
  enabled: boolean;
};

type RecentlyViewedFeature = {
  enabled: boolean;
  showNumProducts: number;
};

export type ProductSettings = {
  layout: ProductLayout;
  productDetails: ProductDetails;
  productGallery: ProductGallery;
  descriptionAfterContent?: string;
  features: ProductFeatures;
  font?: FontStyle;
};
