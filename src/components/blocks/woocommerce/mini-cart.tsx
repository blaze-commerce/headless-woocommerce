import { ParsedBlock } from '@src/components/blocks';
import { CartBasketIcon } from '@src/features/mini-cart/cart-icon';
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
  const iconColor = color?.value || attributes.iconColor?.color;
  // Get the first innerblocks if not empty
  const iconSvg = block.innerBlocks.length > 0 ? block.innerBlocks[0] : null;

  return (
    <div className={attributes?.className}>
      <CartBasketIcon
        showText={false}
        showIcon={true}
        color={iconColor ?? '#F7F7F7'}
        iconBlock={iconSvg}
      />
    </div>
  );
};
