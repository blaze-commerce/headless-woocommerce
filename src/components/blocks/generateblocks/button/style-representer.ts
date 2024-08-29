import { ParsedBlock } from '@src/components/blocks';
import { GENERATE_BLOCKS_BUTTON_BLOCK_NAME } from '@src/components/blocks/generateblocks/button/block';
import {
  StaticBlockStyleRepresenter,
  StaticImplements,
} from '@src/lib/block/block-style-representer';
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
import { get } from 'lodash';

@StaticImplements<StaticBlockStyleRepresenter>()
export class GenerateBlocksButtonStyleRepresenter {
  static blockName = GENERATE_BLOCKS_BUTTON_BLOCK_NAME;
  generateClassNames(block: ParsedBlock) {
    const attributes = (block.attrs as BlockAttributes) || {};
    const className = `gb-button-${attributes.uniqueId}`;
    const classes = [
      ...getSizingClasses(block),
      ...getSpacingClasses(block),
      ...getBorderClasses(block),
      ...getDisplayClasses(block),
      ...getSizingClasses(block),
      ...getTypographyClasses(block),
      ...getBackgroundClasses(block),
    ];

    return `.${className}{@apply ${cn(classes)} }`;
  }
}
