import { BoxedVariant } from '@src/features/product/variant/boxed-variant';
import { SelectVariant } from '@src/features/product/variant/select-variant';
import { ImageVariant } from '@src/features/product/variant/image-variant';
import { useProductContext } from '@src/context/product-context';
import { Attribute } from '@src/models/product/types';

export const Variant = () => {
  const { product, additionalData } = useProductContext();

  const availableAttributes = product?.getAvailableAttributes();

  const renderVariant = (attribute: Attribute, key: Number) => {
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
  };

  return (
    <div>
      {availableAttributes?.map((attribute: Attribute, key: Number) =>
        renderVariant(attribute, key)
      )}
    </div>
  );
};
