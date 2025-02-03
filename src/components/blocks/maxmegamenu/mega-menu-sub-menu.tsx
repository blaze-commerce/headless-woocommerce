import React from 'react';
import { filter } from 'lodash';

import { MegaMenu as MegaMenuType, TypesenseMenuItem } from '@src/lib/helpers/menu';
import {
  MegaMenuSubMenuColumn,
  MegaMenuSubMenuWrapper,
  MenuListItem,
} from '@src/components/blocks/maxmegamenu/styled-components';
import { MenuLink } from '@src/components/blocks/maxmegamenu/menu-link';
import type { MaxMegaMenuAttributes } from '@src/components/blocks/maxmegamenu/block';

import { cn } from '@src/lib/helpers/helper';
import { NormalMenu } from '@src/components/blocks/maxmegamenu/normal-menu';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type Props = {
  attributes: MaxMegaMenuAttributes;
  className?: string;
  items: MegaMenuType[];
  originalItems?: TypesenseMenuItem[];
};

export const MegaMenuSubMenu: React.FC<Props> = ({ items, attributes, originalItems }) => {
  return (
    <MegaMenuSubMenuWrapper
      $mainNavigationBackgroundColor={attributes.submenuContainerBackgroundColor}
      $padding={attributes.submenuContainerPadding}
      className={cn('mega-menu mega-menu-sub-menu-wrapper inset-x-0 flex-col', {
        'w-full': !!attributes.submenuFullWidth,
      })}
    >
      {items?.map((itemRow, rowIndex) => {
        return (
          <div
            key={`item-row-${rowIndex}`}
            className={cn('mega-menu-row w-full', itemRow.meta.class)}
            role="mega-menu-row"
          >
            {itemRow.columns.map((column, columnIndex) => {
              return (
                <MegaMenuSubMenuColumn
                  key={`item-column-${rowIndex}-${columnIndex}`}
                  role="mega-menu-column"
                  $colspan={column.meta.span}
                  $hideOnMobile={column.meta['hide-on-mobile'] === 'true'}
                  $hideOnDesktop={column.meta['hide-on-desktop'] === 'true'}
                  className={cn('mega-menu-column', column.meta.class)}
                >
                  {column?.items?.map((columnItem, columnItemIndex) => {
                    if (columnItem.type === 'item') {
                      const otherChildMenus = filter(
                        originalItems,
                        (child) => columnItem.id == child.parentId
                      );
                      const highlightMenuItem =
                        column?.items.length == 1 || otherChildMenus.length > 0;
                      return (
                        <MenuListItem key={`item-${rowIndex}-${columnItemIndex}`}>
                          <MenuLink
                            $padding={attributes.submenuLinkPadding}
                            $color={
                              highlightMenuItem
                                ? attributes.menuLinkHoverColor
                                : attributes.submenuLinkColor
                            }
                            $hoverColor={attributes.submenuLinkHoverColor}
                            $backgroundColor={attributes.submenuLinkBackgroundColor}
                            $hoverBackgroundColor={attributes.submenuLinkHoverBackgroundColor}
                            $fontWeight={attributes.fontWeight}
                            $letterCase={attributes.letterCase}
                            $colorSm={attributes.mobileSubmenuLinkColor}
                            className="flex cursor-pointer items-center"
                            href={columnItem.url}
                          >
                            <ReactHTMLParser html={columnItem.title || ''} />
                          </MenuLink>

                          {otherChildMenus.length > 0 && (
                            <NormalMenu
                              mainMenuItems={otherChildMenus}
                              attributes={attributes}
                            />
                          )}
                        </MenuListItem>
                      );
                    } else {
                      return (
                        <MenuListItem
                          key={`item-${rowIndex}-${columnItemIndex}`}
                          className="mega-menu-widget-content"
                          $padding={attributes.submenuLinkPadding}
                        >
                          <ReactHTMLParser html={columnItem.content || ''} />
                        </MenuListItem>
                      );
                    }
                  })}
                </MegaMenuSubMenuColumn>
              );
            })}
          </div>
        );
      })}
    </MegaMenuSubMenuWrapper>
  );
};
