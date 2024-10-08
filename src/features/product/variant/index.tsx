import dynamic from 'next/dynamic';

import { useProductContext } from '@src/context/product-context';
import { Attribute } from '@src/models/product/types';

const BoxedVariant = dynamic(() =>
  import('@src/features/product/variant/boxed-variant').then((mod) => mod.BoxedVariant)
);

const SelectVariant = dynamic(() =>
  import('@src/features/product/variant/select-variant').then((mod) => mod.SelectVariant)
);

const ImageVariant = dynamic(() =>
  import('@src/features/product/variant/image-variant').then((mod) => mod.ImageVariant)
);

export const Variant = () => {
  const { product, additionalData } = useProductContext();

  const availableAttributes = product?.getAvailableAttributes();

  return (
    <div className="product-variant-container">
      {availableAttributes?.map((attribute: Attribute, key: Number) => {
        switch (additionalData?.attributeDisplayType[attribute.name]) {
          case 'boxed':
            return (
              <BoxedVariant
                attribute={attribute}
                key={`boxed-variant-${key}`}
              />
            );
          case 'image':
            return (
              <ImageVariant
                attribute={attribute}
                key={`image-variant-${key}`}
              />
            );
          default:
            return (
              <SelectVariant
                attribute={attribute}
                key={`select-variant-${key}`}
              />
            );
        }
      })}
    </div>
  );
};
