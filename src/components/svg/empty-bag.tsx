import { Icon } from '@src/components/svg';

export const EmptyBagIcon = ({ fillColor }: Partial<Icon>) => {
  return (
    <svg
      className="inline fill-current"
      width="20"
      height="24"
      viewBox="0 0 20 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill: 'transparent',
        stroke: fillColor,
        strokeWidth: '1.5',
      }}
    >
      <path d="M0.801665 21.25L1.70166 7.75H16.2983L17.1983 21.25H0.801665Z" />
      <path d="M14 7V6C14 3.23858 11.7614 1 9 1V1C6.23858 1 4 3.23858 4 6V7" />
      <circle
        cx="4"
        cy="10"
        r="1"
        fill="none"
        style={{
          fill: fillColor,
          strokeWidth: '0.5',
        }}
      />
      <circle
        cx="14"
        cy="10"
        r="1"
        fill="none"
        style={{
          fill: fillColor,
          strokeWidth: '0.5',
        }}
      />
    </svg>
  );
};

EmptyBagIcon.defaultProps = {
  color: 'default',
  size: 'sm',
};
