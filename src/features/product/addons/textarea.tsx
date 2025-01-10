import { ProductAddons } from '@src/models/product/types';
import { AddOnsDescription } from '@src/features/product/addons/description';
import { AddOnsTitle } from '@src/features/product/addons/title';

type TProps = {
  field: ProductAddons;
};

export const AddOnsTextarea = ({ field }: TProps) => {
  return (
    <div className="addon-field-group">
      <AddOnsTitle field={field} />
      <AddOnsDescription field={field} />
      <textarea
        className="w-full rounded-sm border-[#E7E7E7] border"
        placeholder={field.placeholder}
      />
    </div>
  );
};
