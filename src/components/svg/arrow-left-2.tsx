import { Icon } from '@src/components/svg';

type ArrowLeft2Props = Partial<Icon> & {
  width?: number;
  height?: number;
};

export const ArrowLeft2 = ({ strokeColor, className, width, height }: ArrowLeft2Props) => (
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
      d="M13.6 8.206a.6.6 0 0 1-.6.6H4.49l3.326 3.168a.6.6 0 0 1-.832.865l-4.4-4.2a.6.6 0 0 1 0-.865l4.4-4.2a.6.6 0 1 1 .832.865L4.49 7.606H13a.6.6 0 0 1 .6.6Z"
      clipRule="evenodd"
    />
  </svg>
);

ArrowLeft2.defaultProps = {
  width: 16,
  height: 17,
  fill: '#888888',
  className: '',
};
