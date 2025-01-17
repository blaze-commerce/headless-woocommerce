import { ProductAddons } from '@src/models/product/types';
import { AddOnsDescription } from '@src/features/product/addons/description';
import { AddOnsTitle } from '@src/features/product/addons/title';
import { Product } from '@src/models/product';
import { cn, sanitizeTitle } from '@src/lib/helpers/helper';

type TProps = {
  product: Product;
  field: ProductAddons;
  className?: string;
  onChange: (_value: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const AddOnsSelect = ({ product, field, onChange, className }: TProps) => {
  return (
    <div className={cn('addon-field-group select-field', className)}>
      <AddOnsTitle field={field} />
      <AddOnsDescription field={field} />
      <select
        name={`addon-${product.productId}-${field.id}`}
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
