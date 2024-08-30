import { useIsClient } from 'usehooks-ts';

import { COLOR_CLASSES, Icon } from '@components/svg';

export const HomeIcon = ({ color, className, fillColor }: Icon) => {
  const isClient = useIsClient();
  if (!isClient) {
    return null; // or a loading spinner, etc.
  }

  return (
    <svg
      className={`inline ${className} `}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.71331 1.87925L2.09331 5.57924C1.57331 5.99257 1.23997 6.86593 1.35331 7.51926L2.23997 12.8259C2.39997 13.7726 3.30664 14.5392 4.26664 14.5392H11.7333C12.6866 14.5392 13.6 13.7659 13.76 12.8259L14.6466 7.51926C14.7533 6.86593 14.42 5.99257 13.9066 5.57924L9.28664 1.88592C8.5733 1.31259 7.41998 1.31258 6.71331 1.87925Z"
        stroke="#888888"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99998 10.3333C8.92045 10.3333 9.66665 9.58714 9.66665 8.66667C9.66665 7.74619 8.92045 7 7.99998 7C7.07951 7 6.33331 7.74619 6.33331 8.66667C6.33331 9.58714 7.07951 10.3333 7.99998 10.3333Z"
        stroke="#888888"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

HomeIcon.defaultProps = {
  color: 'default',
  size: 'sm',
};
