import { cn, isLightColor } from '@src/lib/helpers/helper';
import { useSiteContext } from '@src/context/site-context';
import { isWithInMonthsAgo, toDateTime } from '@src/lib/helpers/date';
import { Product } from '@src/models/product';

interface ICardNewBadge {
  product: Product;
  badgeType?: number;
  badgeColor?: string;
}

export const CardNewBadge = (props: ICardNewBadge) => {
  const { product, badgeType = 1, badgeColor = '#4A5468' } = props;
  const { settings } = useSiteContext();
  const { productGallery } = settings?.product || {};

  if (!productGallery) return null;

  const newBadgeThreshold = +productGallery.newProductBadgeThreshold / 30;

  const publishedDate = toDateTime(product.publishedAt as number);
  const isTwoMonthsAgo = isWithInMonthsAgo(publishedDate, newBadgeThreshold);

  return <>{isTwoMonthsAgo && <div className="badge new-badge">New</div>}</>;
};
