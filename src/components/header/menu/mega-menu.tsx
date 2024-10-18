import Image from 'next/image';
import React from 'react';

import { MenuItem } from '@src/components/header/menu/menu-item';
import { MegaMenu as MegaMenuType } from '@src/lib/helpers/menu';
import { cn, getColumnWidth } from '@src/lib/helpers/helper';
import { MegaMenuSubMenuWrapper } from '@src/components/blocks/maxmegamenu/styled-components';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type Props = {
  megaMenuItems: MegaMenuType[];
};

export const MegaMenu: React.FC<Props> = ({ megaMenuItems }) => {
  return (
    <MegaMenuSubMenuWrapper className="mega-menu">
      {megaMenuItems?.map((itemRow, rowIndex) => {
        return (
          <div
            key={`item-row-${rowIndex}`}
            className="mega-menu-row"
            role="mega-menu-row"
          >
            {itemRow.columns.map((column, columnIndex) => {
              return (
                <ul
                  key={`item-column-${rowIndex}-${columnIndex}`}
                  role="mega-menu-column"
                  className={cn(
                    `mega-menu-column w-full lg:${getColumnWidth(column.meta.span)}`,
                    column.meta.class,
                    {
                      hidden: column.meta['hide-on-mobile'] === 'true',
                      'lg:hidden': column.meta['hide-on-desktop'] === 'true',
                      'lg:block': column.meta['hide-on-desktop'] === 'false',
                    }
                  )}
                >
                  {column?.items?.map((columnItem, columnItemIndex) => {
                    if (null === columnItem.title && null === columnItem.url) {
                      return null;
                    }
                    if (columnItem.type === 'item') {
                      return (
                        <MenuItem
                          key={`item-${rowIndex}-${columnItemIndex}`}
                          isSubmenu
                          href={columnItem.url}
                          label={columnItem.title}
                          borderless
                          linkClassName="!py-1 !font-bold"
                          icon={
                            columnItem.image ? (
                              <Image
                                width={40}
                                height={40}
                                alt={columnItem.title || ''}
                                src={columnItem.image}
                                className="inline-flex h-10 w-10 object-contain"
                              />
                            ) : undefined
                          }
                        />
                      );
                    } else {
                      return (
                        <div
                          key={`item-${rowIndex}-${columnIndex}`}
                          className="mega-menu-widget-content"
                        >
                          <ReactHTMLParser html={columnItem.content || ''} />
                        </div>
                      );
                    }
                  })}
                </ul>
              );
            })}
          </div>
        );
      })}
    </MegaMenuSubMenuWrapper>
  );
};
