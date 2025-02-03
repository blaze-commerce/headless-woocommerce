import { Menu, MenuListItem } from '@src/components/blocks/maxmegamenu/styled-components';
import { MenuLink } from '@src/components/blocks/maxmegamenu/menu-link';
import { TypesenseMenuItem } from '@src/lib/helpers/menu';
import { MaxMegaMenuAttributes } from '@src/components/blocks/maxmegamenu/block';
import React from 'react';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type Props = {
  mainMenuItems: TypesenseMenuItem[];
  attributes: MaxMegaMenuAttributes;
};

export const NormalMenu: React.FC<Props> = ({ attributes, mainMenuItems }) => {
  return (
    <Menu className="flex-col items-center relative">
      {Object.values(mainMenuItems).map((item) => {
        return item.children?.map((child) => (
          <MenuListItem
            key={child?.url}
            className="nav-item flex items-center"
          >
            <MenuLink
              $padding={attributes.submenuLinkPadding}
              $color={attributes.submenuLinkColor}
              $hoverColor={attributes.submenuLinkHoverColor}
              $backgroundColor={attributes.submenuLinkBackgroundColor}
              $hoverBackgroundColor={attributes.submenuLinkHoverBackgroundColor}
              $fontWeight={attributes.fontWeight}
              $letterCase={attributes.letterCase}
              className="flex cursor-pointer items-center gap-2.5 rounded"
              href={child.url}
            >
              <ReactHTMLParser html={child.title || ''} />
            </MenuLink>
          </MenuListItem>
        ));
      })}
    </Menu>
  );
};
