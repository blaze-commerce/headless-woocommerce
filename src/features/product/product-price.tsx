import dynamic from 'next/dynamic';

import { useSiteContext } from '@src/context/site-context';
import { useProductContext } from '@src/context/product-context';
import { cn } from '@src/lib/helpers/helper';

type Props = {
  className?: string;
};

const BundlePrice = dynamic(() =>
  import('@src/features/product/price/bundle').then((mod) => mod.BundlePrice)
);

const SimplePrice = dynamic(() =>
  import('@src/features/product/price/simple').then((mod) => mod.SimplePrice)
);

const VariablePrice = dynamic(() =>
  import('@src/features/product/price/variant').then((mod) => mod.VariablePrice)
);

export const ProductPrice: React.FC<Props> = ({ className }) => {
  const { product } = useProductContext();
  const { settings } = useSiteContext();

  if (!product) return null;

  const priceDisplaySuffix = settings?.priceDisplaySuffix || '';

  return (
    <>
      <div className={cn('price-container', className)}>
        {product.hasVariations ? (
          <VariablePrice
            product={product}
            isTaxExclusive={settings?.isTaxExclusive as boolean}
          />
        ) : product.hasBundle ? (
          <BundlePrice
            product={product}
            isTaxExclusive={settings?.isTaxExclusive as boolean}
          />
        ) : (
          <SimplePrice
            product={product}
            isTaxExclusive={settings?.isTaxExclusive as boolean}
          />
        )}
        {priceDisplaySuffix && <span className="product-suffix"> {priceDisplaySuffix}</span>}
      </div>
    </>
  );
};
