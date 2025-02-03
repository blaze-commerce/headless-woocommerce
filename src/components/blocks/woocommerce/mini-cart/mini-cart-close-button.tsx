import { useSiteContext } from '@src/context/site-context';
import { HamburgerIcon } from '@src/components/svg/hamburger';
import { BlockComponentProps, ParsedBlock } from '@src/components/blocks';
import { find } from 'lodash';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import React from 'react';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { getBlockName } from '@src/lib/block';
import { getSvgContent } from '@src/components/blocks/outermost/IconBlock';
type MiniCartCloseButtonProps = {
  block: ParsedBlock;
};
export const MiniCartCloseButton = ({ block }: MiniCartCloseButtonProps) => {
  const { miniCartState } = useSiteContext();
  const [, setOpen] = miniCartState;

  const blockName = getBlockName(block);
  if ('CloseMiniCartButton' !== blockName) {
    return null;
  }

  const svgContent = getSvgContent(block.innerHTML);
  const attributes = block.attrs as BlockAttributes;

  return (
    <button
      type="button"
      className={cn('button-close-minicart', attributes.className)}
      onClick={() => setOpen(false)}
    >
      <ReactHTMLParser html={svgContent} />
    </button>
  );
};
