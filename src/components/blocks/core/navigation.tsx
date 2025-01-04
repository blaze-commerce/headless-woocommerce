import { BlockAttributes } from '@src/lib/block/types';
import { BlockComponentProps } from '@src/components/blocks';
import { getMenuById } from '@src/lib/helpers/menu';
import { MenuItem } from '@src/components/header/menu/menu-item';
import { Menu, MenuListItem } from '@src/components/blocks/maxmegamenu/styled-components';
import { cn } from '@src/lib/helpers/helper';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MenuLink } from '@src/components/blocks/maxmegamenu/menu-link';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { ChevronDown } from '@src/components/svg/chevron-down';
import { NormalSubMenu } from '@src/components/blocks/maxmegamenu/normal-sub-menu';
import { IconBlock } from '@src/components/blocks/outermost/IconBlock';
import { convertAttributes } from '@src/lib/block';

export const Navigation = ({ block }: BlockComponentProps) => {
  const { asPath } = useRouter();
  const [linkHovered, setLinkHovered] = useState(false);

  const attributes = convertAttributes(block.attrs as any) as BlockAttributes;

  const menuId = (attributes.menu as string) || '';
  const iconBlock = block.innerBlocks.length > 0 ? block.innerBlocks[0] : null;
  const hasChevronDownIcon = attributes.hasChevronDown;
  const color = attributes.color;

  const mainMenu = getMenuById(parseInt(menuId, 10));

  if (!mainMenu) {
    return null;
  }

  return (
    <Menu
      className={cn('flex items-center relative', attributes?.className, {
        'w-full': attributes.submenuFullWidth,
        'menu-hovered': linkHovered,
      })}
    >
      {mainMenu.items.map((item, index) => {
        const childMenus = item.children || [];
        const hasChildMenus = childMenus.length > 0 || false;

        return (
          <MenuListItem
            key={`${item?.url}-${index}`}
            $attrs={attributes}
            className="nav-item flex items-center"
            onMouseEnter={() => setLinkHovered(true)}
            onMouseLeave={() => setLinkHovered(false)}
          >
            <MenuLink
              $fontSize={14}
              className="flex cursor-pointer items-center gap-2.5 rounded"
              href={item.url}
              $backgroundColor={'transparent'}
              $hoverBackgroundColor={'transparent'}
              $color={color?.value || '#fff'}
              $hoverColor={color?.value || '#fff'}
            >
              {iconBlock && <IconBlock block={iconBlock} />}
              <ReactHTMLParser html={item.title || ''} />

              {hasChevronDownIcon && hasChildMenus && <ChevronDown />}
            </MenuLink>

            {hasChildMenus && (
              <NormalSubMenu
                items={childMenus}
                attributes={attributes}
              />
            )}
          </MenuListItem>
        );
      })}
    </Menu>
  );
};
