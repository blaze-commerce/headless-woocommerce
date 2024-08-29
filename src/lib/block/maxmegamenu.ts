import { ParsedBlock } from '@src/components/blocks';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';

export class MaxMegaMenu {
  static blockName = 'maxmegamenu/location';

  generateClasses(block: ParsedBlock) {
    const classes = [];
    const { submenuTextColor, menuTextColor } = (block.attrs as BlockAttributes) || {};
    if (submenuTextColor) {
      classes.push(`text-[${submenuTextColor}]`);
    }

    if (menuTextColor) {
      classes.push(`text-[${menuTextColor}]`);
    }

    return `/*${cn(classes)}*/`;
  }
}
