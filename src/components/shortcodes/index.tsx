import { ProductDialogs } from '@src/features/product/product-dialogs';
import { ProductInfoPopup } from '@src/features/product/info-popup';
import { ProductReview } from '@src/components/shortcodes/product-review';
import { CurrencySwitcher } from '@src/features/currency-switcher';
import { CarFinder } from '@src/features/product-finder/car-finder';
import { BusinessReviewsBundle } from '@src/features/product/reviews/business-reviews-bundle';
import { FrequentlyBoughtTogether } from '@src/features/product/frequently-bougth-together';
import { YouMayAlsoLike } from '@src/features/product/you-may-also-like';
import { RecentlyViewed } from '@src/features/product/recently-viewed';
import { ShortcodeProductInstallment } from '@src/components/shortcodes/product-installment';
import { Wishlist } from '@src/components/shortcodes/wishlist';
import { ProductStockStatus as StockStatus } from '@src/features/product/product-stock-status';

/**
 * Below are the blocks we currently support that is parseable by our codebase
 */
export const shortcodes = {
  bc_review_section: ProductReview,
  select_car_finder: CarFinder,
  aelia_currency_selector_widget: CurrencySwitcher,
  business_reviews_bundle: BusinessReviewsBundle,
  you_may_also_like: YouMayAlsoLike,
  frequently_bought_together: FrequentlyBoughtTogether,
  recently_viewed_products: RecentlyViewed,
  blz_installment_info: ShortcodeProductInstallment,
  blz_dialog: ProductDialogs,
  blz_popup: ProductInfoPopup,
  ti_wishlistsview: Wishlist,
  blz_product_stock: StockStatus,
};

// Define type alias for block names
export type ShortcodeName = keyof typeof shortcodes;
