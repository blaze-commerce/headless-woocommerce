import { COLOR_CLASSES, Icon, SIZE_CLASSES } from '@components/svg';

export const ChevronDown = ({ color, size, className, fillColor }: Icon) => {
  const { height, width } = SIZE_CLASSES[size];
  return (
    <svg
      className={`chevron-down fill-black ${className}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill: fillColor,
      }}
    >
      <path d="M1.97162 0.896213C1.69733 0.621917 1.2526 0.621917 0.978306 0.896213C0.704009 1.17051 0.704009 1.61523 0.978306 1.88953L5.19259 6.10382C5.46689 6.37811 5.91161 6.37811 6.18591 6.10382L10.4002 1.88953C10.6745 1.61523 10.6745 1.17051 10.4002 0.896213C10.1259 0.621917 9.68117 0.621917 9.40688 0.896213L5.68925 4.61384L1.97162 0.896213Z" />
    </svg>
  );
};

ChevronDown.defaultProps = {
  color: 'default',
  size: 'sm',
};
