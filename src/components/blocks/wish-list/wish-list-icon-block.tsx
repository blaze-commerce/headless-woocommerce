import { find } from 'lodash';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { useSiteContext } from '@src/context/site-context';

import { HeartIcon } from '@src/components/svg/heart';
import { BlockAttributes } from '@src/lib/block/types';

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

  return (
    <div className={attributes.className}>
      <div className="flex items-center gap-2 h-full">
        <button
          className=""
          onClick={() => setWishListIsOpen((prev: boolean) => !prev)}
        >
          <HeartIcon
            fillColor={fillColor}
            strokeColor={strokeColor}
          />
        </button>
      </div>
    </div>
  );
};
