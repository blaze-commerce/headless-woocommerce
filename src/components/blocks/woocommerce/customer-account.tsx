import { LoginMenuPopup } from '@src/components/header/account/login-menu-popup';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import { find } from 'lodash';

type Props = {
  block: ParsedBlock;
  force?: boolean;
};

export const CustomerAccount = ({ block, force = false }: Props) => {
  if (!force && 'woocommerce/customer-account' !== block.blockName) {
    return null;
  }

  const attributes = block.attrs as any;
  const color = find(attributes?.htmlAttributes, ['attribute', 'data-color']);

  // Get the first innerblocks if not empty
  const iconSvg = block.innerBlocks.length > 0 ? block.innerBlocks[0] : null;

  return (
    <div>
      <LoginMenuPopup
        color={color?.value || attributes?.style?.color?.text}
        displayType="icon_only"
        iconBlock={iconSvg}
      />
    </div>
  );
};
