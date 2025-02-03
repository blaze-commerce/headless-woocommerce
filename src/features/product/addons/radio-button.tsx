import { useState } from 'react';
import { cn } from '@src/lib/helpers/helper';
import { ProductAddons } from '@src/models/product/types';
import { Product } from '@src/models/product';
import { sanitizeTitle } from '@src/lib/helpers/helper';
import { AddOnsTitle } from './title';
import { AddOnsDescription } from './description';

type TProps = {
  field: ProductAddons;
  product: Product;
  onChange: (_value: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AddOnsRadioButton = ({ field, product, onChange }: TProps) => {
  const { name, required, options, classNames = [] } = field;
  const [selected, setSelected] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelected(value);
    onChange(e);
  };

  return (
    <div
      className={cn('addon-field-group radio-group', {
        required: required,
        [classNames?.join(' ')]: classNames?.length > 0,
      })}
    >
      <AddOnsTitle field={field} />
      <AddOnsDescription field={field} />
      <div className="addon-field-options">
        {options?.map((option, key) => {
          const prefix = sanitizeTitle(`addon-${name}`);
          return (
            <label
              htmlFor={`${prefix}-${key}`}
              key={`${prefix}-${key}`}
              className={cn('addon-option', {
                selected: selected === sanitizeTitle(option.label),
              })}
            >
              <input
                type="radio"
                id={`${prefix}-${key}`}
                name={`addon-${product.productId}-${field.id}`}
                value={sanitizeTitle(option.label)}
                className={prefix}
                onChange={handleChange}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
};
