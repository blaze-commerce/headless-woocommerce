import { useProductContext } from '@src/context/product-context';
import { useAttributeParams } from '@src/lib/hooks/product';
import { Attribute } from '@src/models/product/types';
import { find, isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

type Props = {
  attribute: Attribute;
};

export const BoxedVariant: React.FC<Props> = ({ attribute }) => {
  const attributeParams = useAttributeParams();

  const {
    product,
    actions: { onAttributeSelect },
  } = useProductContext();
  const { name, label, options } = attribute;

  const [currentAttributeLabel, setCurrentAttributeLabel] = useState('');

  useEffect(() => {
    if (!isEmpty(attributeParams[name]) && !isEmpty(name)) {
      const foundLabel = find(options, { slug: attributeParams[name] });
      if (!isEmpty(foundLabel)) {
        setCurrentAttributeLabel(foundLabel.label);
      }
      onAttributeSelect(name, attributeParams[name]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributeParams]);

  if (isEmpty(product?.variantImageSrc)) return null;

  const handleOnChange = (value: string, label: string) => {
    setCurrentAttributeLabel(label);
    onAttributeSelect(name, value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1 capitalize">{label}:</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <label
            htmlFor={`${name}-${option.name}`}
            key={`boxed-variant-${option.name}-${index}`}
          >
            <input
              className="peer hidden"
              type="radio"
              name={name}
              id={`${name}-${option.name}`}
              checked={currentAttributeLabel === option.label}
              value={option.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleOnChange(e.target.value, option.label);
              }}
            />
            <div className="cursor-pointer rounded border peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:border-2 py-2 px-8 h-full flex items-center justify-center text-center text-black/80 ">
              {option.label}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
