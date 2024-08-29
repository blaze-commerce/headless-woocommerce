import { useIsClient } from 'usehooks-ts';

import { COLOR_CLASSES, Icon } from '@components/svg';

export const HamburgerIcon = ({ color, className, fillColor }: Icon) => {
  const isClient = useIsClient();
  if (!isClient) {
    return null; // or a loading spinner, etc.
  }

  return (
    <svg
      className={`inline fill-black header-link-fill ${COLOR_CLASSES[color]} ${className}`}
      width="21"
      height="14"
      viewBox="0 0 21 14"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill: fillColor ?? '',
      }}
    >
      <path d="M0.5 1C0.5 0.447715 0.947715 0 1.5 0H19.5C20.0523 0 20.5 0.447715 20.5 1C20.5 1.55228 20.0523 2 19.5 2H1.5C0.947715 2 0.5 1.55228 0.5 1Z" />
      <path d="M0.5 7C0.5 6.44772 0.947715 6 1.5 6H19.5C20.0523 6 20.5 6.44772 20.5 7C20.5 7.55228 20.0523 8 19.5 8H1.5C0.947715 8 0.5 7.55228 0.5 7Z" />
      <path d="M1.5 12C0.947715 12 0.5 12.4477 0.5 13C0.5 13.5523 0.947715 14 1.5 14H19.5C20.0523 14 20.5 13.5523 20.5 13C20.5 12.4477 20.0523 12 19.5 12H1.5Z" />
    </svg>
  );
};

HamburgerIcon.defaultProps = {
  color: 'default',
  size: 'sm',
};
