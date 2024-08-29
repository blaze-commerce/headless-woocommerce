import { COLOR_CLASSES, Icon, STROKE_COLOR_CLASSES } from '..';

export const HalfStar = ({ color, className, fillColor }: Icon) => (
  <svg
    className={className}
    viewBox="0 0 23 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      fill: fillColor,
    }}
  >
    <path
      className={COLOR_CLASSES[color]}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.05 1.15v13.7l-.05-.037-5.878 4.27 2.245-6.909L.49 7.904h7.266L10 .994l.05.156Z"
    />
    <path
      className={STROKE_COLOR_CLASSES[color]}
      d="m10.115.512 2.245 6.91h7.266l-5.878 4.27 2.245 6.91-5.878-4.27-5.878 4.27 2.246-6.91-5.878-4.27H7.87l2.245-6.91Z"
    />
  </svg>
);
