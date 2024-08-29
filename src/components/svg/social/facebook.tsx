import { Icon, STROKE_COLOR_CLASSES } from '..';

export const FacebookIconDefault = ({ color, className, fillColor, strokeColor }: Icon) => {
  return (
    <svg
      className={className}
      viewBox="0 0 10 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill: fillColor,
        stroke: strokeColor,
      }}
    >
      <path
        className={strokeColor ? '' : STROKE_COLOR_CLASSES[color]}
        d="M6.39703 17.9986V9.80263H9.16203L9.57303 6.59363H6.39703V4.54963C6.39703 3.62363 6.65503 2.98963 7.98403 2.98963H9.66803V0.128634C8.84867 0.0408251 8.02508 -0.00157317 7.20103 0.00163401C4.75703 0.00163401 3.07903 1.49363 3.07903 4.23263V6.58763H0.332031V9.79663H3.08503V17.9986H6.39703Z"
      />
    </svg>
  );
};
