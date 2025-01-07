import { find } from 'lodash';

import { useSiteContext } from '@src/context/site-context';

import { HeartIcon } from '@src/components/svg/heart';
import { BlockAttributes } from '@src/lib/block/types';
import { Html } from '@src/components/blocks/core/html';
import { ParsedBlock } from '@src/components/blocks';
import { IconBlock } from '@src/components/blocks/outermost/IconBlock';

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
  const iconBlock = block.innerBlocks.length > 0 ? block.innerBlocks[0] : null;

  const renderCartIcon = () => {
    if (iconBlock && iconBlock.blockName === 'core/html') {
      return <Html block={iconBlock} />;
    } else if (iconBlock && iconBlock.blockName === 'outermost/icon-block') {
      return <IconBlock block={iconBlock} />;
    }

    return (
      <HeartIcon
        fillColor={fillColor}
        strokeColor={strokeColor}
      />
    );
  };

  return (
    <div className={attributes.className}>
      <div className="flex items-center gap-2 h-full">
        <button
          className=""
          onClick={() => setWishListIsOpen((prev: boolean) => !prev)}
        >
          {renderCartIcon()}
        </button>
      </div>
    </div>
  );
};
