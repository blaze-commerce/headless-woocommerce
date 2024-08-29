import { LoginMenuPopup } from '@src/components/header/account/login-menu-popup';
import { BlockAttributes } from '@src/lib/block/types';
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

  return (
    <div>
      <LoginMenuPopup
        color={color?.value || attributes?.style?.color?.text}
        displayType="icon_only"
      />
    </div>
  );
};
