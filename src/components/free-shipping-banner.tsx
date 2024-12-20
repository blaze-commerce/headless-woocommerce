import siteSettings from '@public/site.json';
import { useSiteContext } from '@src/context/site-context';
import { numberFormat } from '@src/lib/helpers/product';

export const FreeShippingBanner = () => {
  const { cart, availableFreeShippingMethod } = useSiteContext();
  const cartSubtotal = parseInt(cart?.subtotal || '0');

  if (!siteSettings.showFreeShippingBanner) return null;

  if (!availableFreeShippingMethod || cartSubtotal === 0) {
    return null;
  }

  const renderMessage = () => {
    const treshold = parseInt(availableFreeShippingMethod?.minAmount || '');

    if (cartSubtotal >= treshold) {
      // eslint-disable-next-line quotes
      return "Congratulations! you've got free DHL shipping";
    }

    const remaining = treshold - cartSubtotal;

    return `You're only ${numberFormat(remaining)} away from free shipping`;
  };

  return (
    <div className="bg-brand-primary text-white text-center text-xs lg:h-6 p-2.5 lg:p-1">
      {renderMessage()}
    </div>
  );
};
