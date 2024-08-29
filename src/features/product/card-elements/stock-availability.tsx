import { cn } from '@src/lib/helpers/helper';
import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';

export const CardStockAvailability = () => {
  const { product } = useProductContext();
  const { settings } = useSiteContext();

  if (!product) return null;

  return (
    <>
      {product.stockStatus === 'outofstock' && (
        <div className={cn('absolute inset-x-0 flex items-end overflow-hidden top-0 py-2.5')}>
          <p className="w-full text-center relative uppercase text-brand-primary text-xs md:text-base font-bold bg-white -mb-3 opacity-75 h-11 flex items-center justify-center">
            {settings?.shop?.options?.outOfStockMessage ?? 'OUT OF STOCK'}
          </p>
        </div>
      )}
    </>
  );
};
