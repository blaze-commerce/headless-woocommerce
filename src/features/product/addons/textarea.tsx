import { ProductAddons } from '@src/models/product/types';
import { Product } from '@src/models/product';
import { AddOnsDescription } from '@src/features/product/addons/description';
import { AddOnsTitle } from '@src/features/product/addons/title';
import { cn } from '@src/lib/helpers/helper';

type TProps = {
  field: ProductAddons;
  product: Product;
};

export const AddOnsTextarea = ({ field, product }: TProps) => {
  const { classNames = [] } = field;
  return (
    <div
      className={cn('addon-field-group textarea-field', {
        [classNames.join(' ')]: classNames.length > 0,
      })}
    >
      <AddOnsTitle field={field} />
      <AddOnsDescription field={field} />
      <textarea
        className="w-full rounded-sm border-[#E7E7E7] border"
        placeholder={field.placeholder}
        name={'addon-' + product.productId + '-' + field.id}
      />
    </div>
  );
};
