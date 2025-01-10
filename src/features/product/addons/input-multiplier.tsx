import { v4 } from 'uuid';
import { cn, formatPriceWithCurrency } from '@src/lib/helpers/helper';
import { ProductAddons } from '@src/models/product/types';
import { Product } from '@src/models/product';
import { useSiteContext } from '@src/context/site-context';
import { useAddToCartContext } from '@src/context/add-to-cart-context';
import { debounce } from 'lodash';

import { AddOnsTitle } from './title';
import { AddOnsDescription } from './description';
import { useProductContext } from '@src/context/product-context';

type TProps = {
  field: ProductAddons;
  product: Product;
};

export const AddOnsInputMultiplier = ({ field, product }: TProps) => {
  const { currentCountry } = useSiteContext();
  const { fields: formFields } = useProductContext();
  const [, setFieldsValue] = formFields.value;
  const { addons } = useAddToCartContext();
  const [, setAddonItems] = addons;
  const { id, name, required, adjust_price, price, min, max } = field;
  const fieldName = `addon-${product.productId}-${field.position}`;

  let title = name;

  if (adjust_price) {
    title += ` (+${formatPriceWithCurrency(price, currentCountry)})`;
  }

  const debounceOnChange = debounce((e) => {
    const value = Number(e.target.value);

    setAddonItems((prev) => {
      const items = prev.map((item) => {
        if (id === item.id) {
          return {
            ...item,
            quantity: value,
            isCalculated: value > 0,
          };
        }
        return item;
      });

      return items;
    });

    setFieldsValue((prev) => {
      return {
        ...prev,
        [e.target.name]: value,
      };
    });
  }, 500);

  return (
    <div
      className={cn('addon-field-group input-multiplier', {
        required: required,
      })}
    >
      <AddOnsTitle field={field}>{title}</AddOnsTitle>
      <AddOnsDescription field={field} />
      <input
        className="addon-field-quantity"
        id={v4()}
        name={fieldName}
        type="number"
        min={min}
        max={max === 0 ? '' : max}
        defaultValue={min}
        onChange={debounceOnChange}
      />
    </div>
  );
};
