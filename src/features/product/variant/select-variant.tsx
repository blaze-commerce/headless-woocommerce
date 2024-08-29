import { find, isEmpty } from 'lodash';

import { useProductContext } from '@src/context/product-context';
import { Attribute, Image } from '@src/models/product/types';
import { useAttributeParams } from '@src/lib/hooks/product';
import { useEffect, useRef } from 'react';

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
  } = useProductContext();
  const { name, label, options } = attribute;
  const attributeImageSrc = product?.variantImageSrc;
  const selectedRef = useRef(!isEmpty(selectedAttributes[name]) ? selectedAttributes[name] : '');

  useEffect(() => {
    if (!isEmpty(attributeParams[name]) && !isEmpty(name)) {
      const foundAttribute = find(attributeImageSrc, attributeParams);
      if (!isEmpty(foundAttribute)) {
        setImageThumbnailAttribute(foundAttribute as Image);
      }
      onAttributeSelect(name, attributeParams[name]);
      selectedRef.current = attributeParams[name];
    }
  }, [attributeParams]);

  if (isEmpty(product?.variantImageSrc)) return null;

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentImageSrc = find(attributeImageSrc, [name, e.target.value]);
    setImageThumbnailAttribute(currentImageSrc as Image);
    onAttributeSelect(name, e.target.value);
  };

  return (
    <div className="mb-4">
      <label
        className="block text-sm font-bold mb-1 capitalize"
        htmlFor={name}
      >
        {label}:
      </label>
      <select
        className="w-full border p-2"
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
