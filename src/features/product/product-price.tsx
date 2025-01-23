import dynamic from 'next/dynamic';

import { useSiteContext } from '@src/context/site-context';
import { useProductContext } from '@src/context/product-context';
import { cn } from '@src/lib/helpers/helper';

type Props = {
  id?: string;
  className?: string;
};

const BundlePrice = dynamic(() =>
  import('@src/features/product/price/bundle').then((mod) => mod.BundlePrice)
);

const GiftCardPrice = dynamic(() =>
  import('@src/features/product/price/gift').then((mod) => mod.GiftCardPrice)
);

const SimplePrice = dynamic(() =>
  import('@src/features/product/price/simple').then((mod) => mod.SimplePrice)
);

const VariablePrice = dynamic(() =>
  import('@src/features/product/price/variant').then((mod) => mod.VariablePrice)
);

const DiscountRules = dynamic(() =>
  import('@src/features/product/price/discount-rules').then((mod) => mod.DiscountRules)
);

export const ProductPrice: React.FC<Props> = ({ id, className }) => {
  const { product } = useProductContext();
  const { settings, currentCurrency } = useSiteContext();

  if (!product) return null;

  const priceDisplaySuffix = settings?.priceDisplaySuffix || '';

  if (product.isFree(currentCurrency as string)) {
    return <div className={cn('price ', className)}>Free</div>;
  }

  return (
    <>
      <div className={cn('price-container', id, className)}>
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
        ) : product.isGiftCard ? (
          <GiftCardPrice
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

      {product.discountRules && <DiscountRules />}
      {product?.categoriesArray?.includes('patches') && (
        <>
          <p>
            Customization available with a minimum order of 25 patches. Contact us at{' '}
            <a
              href="mailto:support@squadronnostalgia.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              support@squadronnostalgia.com
            </a>{' '}
            for details
          </p>
        </>
      )}
    </>
  );
};
