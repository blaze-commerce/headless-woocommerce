import React from 'react';
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

type Props = {
  attributes: MaxMegaMenuAttributes;
  className?: string;
  items: TypesenseMenuItem[];
};

export const NormalSubMenu: React.FC<Props> = ({ items, attributes }) => {
  return (
    <MegaMenuSubMenuWrapper
      $mainNavigationBackgroundColor={attributes.submenuContainerBackgroundColor}
      $padding={attributes.submenuContainerPadding}
      className="mega-menu flex-col"
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
              className="flex cursor-pointer items-center"
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
