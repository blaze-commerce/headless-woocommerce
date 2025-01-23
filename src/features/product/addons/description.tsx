import { ProductAddons } from '@src/models/product/types';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type TProps = {
  field: ProductAddons;
};

export const AddOnsDescription = ({ field }: TProps) => {
  if (field.description_enable === false || field.description === '') return null;

  return (
    <p className="addon-field-description">
      <ReactHTMLParser html={field.description} />
      {field.title_format === 'hide' && field.required === true && (
        <sup className="text-red-600 font-semibold">*</sup>
      )}
    </p>
  );
};
