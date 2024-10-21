import { useSiteContext } from '@src/context/site-context';
import { HamburgerIcon } from '@src/components/svg/hamburger';
import { BlockComponentProps } from '@src/components/blocks';
import { MaxMegaMenuAttributes } from '@src/components/blocks/maxmegamenu/block';
import { find } from 'lodash';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import React from 'react';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

export const Hamburger = ({ block }: BlockComponentProps) => {
  const { setShowMenu } = useSiteContext();

  const attributes = block?.attrs as BlockAttributes;
  const color = find(attributes?.htmlAttributes, ['attribute', 'data-color']);

  return (
    <div
      className={cn(
        'flex items-center justify-center hamburgermenu cursor-pointer',
        attributes?.className
      )}
      onClick={() => setShowMenu(true)}
    >
      {'core/html' === block.blockName ? (
        <ReactHTMLParser html={block.innerHTML} />
      ) : (
        <HamburgerIcon fillColor={color?.value || '#000'} />
      )}
    </div>
  );
};
