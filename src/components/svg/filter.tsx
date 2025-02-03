import { useIsClient } from 'usehooks-ts';

import { COLOR_CLASSES, Icon } from '@components/svg';

export const FilterIcon = ({ color, className, fillColor }: Icon) => {
  const isClient = useIsClient();
  if (!isClient) {
    return null; // or a loading spinner, etc.
  }

  const fill = fillColor ? fillColor : '#333333';

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={fill}
    >
      <path
        d="M12.6667 14.6673V7.33398"
        stroke={fill}
        strokeWidth="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.6667 4.66732V1.33398"
        stroke={fill}
        strokeWidth="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 14.6673V11.334"
        stroke={fill}
        strokeWidth="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 8.66732V1.33398"
        stroke={fill}
        strokeWidth="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.33331 14.6673V7.33398"
        stroke={fill}
        strokeWidth="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.33331 4.66732V1.33398"
        stroke={fill}
        strokeWidth="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2 7.33398H4.66667"
        stroke={fill}
        strokeWidth="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.3333 7.33398H14"
        stroke={fill}
        strokeWidth="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.66669 8.66602H9.33335"
        stroke={fill}
        strokeWidth="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

FilterIcon.defaultProps = {
  color: 'default',
  size: 'sm',
};
