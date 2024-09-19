import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useProductContext } from '@src/context/product-context';
import { ObjectData, ProductBundle } from '@src/models/product/types';
import { Divider } from '@src/components/common/divider';
import { useEffect } from 'react';
import { uniq } from 'lodash';

const ProductVariableBundle = dynamic(() =>
  import('./variable').then((mod) => mod.ProductVariableBundle)
);

type TProductVariationBundle = {
  bundle: ProductBundle;
};

export const ProductVariationBundle = ({ bundle }: TProductVariationBundle) => {
  const { fields, outOfStockStatus } = useProductContext();
  const [requiredFields, setRequiredFields] = fields.required;
  const [, setFieldsValue] = fields.value;
  const [, setOutOfStockStatus] = outOfStockStatus;

  useEffect(() => {
    const controller = new AbortController();

    if (!bundle?.variations || !bundle?.product) return;

    if (bundle.product.stockStatus === 'outofstock' && bundle.settings.optional === false) {
      setOutOfStockStatus(true);
    } else {
      const fieldKey = bundle.variations[0].name;
      const variationFieldKey = `bundle_variation_id_${bundle.product.bundleId}`;
      const variationQuantityKey = `bundle_quantity_${bundle.product.bundleId}`;

      if (bundle.settings.optional === false && !requiredFields.includes(fieldKey)) {
        setRequiredFields((prev: string[]) => uniq([...prev, fieldKey]));
      }

      setFieldsValue((prev: ObjectData) => {
        return {
          ...prev,
          ...{
            [fieldKey]: '',
            [variationFieldKey]: '',
            [variationQuantityKey]: bundle.settings.defaultQuantity,
          },
        };
      });
    }

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bundle]);

  return (
    <div className="product-bundle-variation relative">
      <div className="flex gap-4">
        {bundle.product?.image && (
          <figure className="w-24 h-24 overflow-hidden object-cover flex-shrink-0">
            <Image
              width={96}
              height={96}
              className="object-cover"
              src={bundle.product.image}
              alt={bundle.settings.title}
            />
          </figure>
        )}
        <div className="flex-grow-0 w-full">
          {bundle?.variations &&
            bundle.variations.map((variation) => (
              <ProductVariableBundle
                bundleId={bundle.product.bundleId}
                title={bundle.settings.title}
                description={bundle.settings.description}
                key={variation.id}
                variation={variation}
                required={!bundle.settings.optional}
              />
            ))}
        </div>
      </div>
      <Divider className="pb-4" />
    </div>
  );
};
