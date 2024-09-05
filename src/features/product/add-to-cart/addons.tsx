import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { useProductContext } from '@src/context/product-context';
import { uniq } from 'lodash';

const SelectElement = dynamic(() =>
  import('@src/features/product/addons/select').then((mod) => mod.AddOnsSelect)
);

const HeadingElement = dynamic(() =>
  import('@src/features/product/addons/heading').then((mod) => mod.AddOnsHeading)
);

const TextareaElement = dynamic(() =>
  import('@src/features/product/addons/textarea').then((mod) => mod.AddOnsTextarea)
);

export const AddToCartAddons = () => {
  const { product, fields } = useProductContext();
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
    <>
      {product.addons?.map((addon, key) => {
        switch (addon.type) {
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
                field={addon}
              />
            );
        }
      })}
    </>
  );
};
