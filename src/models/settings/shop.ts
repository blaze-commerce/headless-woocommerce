export type ResultCount = {
  color?: string;
};

export type ActiveFilters = {
  backgroundColor?: string;
  color?: string;
  isRoundedBorder?: boolean;
};

export type PriceRangeSlider = {
  color?: string;
};

export type ProductCards = {
  availableOptionsCount?: string;
  badgeType?: number;
  buttonBgColor?: string;
  buttonHoverBackgroundColor?: string;
  buttonHoverIconColor?: string;
  buttonIconColor?: string;
  buttonStrokeColor?: string;
  buttonTransparent?: boolean;
  cardPadding?: number;
  cardShadow?: boolean;
  detailsAlignment?: string;
  discountLabelBackgroundColor?: string;
  discountPercent?: string;
  hasAddToCart?: boolean;
  hasBorders?: boolean;
  hasItemsLeftBadge?: boolean;
  imageLayout?: string;
  imageMaxWidth?: number;
  imagePadding?: number;
  itemsLeftBadgeColor?: string;
  newBadgeColor?: string;
  reviewCount?: string;
  saleBadgeColor?: string;
  showAvailableOptions?: boolean;
  showDiscountLabel?: boolean;
  showFromPrice?: boolean;
  showGST?: boolean;
  showRating?: boolean;
  showReviewCount?: boolean;
  titleFontSize?: string;
  wishlistButtonType?: number;
};

type Options = {
  outOfStockMessage?: string;
  showAddToCartButton?: boolean;
  showCategoryListing?: boolean;
};

type Layout = Partial<{
  activeFilters: ActiveFilters | null;
  banner: string;
  bannerMarginTop: string;
  priceRangeSlider: PriceRangeSlider | null;
  productColumns: string;
  productCards: ProductCards;
  productCount: string;
  productFilters: string;
  resultCount: ResultCount;
}>;

export type Shop = {
  layout: Layout;
  options: Options;
};
