import { useState, useRef } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { Product } from '@src/models/product';
import { ProductAddons } from '@src/models/product/types';
import { AddOnsDescription } from '@src/features/product/addons/description';
import { AddOnsTitle } from '@src/features/product/addons/title';
import { cn } from '@src/lib/helpers/helper';

type TProps = {
  field: ProductAddons;
  product: Product;
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AddOnsFileUpload = ({ field, product, onChange }: TProps) => {
  const { classNames = [] } = field;
  const [fileName, setFileName] = useState<string>('');
  const [hasFilled, setHasFilled] = useState<boolean>(false);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onChange(event);
      setFileName(event.target.files[0].name);
      setHasFilled(true);
    }
  };

  const clearFile = () => {
    setFileName('');
    //onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleFileClick = () => {
    if (hiddenFileInput.current) hiddenFileInput?.current.click();
  };

  return (
    <div
      className={cn('addon-field-group file-upload-group', {
        'has-file': hasFilled,
        [classNames.join(' ')]: classNames.length > 0,
      })}
    >
      <AddOnsTitle field={field} />
      <AddOnsDescription field={field} />
      <div className="file-upload-holder">
        <span className="file-name">
          {fileName && (
            <>
              <IoIosCloseCircle
                className="file-remove cursor-pointer"
                onClick={clearFile}
              />
              {fileName}
            </>
          )}
        </span>
        <button
          className="button-upload"
          onClick={handleFileClick}
        >
          Choose File
        </button>
        <input
          type="file"
          id={`addon-${product.productId}-${field.id}`}
          name={`addon-${product.productId}-${field.id}`}
          ref={hiddenFileInput}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
        />
      </div>
    </div>
  );
};
