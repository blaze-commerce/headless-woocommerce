import { EmptyBagIcon } from '@components/svg/empty-bag';
import { ShoppingBagIcon } from '@components/svg/shopping-bag';
import { useSiteContext } from '@src/context/site-context';

type Props = {
  count: number;
  color?: string;
};

export const ShoppingBag: React.FC<Props> = ({ count, color }) => {
  const { settings } = useSiteContext();
  return count > 0 ? (
    <>
      <span className="cart-icon-count shopping-bag-icon-count absolute rounded-full text-white flex items-center justify-center pr-0.5 text-xs">
        {count}
      </span>
      <ShoppingBagIcon fillColor={settings?.header?.layout?.cartIconFilledColor || color} />
    </>
  ) : (
    <EmptyBagIcon fillColor={settings?.header?.customColors?.link?.color || color || ''} />
  );
};
