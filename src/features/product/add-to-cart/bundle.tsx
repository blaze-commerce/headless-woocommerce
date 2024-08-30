import dynamic from 'next/dynamic';

import { useProductContext } from '@src/context/product-context';
import { useProductBundle } from '@src/lib/hooks/product';

const ProductVariationBundle = dynamic(() =>
  import('@src/features/product/bundles/variation').then((mod) => mod.ProductVariationBundle)
);

export const AddToCartBundle = () => {
  const { product } = useProductContext();
  const bundles = useProductBundle(product);

  if (!product || !product.hasBundle) return null;

  return (
    <>
      {bundles &&
        bundles?.products?.map((bundle, key) => {
          if (bundle?.variations) {
            return (
              <ProductVariationBundle
                key={`variation-bundle-${key}-${bundle.product.id}`}
                bundle={bundle}
              />
            );
          }
        })}
      {bundles === null && <div className="loading-placeholder w-full h-24"></div>}
    </>
  );
};
