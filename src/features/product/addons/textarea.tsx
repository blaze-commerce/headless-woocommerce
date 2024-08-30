import { ProductAddons } from '@src/models/product/types';
import { AddOnsDescription } from '@src/features/product/addons/description';
import { AddOnsTitle } from '@src/features/product/addons/title';

type TProps = {
  field: ProductAddons;
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const AddOnsTextarea = ({ field, onChange }: TProps) => {
  return (
    <div className="space-y-1">
      <AddOnsTitle field={field} />
      <AddOnsDescription field={field} />
      <textarea className="w-full rounded-sm border-[#E7E7E7] border" />
    </div>
  );
};
