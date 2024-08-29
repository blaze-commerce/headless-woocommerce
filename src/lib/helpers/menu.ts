import { find } from 'lodash';

import menus from '@public/menu.json';

export type DisplayType = 'icon_only' | 'text_only' | 'both';

type MegaMenuMeta = Partial<{
  class: string;
  'hide-on-desktop': string;
  'hide-on-mobile': string;
  span: string;
}>;

type MegaMenuColumn = {
  meta: MegaMenuMeta;
  items: {
    id: string;
    type?: string;
    title?: string;
    url?: string;
    image?: string;
    content?: string;
  }[];
};

export type MegaMenu = {
  meta: MegaMenuMeta;
  columns: MegaMenuColumn[];
  type?: string;
};

export type MegaMenuItem = Partial<{
  isMegaMenu: boolean;
  megaMenuItems: MegaMenu[];
}>;

export type MenuItem = {
  parentId: string;
  title: string;
  url: string;
};

type TypesenseMenuItemLink = Partial<MenuItem & MegaMenu>;
export type TypesenseMenuItem = TypesenseMenuItemLink &
  Partial<{ children: TypesenseMenuItemLink[] & MegaMenu[] }>;
export type TypesenseMenu = {
  items: TypesenseMenuItem[];
};

export const getMenuById = (menuId: number): TypesenseMenu => {
  const selectedMenu = find(menus, ['wpMenuId', menuId]) as TypesenseMenu;
  return selectedMenu;
};

export const getDisplayTypeValues = (displayType?: DisplayType | string | null) => {
  switch (displayType) {
    case 'icon_only':
    case 'icon':
      return { showText: false, showIcon: true };
    case 'text_only':
      return { showText: true, showIcon: false };
    case 'both':
    default:
      return { showText: true, showIcon: true };
  }
};
