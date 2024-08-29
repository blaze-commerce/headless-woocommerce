import { CartIcon } from '@src/components/svg/cart';
import { EmptyCartIcon } from '@src/components/svg/empty-cart';
import { useSiteContext } from '@src/context/site-context';

type Props = {
  count: number;
  color?: string;
};

export const PushCart: React.FC<Props> = ({ count, color }) => {
  const { settings } = useSiteContext();
  return count > 0 ? (
    <>
      <span className="cart-icon-count push-cart-icon-count absolute rounded-full text-white flex items-center justify-center text-xs">
        {count}
      </span>
      <CartIcon fillColor={color || settings?.header?.layout?.cartIconFilledColor} />
    </>
  ) : (
    <EmptyCartIcon fillColor={color || settings?.header?.customColors?.link?.color || ''} />
  );
};
