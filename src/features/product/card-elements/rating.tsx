import { useSiteContext } from '@src/context/site-context';
import { Product } from '@src/models/product';
import { ProductMetaData } from '@src/models/product/types';
import { ProductRating } from '@src/features/product/product-rating';
import { Settings } from '@src/models/settings';
import { Store } from '@src/models/settings/store';
import { Stats } from '@src/models/product/reviews';
import { cn } from '@src/lib/helpers/helper';

type ICardRating = {
  product: Product;
  detailsAlignment: string;
  showRating?: boolean;
  className?: string;
};

export const CardRating = ({ product, detailsAlignment, showRating, className }: ICardRating) => {
  const { settings } = useSiteContext();
  const { store } = settings as Settings;

  if (!product || !showRating) return null;

  const { judgemeReviews, yotpoReviews, metaData } = product;
  const { reviewService } = store as Store;
  const { wooProductReviews } = metaData as ProductMetaData;

  return (
    <div className={cn('product-rating', `justify-${detailsAlignment}`, className)}>
      {reviewService === 'judge.me' && <ProductRating stats={judgemeReviews as Stats} />}
      {reviewService === 'yotpo' && <ProductRating stats={yotpoReviews as Stats} />}
      {reviewService === 'woocommerce_native_reviews' && (
        <ProductRating stats={wooProductReviews?.stats} />
      )}
    </div>
  );
};
