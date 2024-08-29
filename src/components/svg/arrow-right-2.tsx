import { Icon } from '@src/components/svg';

type ArrowRight2Props = Partial<Icon> & {
  width?: number;
  height?: number;
};

export const ArrowRight2 = ({ strokeColor, className, width, height }: ArrowRight2Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    fill=""
  >
    <path
      fill={strokeColor}
      fillRule="evenodd"
      d="M2.4 8.208a.6.6 0 0 1 .6-.6h8.51L8.184 4.44a.6.6 0 1 1 .832-.865l4.4 4.2a.6.6 0 0 1 0 .865l-4.4 4.2a.6.6 0 0 1-.832-.865l3.326-3.167H3a.6.6 0 0 1-.6-.6Z"
      clipRule="evenodd"
    />
  </svg>
);

ArrowRight2.defaultProps = {
  width: 16,
  height: 17,
  fill: '#888888',
  className: '',
};
