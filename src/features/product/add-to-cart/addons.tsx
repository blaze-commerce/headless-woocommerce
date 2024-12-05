import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useProductContext } from '@src/context/product-context';
import { useAddToCartContext } from '@src/context/add-to-cart-context';
import { uniq } from 'lodash';
import { TAddOnItem } from '@src/types/addToCart';
import { AddOnsPriceBreakdown } from '@src/features/product/addons/price-breakdown';

const SelectElement = dynamic(() =>
  import('@src/features/product/addons/select').then((mod) => mod.AddOnsSelect)
);

const HeadingElement = dynamic(() =>
  import('@src/features/product/addons/heading').then((mod) => mod.AddOnsHeading)
);

const TextareaElement = dynamic(() =>
  import('@src/features/product/addons/textarea').then((mod) => mod.AddOnsTextarea)
);

const CheckboxElement = dynamic(() =>
  import('@src/features/product/addons/checkbox').then((mod) => mod.AddOnsCheckbox)
);

const MultiplierElement = dynamic(() =>
  import('@src/features/product/addons/input-multiplier').then((mod) => mod.AddOnsInputMultiplier)
);

export const AddToCartAddons = () => {
  const { product, fields } = useProductContext();
  const { addons } = useAddToCartContext();
  const [, setAddonItems] = addons;
  const [, setRequiredFields] = fields.required;
  const [, setFieldsValue] = fields.value;

  useEffect(() => {
    if (!product || !product.addons) return;

    const required = product.addons.filter((addon) => addon.required);
    setRequiredFields((prev) => {
      const fields: string[] = [];

      required.forEach((addon) => {
        fields.push(`addon-${product.productId}-${addon.position + 1}`);
      });

      return uniq([...prev, ...fields]);
    });

    const items: TAddOnItem[] = [];

    product.addons.forEach((addon) => {
      items.push({
        id: addon.id,
        name: addon.name,
        price: parseFloat(addon.price === '' ? '0' : addon.price),
        priceType: addon.priceType,
        quantity: 0,
        isCalculated: false,
      });
    });
    setAddonItems(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  if (!product || !product.addons) return null;

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFieldsValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="product-addon-container">
      {product.addons?.map((addon, key) => {
        switch (addon.type) {
          case 'checkbox':
            return (
              <CheckboxElement
                key={`addon-field-${key}`}
                field={addon}
                product={product}
              />
            );

          case 'input_multiplier':
            return (
              <MultiplierElement
                key={`addon-field-${key}`}
                field={addon}
                product={product}
              />
            );

          case 'multiple_choice':
            return (
              <SelectElement
                key={`addon-field-${key}`}
                product={product}
                field={addon}
                onChange={onChange}
              />
            );

          case 'custom_text':
            return (
              <TextareaElement
                key={`addon-field-${key}`}
                field={addon}
                onChange={onChange}
              />
            );

          case 'heading':
            return (
              <HeadingElement
                key={`addon-field-${key}`}
                heading="h3"
                {...addon}
              />
            );
        }
      })}
      <AddOnsPriceBreakdown />
    </div>
  );
};
