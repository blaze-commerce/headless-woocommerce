import { v4 } from 'uuid';
import { cn, formatPriceWithCurrency } from '@src/lib/helpers/helper';
import { ProductAddons } from '@src/models/product/types';
import { useSiteContext } from '@src/context/site-context';
import { useAddToCartContext } from '@src/context/add-to-cart-context';
import { debounce } from 'lodash';

import { AddOnsTitle } from './title';
import { AddOnsDescription } from './description';

type TProps = {
  field: ProductAddons;
};

export const AddOnsInputMultiplier = ({ field }: TProps) => {
  const { currentCountry } = useSiteContext();
  const { addons } = useAddToCartContext();
  const [, setAddonItems] = addons;
  const { id, name, description, titleFormat, required, adjustPrice, price, min, max } = field;

  let title = name;

  if (adjustPrice) {
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
        name={v4()}
        type="number"
        min={min}
        max={max}
        defaultValue={min}
        onChange={debounceOnChange}
      />
    </div>
  );
};
