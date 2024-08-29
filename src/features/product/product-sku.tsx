import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';

export const ProductSKU = () => {
  const {
    product,
    state: { matchedVariant },
  } = useProductContext();
  const { settings } = useSiteContext();

  if (!product) return null;

  if (!settings?.product?.productDetails.showSku) return null;
  if (product.hasVariations) {
    if (!matchedVariant || !matchedVariant.sku) {
      return null;
    }

    return (
      <p className="mb-4 text-xs font-normal leading-none border-b pb-4">
        SKU: {matchedVariant.sku}
      </p>
    );
  }
  return <p className="mb-4 text-xs font-normal leading-none border-b pb-4">SKU: {product.sku}</p>;
};
