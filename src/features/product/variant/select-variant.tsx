import { find, isEmpty, uniq } from 'lodash';
import { useEffect, useRef } from 'react';
import { useEffectOnce } from 'usehooks-ts';

import { useProductContext } from '@src/context/product-context';
import { Attribute, Image } from '@src/models/product/types';
import { useAttributeParams } from '@src/lib/hooks/product';

type Props = {
  attribute: Attribute;
  image?: Image[];
};

export const SelectVariant: React.FC<Props> = ({ attribute }) => {
  const attributeParams = useAttributeParams();

  const {
    product,
    actions: { onAttributeSelect },
    state: { selectedAttributes },
    variation: {
      image: [, setImageThumbnailAttribute],
    },
    fields: {
      required: [, setRequiredFields],
      value: [, setFieldValue],
    },
  } = useProductContext();

  const { name, label, options } = attribute;
  const attributeImageSrc = product?.variantImageSrc;
  const selectedRef = useRef(!isEmpty(selectedAttributes[name]) ? selectedAttributes[name] : '');

  useEffectOnce(() => {
    setRequiredFields((prev) => uniq([...prev, name]));
    setFieldValue((prev) => ({ ...prev, [name]: '' }));
  });

  useEffect(() => {
    if (!isEmpty(attributeParams[name]) && !isEmpty(name)) {
      const foundAttribute = find(attributeImageSrc, attributeParams);
      if (!isEmpty(foundAttribute)) {
        setImageThumbnailAttribute(foundAttribute as Image);
      }
      onAttributeSelect(name, attributeParams[name]);
      selectedRef.current = attributeParams[name];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributeParams]);

  if (isEmpty(product?.variantImageSrc)) return null;

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentImageSrc = find(attributeImageSrc, [name, e.target.value]);
    setImageThumbnailAttribute(currentImageSrc as Image);
    onAttributeSelect(name, e.target.value);
    selectedRef.current = e.target.value;
    setFieldValue((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div className="product-variant-select">
      <label
        className="product-variant-select__label"
        htmlFor={name}
      >
        {label}:
      </label>
      <select
        className="product-variant-select__select"
        name={name}
        id={name}
        onChange={handleOnChange}
        value={selectedRef.current}
      >
        <option value="">Select Variant</option>
        {options.map((option) => (
          <option
            key={option.name}
            value={option.name}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
