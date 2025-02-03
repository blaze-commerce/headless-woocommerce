import { ParsedBlock } from '@src/components/blocks';
import { cn } from '@src/lib/helpers/helper';

import { getTypographyClasses } from '@src/lib/block';

export const WooCommerceStyleRepresenter = (block: ParsedBlock) => {
  const className = `${block.id}`;

  const classes = [...getTypographyClasses(block)];

  if (classes.length === 0) return '';

  return `.${className}{@apply ${cn(classes)} }`;
};
