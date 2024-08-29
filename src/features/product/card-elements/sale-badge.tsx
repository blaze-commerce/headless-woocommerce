import { cn } from '@src/lib/helpers/helper';
import { isLightColor } from '@src/lib/helpers/helper';

interface ICardSaleBadge {
  badgeType?: number;
  badgeColor?: string;
}

export const CardSaleBadge = (props: ICardSaleBadge) => {
  const { badgeType = 1, badgeColor = '#4A5468' } = props;
  return (
    <div className="absolute float-left top-0 left-0 w-full h-full overflow-hidden z-[7]">
      <span
        className={cn('absolute', {
          'top-0 inset-x-0 flex items-center justify-center m-2.5 h-12 w-12 rounded-full':
            badgeType === 1,
          '-top-3 -left-20 h-[3rem] w-[11.5rem] md:-top-4 md:-left-20 md:h-16 md:w-48 origin-center -rotate-45 z-0':
            badgeType === 2,
          'top-0 inset-x-0 flex items-center justify-center h-7 w-16': badgeType === 3,
          'top-4 inset-x-4 flex items-center justify-center h-7 w-16 rounded ': badgeType === 4,
        })}
        style={{ backgroundColor: badgeColor }}
      >
        <p
          className={cn('text-center text-xs font-normal', {
            'relative p-2.5': badgeType === 1,
            'w-full absolute bottom-1 md:bottom-2.5': badgeType === 2,
            'text-sm': badgeType === 4,
            'text-white': !isLightColor(badgeColor),
            'text-black': isLightColor(badgeColor),
          })}
        >
          SALE!
        </p>
      </span>
    </div>
  );
};
