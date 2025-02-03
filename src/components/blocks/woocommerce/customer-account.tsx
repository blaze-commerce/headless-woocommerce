import { ParsedBlock } from '@src/components/blocks';
import { LoginMenuPopup } from '@src/components/header/account/login-menu-popup';
import { convertAttributes } from '@src/lib/block';
import { find } from 'lodash';

type Props = {
  block: ParsedBlock;
  force?: boolean;
};

export const CustomerAccount = ({ block, force = false }: Props) => {
  if (!force && 'woocommerce/customer-account' !== block.blockName) {
    return null;
  }

  const attributes = convertAttributes(block.attrs as any);

  // Get the first innerblocks if not empty
  const iconSvg = block.innerBlocks.length > 0 ? block.innerBlocks[0] : null;
  const label = block.innerBlocks.length > 0 ? block.innerBlocks[1] : null;

  return (
    <div>
      <LoginMenuPopup
        color={attributes.color || attributes?.style?.color?.text}
        iconBlock={iconSvg}
        label={label}
        hasChevronDownIcon={attributes.hasChevronDown}
      />
    </div>
  );
};
