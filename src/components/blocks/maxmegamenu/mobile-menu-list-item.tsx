import HTMLReactParser from 'html-react-parser';
import { useState } from 'react';

import { ChevronDown } from '@src/components/svg/chevron-down';
import { MaxMegaMenuAttributes } from '@src/components/blocks/maxmegamenu/block';
import { MegaMenuSubMenu } from '@src/components/blocks/maxmegamenu/mega-menu-sub-menu';
import { MenuLink } from '@src/components/blocks/maxmegamenu/menu-link';
import { MenuListItem } from '@src/components/blocks/maxmegamenu/styled-components';
import { TypesenseMenuItem } from '@src/lib/helpers/menu';

import { cn, makeLinkRelative } from '@src/lib/helpers/helper';
import { useRouter } from 'next/router';
import { useSiteContext } from '@src/context/site-context';
import { NormalSubMenu } from '@src/components/blocks/maxmegamenu/normal-sub-menu';

type Props = {
  attributes: MaxMegaMenuAttributes;
  menuItem: TypesenseMenuItem;
  originalItems?: TypesenseMenuItem[];
};

export const MobileMenuListItem: React.FC<Props> = ({ attributes, menuItem, originalItems }) => {
  const childMenus = menuItem.children || [];
  const hasChildMenus = childMenus.length > 0 || false;
  const isMegaMenu = !!childMenus.find((menu) => menu.type === 'megamenu');
  const [isOpen, setIsOpen] = useState(false);

  const toggleChildMenuOnClick = (e: React.MouseEvent) => {
    setIsOpen(!isOpen);
    e.preventDefault();
  };

  return (
    <MenuListItem
      className={cn({
        'is-open': isOpen,
      })}
    >
      <MenuLink
        className="flex cursor-pointer items-center justify-between gap-2.5"
        $padding={attributes.menuLinkPadding}
        $backgroundColor={attributes.mainNavigationBackgroundColor}
        $color={attributes.mobileMenuLinkColor}
        href={menuItem.url}
        onClick={menuItem.url === '#' ? toggleChildMenuOnClick : undefined}
      >
        {HTMLReactParser(menuItem.title || '')}
        {hasChildMenus && (
          <div onClick={toggleChildMenuOnClick}>
            <ChevronDown />
          </div>
        )}
      </MenuLink>

      {hasChildMenus && isMegaMenu && (
        <MegaMenuSubMenu
          items={childMenus}
          attributes={attributes}
          originalItems={originalItems}
        />
      )}

      {hasChildMenus && !isMegaMenu && (
        <NormalSubMenu
          items={childMenus}
          attributes={attributes}
        />
      )}
    </MenuListItem>
  );
};
