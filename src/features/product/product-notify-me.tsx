import { useProductContext } from '@src/context/product-context';
import { NotifyMeWhenAvailable } from '@src/features/product/notify-me';

export const ProductNotifyMe = () => {
  const { product } = useProductContext();

  if (!product || !(product.isOutOfStock && !product.isBackorder)) return null;

  return <NotifyMeWhenAvailable product={product} />;
};
