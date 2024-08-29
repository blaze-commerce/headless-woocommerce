import { useProductContext } from '@src/context/product-context';

export const BundleInfo: React.FC = () => {
  const { product } = useProductContext();

  if (!product || product.productType !== 'bundle' || !product?.bundle) return null;

  return (
    <div className="pb-4">
      {product?.bundle.products.map((bundleProduct, index) => (
        <div key={`bundle-information-${index}`}>
          <h3 className="font-medium text-xl leading-10 text-[#191E34]">
            {bundleProduct.settings.title}
          </h3>
        </div>
      ))}
    </div>
  );
};
