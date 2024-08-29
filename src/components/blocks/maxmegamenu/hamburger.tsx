import { useSiteContext } from '@src/context/site-context';
import { HamburgerIcon } from '@src/components/svg/hamburger';
import { BlockComponentProps } from '@src/components/blocks';
import { MaxMegaMenuAttributes } from '@src/components/blocks/maxmegamenu/block';
import { find } from 'lodash';

export const Hamburger = ({ block }: BlockComponentProps) => {
  const { setShowMenu } = useSiteContext();

  const attributes = block?.attrs as any;
  const color = find(attributes?.htmlAttributes, ['attribute', 'data-color']);

  return (
    <div
      className="full w-6 flex items-center justify-center hamburgermenu"
      onClick={() => setShowMenu(true)}
    >
      <HamburgerIcon fillColor={color.value || '#000'} />
    </div>
  );
};
