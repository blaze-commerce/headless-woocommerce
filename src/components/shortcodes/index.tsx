import dynamic from 'next/dynamic';

import { ProductDialogs } from '@src/features/product/product-dialogs';
import { ProductInfoPopup } from '@src/features/product/info-popup';

const DynamicProductReview = dynamic(
  () => import('@src/components/shortcodes/product-review').then((mod) => mod.ProductReview),
  { ssr: false }
);

const DynamicCurrencySwitcher = dynamic(
  () => import('@src/features/currency-switcher').then((mod) => mod.CurrencySwitcher),
  { ssr: false }
);
const DynamicCarFinder = dynamic(
  () => import('@src/features/product-finder/car-finder').then((mod) => mod.CarFinder),
  { ssr: false }
);

const DynamicBusinessReviewsBundle = dynamic(
  () =>
    import('@src/features/product/reviews/business-reviews-bundle').then(
      (mod) => mod.BusinessReviewsBundle
    ),
  { ssr: false }
);

const FrequentlyBoughtTogether = dynamic(
  () =>
    import('@src/features/product/frequently-bougth-together').then(
      (mod) => mod.FrequentlyBoughtTogether
    ),
  { ssr: false }
);

const YouMayAlsoLike = dynamic(
  () => import('@src/features/product/you-may-also-like').then((mod) => mod.YouMayAlsoLike),
  { ssr: false }
);

const RecentlyViewed = dynamic(() =>
  import('@src/features/product/recently-viewed').then((mod) => mod.RecentlyViewed)
);

/**
 * Below are the blocks we currently support that is parseable by our codebase
 */
export const shortcodes = {
  bc_review_section: DynamicProductReview,
  select_car_finder: DynamicCarFinder,
  aelia_currency_selector_widget: DynamicCurrencySwitcher,
  business_reviews_bundle: DynamicBusinessReviewsBundle,
  you_may_also_like: YouMayAlsoLike,
  frequently_bought_together: FrequentlyBoughtTogether,
  recently_viewed_products: RecentlyViewed,
  blz_dialog: ProductDialogs,
  blz_popup: ProductInfoPopup,
};

// Define type alias for block names
export type ShortcodeName = keyof typeof shortcodes;
