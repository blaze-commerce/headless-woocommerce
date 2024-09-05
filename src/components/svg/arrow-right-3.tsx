import { Icon } from '@src/components/svg';

type ArrowRight2Props = Partial<Icon> & {
  width?: number;
  height?: number;
};

export const ArrowRight3 = ({ strokeColor, className, width, height }: ArrowRight2Props) => (
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
      d="M6.58768 3.21456C6.81549 2.98675 7.18484 2.98675 7.41264 3.21456L11.496 7.29789C11.7238 7.52569 11.7238 7.89504 11.496 8.12285L7.41264 12.2062C7.18484 12.434 6.81549 12.434 6.58768 12.2062C6.35988 11.9784 6.35988 11.609 6.58768 11.3812L9.67521 8.2937H2.91683C2.59466 8.2937 2.3335 8.03253 2.3335 7.71037C2.3335 7.3882 2.59466 7.12703 2.91683 7.12703H9.67521L6.58768 4.03951C6.35988 3.81171 6.35988 3.44236 6.58768 3.21456Z"
      clipRule="evenodd"
    />
  </svg>
);

ArrowRight3.defaultProps = {
  width: 16,
  height: 17,
  fill: '#888888',
  className: '',
};
