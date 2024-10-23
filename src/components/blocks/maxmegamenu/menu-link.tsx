import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { makeLinkRelative } from '@src/lib/helpers/helper';
import { useSiteContext } from '@src/context/site-context';
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

export const StyledMenuLink = styled(Link)<StyledMenuProps>`
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

type Props = React.LinkHTMLAttributes<HTMLAnchorElement> & StyledMenuProps;

export const MenuLink: React.FC<Props> = ({ children, href, onClick, as, ...props }) => {
  const { currentCountry } = useSiteContext();
  const { push, prefetch } = useRouter();

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible && href) {
      prefetch(`/${currentCountry}${makeLinkRelative(href)}`);
    }
  }, [currentCountry, href, isVisible, prefetch]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
      e.preventDefault();
    }
  };

  return (
    <div ref={ref}>
      <StyledMenuLink
        href={href ? makeLinkRelative(href) : '#'}
        onClick={handleClick}
        {...props}
      >
        {children}
      </StyledMenuLink>
    </div>
  );
};
