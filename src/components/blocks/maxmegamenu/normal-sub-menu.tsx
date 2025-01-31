import React, { useRef } from 'react';
import { MegaMenu as MegaMenuType, TypesenseMenuItem } from '@src/lib/helpers/menu';
import {
  MegaMenuSubMenuColumn,
  MegaMenuSubMenuWrapper,
  MenuListItem,
} from '@src/components/blocks/maxmegamenu/styled-components';
import { MenuLink } from '@src/components/blocks/maxmegamenu/menu-link';
import type { MaxMegaMenuAttributes } from '@src/components/blocks/maxmegamenu/block';
import { v4 } from 'uuid';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { cn } from '@src/lib/helpers/helper';

type Props = {
  attributes: MaxMegaMenuAttributes;
  className?: string;
  items: TypesenseMenuItem[];
};

export const NormalSubMenu: React.FC<Props> = ({ items, attributes }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <MegaMenuSubMenuWrapper
      $mainNavigationBackgroundColor={attributes.submenuContainerBackgroundColor}
      $padding={attributes.submenuContainerPadding}
      className="mega-menu normal-sub-menu-wrapper flex-col w-max"
      ref={ref}
    >
      <ul>
        {items?.map((menuItem, menuItemIndex) => (
          <MenuListItem key={`item-normal-${menuItemIndex}-${v4()}`}>
            <MenuLink
              $padding={attributes.submenuLinkPadding}
              $color={attributes.submenuLinkColor}
              $colorSm={attributes.mobileSubmenuLinkColor}
              $hoverColor={attributes.submenuLinkHoverColor}
              $backgroundColor={attributes.submenuLinkBackgroundColor}
              $hoverBackgroundColor={attributes.submenuLinkHoverBackgroundColor}
              $fontWeight={attributes.fontWeight}
              $letterCase={attributes.letterCase}
              className={cn('flex cursor-pointer items-center rounded', attributes.submenuClasses)}
              href={menuItem.url}
            >
              <ReactHTMLParser html={menuItem.title || ''} />
            </MenuLink>
          </MenuListItem>
        ))}
      </ul>
    </MegaMenuSubMenuWrapper>
  );
};
