import { last } from 'lodash';

import { BlockAttributes } from '@src/lib/block/types';
import { BlockComponentProps } from '@src/components/blocks';
import { getMenuById } from '@src/lib/helpers/menu';
import { MenuItem } from '@src/components/header/menu/menu-item';

export const Navigation = ({ block }: BlockComponentProps) => {
  if ('core/navigation' !== block.blockName) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;

  const regex = new RegExp('menu-(\\d*)', 'gm');
  const matchedNavigation = regex.exec(attributes.className || '');
  const menuId = last(matchedNavigation) || '';

  const mainMenu = getMenuById(parseInt(menuId, 10));

  if (!mainMenu) {
    return null;
  }

  return (
    <ul className={`_${block.id} flex text-xs`}>
      {mainMenu.items.map((item, index) => {
        return (
          <MenuItem
            key={`_${block.id}-item-${index}`}
            href={item.url}
            label={item.title}
            linkClassName={`text-[${attributes.customTextColor || '#000'}]`}
            borderless
          />
        );
      })}
    </ul>
  );
};
