import styled from 'styled-components';
import type { BoxControlProps, MaxMegaMenuAttributes } from '@components/blocks/maxmegamenu/block';

export const Menu = styled.ul<{
  $isCentered?: boolean;
  $isFullWidth?: boolean;
  $menuMaxWidth?: string;
}>`
  ${(props) =>
    props.$isCentered &&
    !props.$isFullWidth &&
    `
    margin: 0 auto;
    justify-content: center;
  `}

  ${(props) =>
    props.$isFullWidth &&
    `
    justify-content: space-evenly;
    width: 100%;
  `}

  max-width: ${(props) => props.$menuMaxWidth || '100%'};
`;

export const MegaMenuSubMenuWrapper = styled.div<{
  $mainNavigationBackgroundColor?: string;
  $padding?: BoxControlProps;
}>`
  top: 0;
  top: 100%;
  z-index: 100;
  display: none;
  border-top: 1px solid #0000001a;
  border-bottom: 1px solid #0000001a;

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

  @media (min-width: 1280px) {
    position: absolute;
    box-shadow: 0px 10px 40px 0px #0000001a;
    border-top: unset;
    border-bottom: unset;
    background-color: ${(props) => props.$mainNavigationBackgroundColor || '#fff'};
  }
`;

export const MenuListItem = styled.li<{
  $attrs?: MaxMegaMenuAttributes;
  $padding?: BoxControlProps;
}>`
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

  ${(props) => {
    if (!props.$attrs?.menuSeparatorColor) return null;

    const { top, bottom } = props.$attrs?.menuLinkPadding || {};

    return `
      &:after {
        content: '';
        display: block;
        width: 1px;
        background-color: ${props.$attrs?.menuSeparatorColor};
        height: calc(100% - ${top} - ${bottom});
      }

      &:last-of-type:after {
        content: none;
      }
    `;
  }}
  
  &.is-open {
    svg.chevron-down {
      transform: rotate(180deg);
    }

    ${MegaMenuSubMenuWrapper} {
      display: flex;
    }
  }
`;

export const MegaMenuSubMenuColumn = styled.ul<{
  $attrs?: MaxMegaMenuAttributes;
  $colspan?: string;
  $hideOnMobile?: boolean;
  $hideOnDesktop?: boolean;
}>`
  width: 100%;
  display: ${(props) => (props.$hideOnMobile ? 'none' : 'block')};

  @media (min-width: 1024px) {
    display: ${(props) => (props.$hideOnDesktop ? 'none' : 'block')};
    width: ${(props) => (props.$colspan ? `calc(100% / ${props.$colspan})` : '100%')};
  }
`;

export const MenuWrapper = styled.div<{ $attrs?: MaxMegaMenuAttributes }>`
  background-color: ${(props) => props.$attrs?.mainNavigationBackgroundColor || '#fff'};

  @media (min-width: 1024px) {
    &.hovered {
      ${MenuListItem}:hover {
        ${MegaMenuSubMenuWrapper} {
          display: flex;
        }
      }
    }
  }
`;
