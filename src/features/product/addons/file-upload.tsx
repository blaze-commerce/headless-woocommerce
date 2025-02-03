import { useState, useRef, useEffect } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { Product } from '@src/models/product';
import { ProductAddons } from '@src/models/product/types';
import { AddOnsDescription } from '@src/features/product/addons/description';
import { AddOnsTitle } from '@src/features/product/addons/title';
import { cn } from '@src/lib/helpers/helper';
import { useProductContext } from '@src/context/product-context';

type TProps = {
  field: ProductAddons;
  product: Product;
};

export const AddOnsFileUpload = ({ field, product }: TProps) => {
  const { fields } = useProductContext();
  const { classNames = [] } = field;
  const [, setFieldsValue] = fields.value;
  const [fileName, setFileName] = useState<string>('');
  const [hasFilled, setHasFilled] = useState<boolean>(false);
  const [binaryFile, setBinaryFile] = useState<string | ArrayBuffer | null | undefined>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const key = hiddenFileInput.current?.name;

    if (key && binaryFile) {
      setFieldsValue((prev) => {
        return {
          ...prev,
          [key]: binaryFile,
        };
      });
    }
  }, [binaryFile, setFieldsValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const theFile = event.target.files && event.target.files[0];

    if (event.target.files && theFile) {
      setFileName(event.target.files[0].name);
      setHasFilled(true);

      const reader = new FileReader();

      reader.onload = (e) => {
        const binaryStr = e.target?.result;
        setBinaryFile(binaryStr);
      };

      reader.readAsArrayBuffer(theFile);
    }
  };

  const clearFile = () => {
    setFileName('');
    setHasFilled(false);
    setBinaryFile(null);
    setFieldsValue((prev) => {
      return {
        ...prev,
        [hiddenFileInput.current?.name as string]: null,
      };
    });
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
