import { ProductAddons } from '@src/models/product/types';

type TProps = {
  field: ProductAddons;
  values?: string[];
  children?: React.ReactNode;
};

export const AddOnsTitle = ({ field, values, children }: TProps) => {
  if (field.title_format === 'hide') return null;
  return (
    <p className="addon-field-title">
      {!children && field.name} {children}
      {field.required === true && <sup className="text-red-600 font-semibold">*</sup>}
      {values && values.length > 0 && <>: {values.join(', ')}</>}
    </p>
  );
};
