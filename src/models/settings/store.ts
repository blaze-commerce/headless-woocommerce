import { Dictionary } from '@reduxjs/toolkit';
import { Day, Month, Year } from '@src/lib/types/date';

type AgeGate = Partial<{
  enabled: boolean;
}>;

type WishlistButton = Partial<{
  enabled: boolean;
  plugin: string;
  iconPosition: string;
}>;

type WooCommerceTaxSetup = Partial<{
  displayPricesIncludingTax: string;
  priceDisplaySuffix: string;
}>;

export type Store = {
  breadcrumb: string;
  breadcrumbMobile?: {
    enabled?: boolean;
  };
  containerWidth: {
    desktop: string;
  };
  date?: {
    day?: Day | string;
    format?: string;
    month?: Month | string;
    year?: Year | string;
  };
  favicon: string | null;
  gtmId?: string | null;
  reviewService: string;
  typesenseApiKey?: string | null;
  url?: string | null;
  woocommerceCalcTaxes?: boolean;
  woocommercePricesIncludeTax?: boolean;
  freeShippingThreshold?: Dictionary<string>;
  ageGate?: AgeGate;
  isCompositeEnabled?: boolean;
  isAfterpayEnabled?: boolean;
  isMulticurrency?: boolean;
  giftCardHeaderImage?: string;
  giftCardHeaderText?: string;
  giftCardFooterText?: string;
  wishlist?: WishlistButton;
  woocommerceTaxSetup?: WooCommerceTaxSetup;
  reviewsPlugin: string;
  review: {
    jugmeSettings?: { [key: string]: unknown };
    businessReviewsBundleSettings?: { [key: string]: unknown };
  };
};
