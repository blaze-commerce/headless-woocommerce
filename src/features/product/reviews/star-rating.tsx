import classNames from 'classnames';
import { times } from 'lodash';
import { EmptyStar } from '@src/components/svg/icons/empty-star';
import { Star } from '@src/components/svg/icons/star';

export const StarRating = ({
  rating,
  emptyRating,
  className,
  color,
}: {
  rating: number;
  emptyRating?: number;
  className?: string;
  color?: string;
}) => (
  <div className="flex items-center">
    {times(rating, (index) => (
      <Star
        key={index}
        className={classNames(className, {
          'w-5 h-5': !className,
        })}
        color={color ? 'none' : 'default'}
        size="xs"
        fillColor={color}
      />
    ))}
    {emptyRating &&
      times(emptyRating, (index) => (
        <EmptyStar
          key={index}
          className={classNames(className, {
            'w-5 h-5': !className,
          })}
          color={color ? 'none' : 'default'}
          size="xs"
          strokeColor={color}
        />
      ))}
  </div>
);
