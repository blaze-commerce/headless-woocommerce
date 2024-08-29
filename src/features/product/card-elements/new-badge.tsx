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

  return (
    <>
      {isTwoMonthsAgo && (
        <div
          className={cn('absolute top-0 flex w-full h-full overflow-hidden z-[7]', {
            'left-0 justify-end': badgeType === 1 || badgeType === 3,
            'float-right': badgeType === 2,
          })}
        >
          <span
            className={cn('', {
              'relative top-0 inset-x-0 flex items-center justify-center m-2.5 h-12 w-12 rounded-full':
                badgeType === 1,
              'absolute -top-3 -left-20 h-[3rem] w-[11.5rem] md:-top-4 md:-right-20 md:h-16 md:w-48 origin-center -rotate-45 z-0':
                badgeType === 2,
              'top-0 inset-x-0 flex items-center justify-center h-7 w-16': badgeType === 3,
            })}
            style={{ backgroundColor: badgeColor }}
          >
            <p
              className={cn('text-center text-xs font-normal', {
                'relative p-2.5': badgeType === 1,
                'absolute w-full  bottom-1 md:bottom-2.5': badgeType === 2,
                'text-white': !isLightColor(badgeColor),
                'text-black': isLightColor(badgeColor),
              })}
            >
              NEW!
            </p>
          </span>
        </div>
      )}
    </>
  );
};
