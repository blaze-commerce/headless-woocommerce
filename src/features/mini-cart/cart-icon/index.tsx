import { PushCart } from '@src/features/mini-cart/cart-icon/push-cart';
import { ShoppingBag } from '@src/features/mini-cart/cart-icon/shopping-bag';
import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';
import { Html } from '@src/components/blocks/core/html';
import { ParsedBlock } from '@src/components/blocks';
import { useIsClient } from 'usehooks-ts';

type Props = {
  showText: boolean;
  showIcon: boolean;
  label?: string;
  color?: string;
  iconBlock?: ParsedBlock | null;
};

export const CartBasketIcon: React.FC<Props> = ({ showText, label, color, iconBlock }) => {
  const {
    miniCartState: [, setMiniCartIsOpen],
    cart,
    calculateShipping,
    settings,
  } = useSiteContext();
  const { header } = settings as Settings;
  const isClient = useIsClient();
  const totalProductsInCart = cart?.totalProductsCount || 0;

  const cartIcon = header?.layout?.cartIcon;

  const handleMinicartOpen = () => {
    setMiniCartIsOpen((prev: boolean) => !prev);
    calculateShipping?.resetRates();
  };

  const renderCartIcon = () => {
    switch (cartIcon) {
      case '2':
        return (
          <ShoppingBag
            color={color}
            count={totalProductsInCart}
          />
        );
      default:
        return (
          <PushCart
            color={color}
            count={totalProductsInCart}
          />
        );
    }
  };

  return (
    <button
      className="button-cart"
      onClick={handleMinicartOpen}
    >
      {isClient && totalProductsInCart > 0 && (
        <span className="bg-[#fe3c3d] rounded-full w-4 h-4 text-center text-white text-[11px] absolute -top-1 -right-1">
          {totalProductsInCart}
        </span>
      )}

      {iconBlock && iconBlock.blockName === 'core/html' ? (
        <Html block={iconBlock} />
      ) : (
        renderCartIcon()
      )}
      <span className="hidden lg:inline-block">{showText && label}</span>
    </button>
  );
};
