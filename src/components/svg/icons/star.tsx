import { COLOR_CLASSES, Icon, STROKE_COLOR_CLASSES } from '..';

export const Star = ({ color, className, fillColor, strokeColor }: Icon) => (
  <svg
    className={className}
    viewBox="0 0 23 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      fill: fillColor,
      stroke: strokeColor,
    }}
  >
    <path
      className={`${fillColor ? '' : COLOR_CLASSES[color]} ${
        strokeColor ? '' : STROKE_COLOR_CLASSES[color]
      } ${className}`}
      d="m10.115.512 2.245 6.91h7.266l-5.878 4.27 2.245 6.91-5.878-4.27-5.878 4.27 2.246-6.91-5.878-4.27H7.87l2.245-6.91Z"
    />
  </svg>
);
