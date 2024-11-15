import { ReactNode } from 'react';

import { cn, makeLinkRelative } from '@src/lib/helpers/helper';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Props = {
  href: string;
  children: ReactNode;
  relative?: boolean;
  className?: string;
  style?: {
    [key: string]: string;
  };
  passHref?: boolean;
  title?: string;
};

export const RawLink = (props: Props) => {
  const { passHref = false } = props;
  const { prefetch } = useRouter();
  let href = props.href;
  if (props.relative) {
    href = makeLinkRelative(href);
  }

  const handleMouseEnter = () => {
    prefetch(href);
  };

  return (
    <Link
      href={href}
      passHref={passHref}
      className={cn(props.className, 'raw-link')}
      style={props.style}
      onMouseEnter={handleMouseEnter}
      title={props.title}
    >
      {props.children}
    </Link>
  );
};

// Set the default value for the 'relative' prop
RawLink.defaultProps = {
  relative: true,
};
