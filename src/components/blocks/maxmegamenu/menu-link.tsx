import styled, { css } from 'styled-components';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { makeLinkRelative } from '@src/lib/helpers/helper';
import { useRouter } from 'next/router';
import type { BoxControlProps } from '@components/blocks/maxmegamenu/block';
import Link from 'next/link';

type StyledMenuProps = {
  $padding?: BoxControlProps;
  $color?: string;
  $colorSm?: string;
  $backgroundColor?: string;
  $fontWeight?: string;
  $fontSize?: number;
  $letterCase?: string;
  $hoverColor?: string;
  $hoverBackgroundColor?: string;
};

/**
 * WordPress uses `#` as the URL of a menu item that exists only to open a dropdown.
 * It is not a destination, so it must never reach next/link: next/link resolves `#`
 * against the current route, which turns one menu item into a different dead URL on
 * every page of the site.
 */
const isNonNavigable = (href?: string) => !href || href === '#';

const menuLinkStyles = css<StyledMenuProps>`
  ${(props) => {
    if (!props.$padding) return null;

    const { top, left, right, bottom } = props.$padding || {};

    return `
      padding-top: ${top};
      padding-left: ${left};
      padding-right: ${right};
      padding-bottom: ${bottom};
    `;
  }}

  color: ${(props) => props.$colorSm || props.$color || '#000'};
  font-weight: ${(props) => props.$fontWeight || '400'};
  font-size: ${(props) => (props.$fontSize ? `${props.$fontSize}px` : '14px')};
  ${(props) => props.$letterCase && `text-transform:${props.$letterCase}`};

  svg.chevron-down {
    fill: ${(props) => props.$color || '#000'};
  }

  @media (min-width: 1024px) {
    color: ${(props) => props.$color || '#000'};
    background-color: ${(props) => props.$backgroundColor || '#fff'};

    &:hover {
      color: ${(props) => props.$hoverColor || '#000'};
      background-color: ${(props) => props.$hoverBackgroundColor || '#fff'};

      svg.chevron-down {
        fill: ${(props) => props.$hoverColor || '#000'};
        transform: rotate(180deg);
      }
    }
  }
`;

export const StyledMenuLink = styled(Link)<StyledMenuProps>`
  ${menuLinkStyles}
`;

/**
 * The dropdown trigger. Same element and same styling as StyledMenuLink, but with no
 * href, so it looks and measures identically while not being a link: nothing to
 * prefetch, nothing for a crawler to follow, and no route resolution.
 */
export const StyledMenuTrigger = styled.a<StyledMenuProps>`
  ${menuLinkStyles}
`;

type Props = React.LinkHTMLAttributes<HTMLAnchorElement> & StyledMenuProps;

export const MenuLink: React.FC<Props> = ({ children, href, onClick, as, ...props }) => {
  const { push, prefetch } = useRouter();

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;
  const nonNavigable = isNonNavigable(href);

  useEffect(() => {
    if (isVisible && href && !nonNavigable) {
      prefetch(makeLinkRelative(href));
    }
  }, [href, isVisible, nonNavigable, prefetch]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
      e.preventDefault();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (!onClick || (e.key !== 'Enter' && e.key !== ' ')) return;
    e.preventDefault();
    onClick(e as unknown as React.MouseEvent<HTMLAnchorElement>);
  };

  if (nonNavigable) {
    return (
      <div ref={ref}>
        <StyledMenuTrigger
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </StyledMenuTrigger>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <StyledMenuLink
        href={makeLinkRelative(href as string)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </StyledMenuLink>
    </div>
  );
};
