import { useSiteContext } from '@src/context/site-context';
import { useProductContext } from '@src/context/product-context';
import { StockStatus } from '@src/features/product/stock-status';

export const ProductStockStatus = () => {
  const { settings, currentCurrency } = useSiteContext();
  const { product } = useProductContext();

  if (!product) return null;

  if (!settings?.product?.productDetails.showStockInformation || product.isFree(currentCurrency)) {
    return null;
  }

  return (
    <StockStatus
      product={product}
      settings={settings}
    />
  );
};
