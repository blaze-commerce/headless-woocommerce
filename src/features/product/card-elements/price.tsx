import { CSSProperties } from 'react';
import dynamic from 'next/dynamic';

import { useSiteContext } from '@src/context/site-context';
import { Product } from '@src/models/product';
import { cn } from '@src/lib/helpers/helper';

const BundlePrice = dynamic(() =>
  import('@src/features/product/price/bundle').then((mod) => mod.BundlePrice)
);

const SimplePrice = dynamic(() =>
  import('@src/features/product/price/simple').then((mod) => mod.SimplePrice)
);

const VariablePrice = dynamic(() =>
  import('@src/features/product/price/variant').then((mod) => mod.VariablePrice)
);

const GiftCardPrice = dynamic(() =>
  import('@src/features/product/price/gift').then((mod) => mod.GiftCardPrice)
);

type Props = {
  currency: string;
  product: Product;
  style?: CSSProperties;
  className?: string;
  isTaxExclusive?: boolean;
};

export const CardPrice: React.FC<Props> = ({
  product,
  currency,
  isTaxExclusive = false,
  className,
}) => {
  const { settings } = useSiteContext();

  if (!product) return null;

  if (product.isFree(currency)) return null;

  const priceDisplaySuffix = settings?.priceDisplaySuffix || '';

  return (
    <div className={cn('price mb-0', className, `product-${product.productType}`)}>
      {product.hasVariations ? (
        <VariablePrice
          product={product}
          isTaxExclusive={isTaxExclusive}
        />
      ) : product.hasBundle ? (
        <BundlePrice
          product={product}
          isTaxExclusive={isTaxExclusive}
        />
      ) : product.isGiftCard ? (
        <GiftCardPrice
          product={product}
          isTaxExclusive={isTaxExclusive}
        />
      ) : (
        <SimplePrice
          product={product}
          isTaxExclusive={isTaxExclusive}
        />
      )}
      {priceDisplaySuffix && (
        <span className="text-sm leading-4 w-full md:w-auto text-[#888888]">
          {priceDisplaySuffix}
        </span>
      )}
    </div>
  );
};
