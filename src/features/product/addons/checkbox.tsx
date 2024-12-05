import { useEffect, useState } from 'react';
import { useAddToCartContext } from '@src/context/add-to-cart-context';
import { cn } from '@src/lib/helpers/helper';
import { ProductAddons } from '@src/models/product/types';
import { sanitizeTitle } from '@src/lib/helpers/helper';
import { AddOnsTitle } from './title';
import { AddOnsDescription } from './description';

type TProps = {
  field: ProductAddons;
};

export const AddOnsCheckbox = ({ field }: TProps) => {
  const { id: addonId, name, required, options } = field;
  const { addons } = useAddToCartContext();
  const [, setAddonItems] = addons;
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    // later we need to improve to calculate price by its option
    setAddonItems((prev) => {
      const items = prev.map((item) => {
        if (addonId === item.id) {
          return {
            ...item,
            quantity: selected.length,
            isCalculated: selected.length > 0,
          };
        }
        return item;
      });

      return items;
    });
  }, [selected, setAddonItems, addonId]);

  return (
    <div
      className={cn('addon-field-group checkbox-group', {
        required: required,
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
                selected: selected.includes(option.label),
              })}
            >
              <input
                type="checkbox"
                id={`${prefix}-${key}`}
                name={`${prefix}[]`}
                value={option.label}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelected((prev) => [...prev, option.label]);
                  } else {
                    setSelected((prev) => prev.filter((item) => item !== option.label));
                  }
                }}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
};
