import { round } from 'lodash';

import { EmptyStar } from '@src/components/svg/icons/empty-star';
import { HalfStar } from '@src/components/svg/icons/half-star';
import { Star } from '@src/components/svg/icons/star';
import { cn } from '@src/lib/helpers/helper';

type Props = {
  rating: number;
  color?: string;
  className?: string;
};

export const Rating: React.FC<Props> = ({ className, rating, color }) => {
  let steps = round(rating, 0);
  // If rating is empty then no reviews yet
  if (rating === null) {
    steps = 0;
  }
  if (rating <= 0) {
    return null;
  }

  const remainingStars = 5 - steps;

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {steps >= 0 &&
          [...new Array(steps)].map((_rate, index) => {
            const star = rating - index;
            return (
              <div key={index}>
                {star < 1 ? (
                  <HalfStar
                    className={cn(className, {
                      'w-5 h-5': !className,
                    })}
                    color={color ? 'none' : 'default'}
                    size={'xs'}
                    fillColor={color}
                    strokeColor={color}
                  />
                ) : (
                  <Star
                    className={cn(className, {
                      'w-5 h-5': !className,
                    })}
                    color={color ? 'none' : 'default'}
                    size={'xs'}
                    fillColor={color}
                    strokeColor={color}
                  />
                )}
              </div>
            );
          })}

        {remainingStars >= 0 &&
          [...new Array(remainingStars)].map((_rate, index) => {
            return (
              <div key={index}>
                <EmptyStar
                  className={cn(className, {
                    'w-5 h-5': !className,
                  })}
                  color={color ? 'none' : 'default'}
                  size={'xs'}
                  strokeColor={color}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
