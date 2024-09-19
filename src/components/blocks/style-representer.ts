import { ParsedBlock } from '@src/components/blocks';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';

import {
  getBackgroundClasses,
  getBorderClasses,
  getDisplayClasses,
  getSizingClasses,
  getSpacingClasses,
  getTypographyClasses,
} from '@src/lib/block';

export class DefaultBlockStyleRepresenter {
  generateClassNames(block: ParsedBlock) {
    const className = `gt-block-${block.id}`;
    const classes = [
      ...getSizingClasses(block),
      ...getSpacingClasses(block),
      ...getBorderClasses(block),
      ...getDisplayClasses(block),
      ...getSizingClasses(block),
      ...getTypographyClasses(block),
      ...getBackgroundClasses(block),
    ];

    if (classes.length === 0) return '';

    return `.${className}{@apply ${cn(classes)} }`;
  }
}
