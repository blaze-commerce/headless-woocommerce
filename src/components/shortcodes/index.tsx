import dynamic from 'next/dynamic';

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

/**
 * Below are the blocks we currently support that is parseable by our codebase
 */
export const shortcodes = {
  bc_review_section: DynamicProductReview,
  select_car_finder: DynamicCarFinder,
  aelia_currency_selector_widget: DynamicCurrencySwitcher,
  business_reviews_bundle: DynamicBusinessReviewsBundle,
};

// Define type alias for block names
export type ShortcodeName = keyof typeof shortcodes;
