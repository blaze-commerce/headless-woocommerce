import { useSiteContext } from '@src/context/site-context';
import { HamburgerIcon } from '@src/components/svg/hamburger';
import { BlockComponentProps } from '@src/components/blocks';
import { MaxMegaMenuAttributes } from '@src/components/blocks/maxmegamenu/block';
import { find } from 'lodash';
import { BlockAttributes } from '@src/lib/block/types';
import HTMLReactParser from 'html-react-parser';
import { cn } from '@src/lib/helpers/helper';

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
        <>{HTMLReactParser(block.innerHTML)}</>
      ) : (
        <HamburgerIcon fillColor={color?.value || '#000'} />
      )}
    </div>
  );
};
