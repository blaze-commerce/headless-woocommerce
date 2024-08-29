import { CartBasketIcon } from '@src/features/mini-cart/cart-icon';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import { find } from 'lodash';

type Props = {
  block: ParsedBlock;
  force?: boolean;
};

export const MiniCart = ({ block, force = false }: Props) => {
  if (!force && 'woocommerce/mini-cart' !== block.blockName) {
    return null;
  }

  const attributes = block.attrs as any;
  const color = find(attributes?.htmlAttributes, ['attribute', 'data-color']);

  return (
    <div>
      <CartBasketIcon
        showText={false}
        showIcon={true}
        color={color?.value || attributes.iconColor?.color}
      />
    </div>
  );
};
