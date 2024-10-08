import { ParsedBlock } from '@src/components/blocks';

import {
  StaticBlockStyleRepresenter,
  StaticImplements,
} from '@src/lib/block/block-style-representer';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { get, pick } from 'lodash';

@StaticImplements<StaticBlockStyleRepresenter>()
export class MaxMegaMenuStyleRepresenter {
  static blockName = 'maxmegamenu/location';

  generateClassNames(block: ParsedBlock) {
    const classes = [];
    const attributes = (block.attrs as BlockAttributes) || {};

    const {
      mainNavigationBackgroundColor,

      menuTextColor,
      menuHoverTextColor,
      menuBackgroundColor,
      menuHoverBackgroundColor,

      submenuTextColor,
      submenuHoverTextColor,
      submenuBackgroundColor,
      submenuHoverBackgroundColor,

      menuSeparatorColor,
    } = attributes;

    if (mainNavigationBackgroundColor) {
      classes.push(`bg-[${mainNavigationBackgroundColor}]`);
    }
    if (menuTextColor) {
      classes.push(`text-[${menuTextColor}] !text-[${menuTextColor}]`);
    }
    if (menuHoverTextColor) {
      classes.push(`hover:text-[${menuHoverTextColor}]`);
    }
    if (menuBackgroundColor) {
      classes.push(`bg-[${menuBackgroundColor}]`);
    }
    if (menuHoverBackgroundColor) {
      classes.push(`hover:bg-[${menuHoverBackgroundColor}]`);
    }

    if (menuSeparatorColor) {
      classes.push(`after:text-[${menuSeparatorColor}] text-[${menuSeparatorColor}]`);
    }

    if (submenuTextColor) {
      classes.push(`text-[${submenuTextColor}]`);
    }

    const {
      menuTextPadding,
      menuTextMargin,
      submenuTextPadding,
      submenuTextMargin,

      menuFullWidth,
    } = attributes;

    for (const pos in menuTextPadding) {
      const positionValue = get(menuTextPadding, pos, '');
      if (positionValue !== '') {
        classes.push(`p${pos[0]}-[${positionValue}]`);
      }
    }
    for (const pos in submenuTextPadding) {
      const positionValue = get(menuTextPadding, pos, '');
      if (positionValue !== '') {
        classes.push(`p${pos[0]}-[${positionValue}]`);
      }
    }

    if (menuFullWidth) {
      classes.push('w-full');
    }

    const { fontSize, fontWeight, letterCase } = attributes;
    if (fontSize) {
      classes.push(`text-[${fontSize}px]`);
    }

    return `/* ${block.blockName} ${cn(classes)}*/`;
  }
}
