import { Icon } from '@src/components/svg';

type ArrowRightProps = Partial<Icon> & {
  width?: number;
  height?: number;
};

export const ArrowRight = ({ strokeColor, className, width, height }: ArrowRightProps) => (
  <svg
    className={`inline ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 227.096 227.096"
    width={width}
    height={height}
  >
    <path
      d="m152.835 39.285-5.902 5.898 64.18 64.19H0v8.35h211.124l-64.191 64.179 5.902 5.909 74.261-74.261z"
      style={{
        fill: strokeColor,
      }}
    />
  </svg>
);

ArrowRight.defaultProps = {
  width: 40,
  height: 40,
  fill: '#000000',
  className: '',
};
