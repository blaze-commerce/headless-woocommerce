import classNames from 'classnames';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

import { RawLink } from '@src/components/common/raw-link';
import { useSiteContext } from '@src/context/site-context';
import Link from 'next/link';

type Props = {
  href: string;
  children: ReactNode;
  unstyled?: boolean;
  className?: string;
  style?: {
    [key: string]: string;
  };
  target?: string;
};

const defaultProps = {
  unstyled: false,
};

export const PrefetchLink: React.FC<Props> = ({
  children,
  href,
  unstyled,
  className,
  style = {},
  target = '_self',
}) => {
  const { currentCountry } = useSiteContext();

  const { push, prefetch } = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible && href) {
      prefetch(`/${currentCountry}${href}`);
    }
  }, [isVisible, currentCountry, prefetch, href]);

  if (!href) return null;

  const handleMouseEnter = () => {
    prefetch(`/${currentCountry}${href}`);
  };

  return (
    <>
      {target === '_self' ? (
        <div
          ref={ref}
          onMouseEnter={handleMouseEnter}
        >
          <RawLink
            className={classNames(className, {
              'cursor-pointer': unstyled,
              'text-blue-500 underline h-full cursor-pointer': !unstyled,
            })}
            href={href}
            style={style}
          >
            {children}
          </RawLink>
        </div>
      ) : (
        <a
          href={href}
          target={target}
        >
          {children}
        </a>
      )}
    </>
  );
};

PrefetchLink.defaultProps = defaultProps;
