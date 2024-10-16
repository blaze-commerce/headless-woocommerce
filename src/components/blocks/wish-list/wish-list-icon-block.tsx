import { find } from 'lodash';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { useSiteContext } from '@src/context/site-context';

import { HeartIcon } from '@src/components/svg/heart';
import { BlockAttributes } from '@src/lib/block/types';
import { Html } from '@src/components/blocks/core/html';

type Props = {
  block: ParsedBlock;
};

export const WishListIconBlock = ({ block }: Props) => {
  const attributes = block.attrs as BlockAttributes;
  const color = find(attributes?.htmlAttributes, ['attribute', 'data-color']);
  const {
    wishListState: [, setWishListIsOpen],
  } = useSiteContext();

  const fillColor = color?.value || '';
  const strokeColor = color?.value || '';

  // Get the first innerblocks if not empty
  const iconSvg = block.innerBlocks.length > 0 ? block.innerBlocks[0] : null;

  return (
    <div className={attributes.className}>
      <div className="flex items-center gap-2 h-full">
        <button
          className=""
          onClick={() => setWishListIsOpen((prev: boolean) => !prev)}
        >
          {iconSvg && iconSvg.blockName === 'core/html' ? (
            <Html block={iconSvg} />
          ) : (
            <HeartIcon
              fillColor={fillColor}
              strokeColor={strokeColor}
            />
          )}
        </button>
      </div>
    </div>
  );
};
