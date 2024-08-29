import { isLightColor } from '@src/lib/helpers/helper';
import { cn } from '@src/lib/helpers/helper';
import { Product } from '@src/models/product';

interface ICardItemsLeftBadge {
  product: Product;
  hasItemsLeftBadge: boolean;
  badgeType?: number;
  itemsLeftBadgeColor?: string;
}

export const CardItemsLeftBadge = (props: ICardItemsLeftBadge) => {
  const { product, hasItemsLeftBadge, badgeType = 1, itemsLeftBadgeColor = '#4A5468' } = props;
  const isOneLeft = product?.stockQuantity === 1;
  return (
    <>
      {hasItemsLeftBadge && isOneLeft && (
        <div
          className={cn('absolute top-0 flex w-full h-full overflow-hidden z-[7]', {
            'justify-end': badgeType === 1 || badgeType === 3,
            'float-right': badgeType === 2,
          })}
        >
          <span
            className={cn('', {
              'relative top-0 inset-x-0 flex items-center justify-center m-2.5 h-14 w-14 sm:h-16 sm:w-16 rounded-full':
                badgeType === 1,
              'absolute -top-3 -right-20 h-[3rem] w-[11.5rem] md:-top-4 md:-right-20 md:h-16 md:w-48 origin-center rotate-45 z-0':
                badgeType === 2,
              'top-0 inset-x-0 flex items-center justify-center h-7 w-16': badgeType === 3,
            })}
            style={{ backgroundColor: itemsLeftBadgeColor }}
          >
            <p
              className={cn('text-center text-xs font-normal', {
                'relative p-2.5': badgeType === 1,
                'absolute w-full bottom-1 md:bottom-2.5': badgeType === 2,
                'text-white': !isLightColor(itemsLeftBadgeColor),
                'text-black': isLightColor(itemsLeftBadgeColor),
              })}
            >
              1 LEFT
            </p>
          </span>
        </div>
      )}
    </>
  );
};
