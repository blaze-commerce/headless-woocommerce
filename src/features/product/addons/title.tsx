import { ProductAddons } from '@src/models/product/types';

type TProps = {
  field: ProductAddons;
};

export const AddOnsTitle = ({ field }: TProps) => {
  if (field.titleFormat === 'hide') return null;
  return (
    <p className="text-lg">
      {field.name} {field.required && <sup className="text-red-600 font-semibold">*</sup>}
    </p>
  );
};
