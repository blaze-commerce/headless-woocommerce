import { useProductContext } from '@src/context/product-context';
import { NotifyMeWhenAvailableV2 } from '@src/features/product/notify-me-v2';

export const ProductNotifyMe = () => {
  const { product } = useProductContext();

  if (!product || !(product.isOutOfStock && !product.isBackorder)) return null;

  return <NotifyMeWhenAvailableV2 product={product} />;
};
