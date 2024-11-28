import { COLOR_CLASSES, Icon } from './index';

export const HeartFilledIconV2 = ({ fillColor, color, className, strokeColor }: Icon) => {
  return (
    <svg
      className={`inline-block ${className} ${COLOR_CLASSES[color]}`}
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: fillColor }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill={fillColor}
        stroke={strokeColor}
        d="M1.98433 2.83296C0.176447 4.64085 0.176447 7.572 1.98433 9.37989L9.88722 17.2828L17.79 9.37989C19.5979 7.572 19.5979 4.64085 17.79 2.83296C15.9821 1.02508 13.051 1.02508 11.2431 2.83296L9.88722 4.18893L8.53126 2.83296C6.72337 1.02508 3.79221 1.02508 1.98433 2.83296Z"
      />
    </svg>
  );
};

HeartFilledIconV2.defaultProps = {
  color: 'default',
  size: 'sm',
};
