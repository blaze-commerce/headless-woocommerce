import { useSiteContext } from '@src/context/site-context';
import { useProductContext } from '@src/context/product-context';
import { ProductRating } from '@src/features/product/product-rating';
import { Settings } from '@src/models/settings';
import { Store } from '@src/models/settings/store';
import { Stats } from '@src/models/product/reviews';
import { cn } from '@src/lib/helpers/helper';

type TProp = {
  id?: string;
  className?: string;
};

export const ProductRatingCount = ({ id, className }: TProp) => {
  const { product } = useProductContext();
  const { settings } = useSiteContext();
  const { store } = settings as Settings;

  if (!product) return null;

  const { reviewService } = store as Store;
  const { judgemeReviews, yotpoReviews, metaData } = product;

  return (
    <div className={cn(id, className, 'product-rating')}>
      {reviewService === 'judge.me' && (
        <a href="#review-tab">
          <ProductRating stats={judgemeReviews as Stats} />
        </a>
      )}
      {reviewService === 'yotpo' && (
        <a href="#review-tab">
          <ProductRating stats={yotpoReviews as Stats} />
        </a>
      )}
      {reviewService === 'woocommerce_native_reviews' && metaData?.wooProductReviews?.stats && (
        <a href="#review-tab">
          <ProductRating stats={metaData.wooProductReviews.stats as Stats} />
        </a>
      )}
    </div>
  );
};
