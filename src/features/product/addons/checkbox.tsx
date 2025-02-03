import { useEffect, useState, useRef } from 'react';
import { useAddToCartContext } from '@src/context/add-to-cart-context';
import { useProductContext } from '@src/context/product-context';
import { cn } from '@src/lib/helpers/helper';
import { ProductAddons } from '@src/models/product/types';
import { Product } from '@src/models/product';
import { sanitizeTitle } from '@src/lib/helpers/helper';
import { AddOnsTitle } from './title';
import { AddOnsDescription } from './description';

type TProps = {
  field: ProductAddons;
  product: Product;
};

export const AddOnsCheckbox = ({ field, product }: TProps) => {
  const { id: addonId, name, required, options, classNames = [] } = field;
  const { addons } = useAddToCartContext();
  const { fields: formFields } = useProductContext();
  const [, setFieldsValue] = formFields.value;
  const [, setAddonItems] = addons;
  const [selected, setSelected] = useState<string[]>([]);

  const fieldName = `addon-${product.productId}-${field.id}`;

  useEffect(() => {
    // later we need to improve to calculate price by its option
    setAddonItems((prev) => {
      const items = prev.map((item) => {
        if (addonId === item.id) {
          return {
            ...item,
            quantity: selected.length,
            isCalculated: selected.length > 0,
            options: options
              .filter((option) => selected.includes(sanitizeTitle(option.label)))
              .map((option) => ({
                ...option,
                priceType: option.price_type,
              })),
          };
        }
        return item;
      });

      return items;
    });

    setFieldsValue((prev) => {
      return {
        ...prev,
        [`${fieldName}`]: selected.map((item) => item.toLowerCase().replace(/\s/g, '-')),
      };
    });
  }, [selected, setAddonItems, addonId, setFieldsValue, fieldName, options]);

  return (
    <div
      className={cn('addon-field-group checkbox-group', {
        required: required,
        selected: selected.length > 0,
        [classNames.join(' ')]: classNames.length > 0,
      })}
    >
      <AddOnsTitle field={field} />
      <AddOnsDescription field={field} />
      <div className="addon-field-options">
        {options?.map((option) => {
          const prefix = sanitizeTitle(`addon-${name}`);
          const optionValue = sanitizeTitle(option.label);
          return (
            <label
              htmlFor={`${prefix}-${addonId}`}
              key={`${prefix}-${addonId}`}
              className={cn('addon-option', {
                selected: selected.includes(optionValue),
              })}
            >
              <input
                type="checkbox"
                id={`${prefix}-${addonId}`}
                name={`${fieldName}[]`}
                value={optionValue}
                className={`${prefix} field-${field.id}`}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelected((prev) => [...prev, optionValue]);
                  } else {
                    setSelected((prev) => prev.filter((item) => item !== optionValue));
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
