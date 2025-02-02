import { useEffect } from 'react';
import { ProductAddons } from '@src/models/product/types';
import { AddOnsDescription } from '@src/features/product/addons/description';
import { AddOnsTitle } from '@src/features/product/addons/title';
import { Product } from '@src/models/product';
import { useProductContext } from '@src/context/product-context';
import { useAddToCartContext } from '@src/context/add-to-cart-context';
import { cn, sanitizeTitle } from '@src/lib/helpers/helper';

type TProps = {
  product: Product;
  field: ProductAddons;
  className?: string;
};

export const AddOnsSelect = ({ product, field }: TProps) => {
  const { fields } = useProductContext();
  const { addons } = useAddToCartContext();
  const { id: addonId, classNames = [] } = field;
  const [fieldsValue, setFieldsValue] = fields.value;
  const [addonItems, setAddonItems] = addons;

  const fieldId = `addon-${product.productId}-${field.id}`;

  useEffect(() => {
    if (!fieldsValue[fieldId]) return;

    const selectedOption = String(fieldsValue[fieldId]).split('-').slice(0, -1).join('-');

    const selectedPriceOption = field.options.find(
      (option) => sanitizeTitle(option.label) === selectedOption
    );

    console.log({ selected: selectedOption, selectedPriceOption, options: field.options });

    setAddonItems((prev) => {
      const items = prev.map((item) => {
        if (addonId === item.id) {
          return {
            ...item,
            quantity: 1,
            isCalculated: selectedPriceOption?.price ? true : false,
            price: selectedPriceOption?.price ?? 0,
            options: [],
          };
        }
        return item;
      });

      return items;
    });
  }, [fieldsValue]);

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
    <div
      className={cn('addon-field-group select-field', {
        [classNames.join(' ')]: classNames.length > 0,
      })}
    >
      <AddOnsTitle field={field} />
      <AddOnsDescription field={field} />
      <select
        name={fieldId}
        className="w-full"
        onChange={onChange}
      >
        <option value="">Select an option...</option>
        {field.options.map((option, key) => {
          const value = sanitizeTitle(option.label) + '-' + (key + 1);
          return (
            <option
              key={`select-${option.label}-${key}`}
              value={value}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
