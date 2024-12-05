import { ProductAddons } from '@src/models/product/types';

type TProps = {
  field: ProductAddons;
};

export const AddOnsDescription = ({ field }: TProps) => {
  if (field.descriptionEnable === false) return null;

  return (
    <p className="addon-field-description">
      {field.description}
      {field.titleFormat === 'hide' && field.required && (
        <sup className="text-red-600 font-semibold">*</sup>
      )}
    </p>
  );
};
