import { useEffect, useState, useRef } from 'react';
import { Disclosure } from '@headlessui/react';
import { useProductContext } from '@src/context/product-context';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { ProductVariationBundle } from '@src/models/product/types';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type TProductVariableBundle = {
  bundleId: number;
  title?: string;
  description?: string;
  variation: ProductVariationBundle;
  required: boolean;
};

export const ProductVariableBundle = ({
  bundleId,
  title,
  description,
  variation,
  required,
}: TProductVariableBundle) => {
  const { label, name, options } = variation;
  const { fields } = useProductContext();
  const [, setFieldsValue] = fields.value;
  const selectRef = useRef<HTMLSelectElement>(null);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [selectedDescription, setSelectedDescription] = useState<Record<string, string>>({
    description: '',
    label: '',
  });

  useEffect(() => {
    let setLabel = '';

    if (selectedOption > 0) {
      const selected = options[selectedOption];

      setLabel = selected.label;

      setSelectedDescription({
        description: selected.description,
        label: selected.label,
      });
    } else if (selectedOption === 0 && selectRef.current) {
      selectRef.current.value = '';
    }

    setFieldsValue((prev) => {
      return {
        ...prev,
        ...{
          [variation.name]: setLabel,
          [`bundle_variation_id_${bundleId}`]: selectedOption,
        },
      };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, options]);

  return (
    <div className="relative pr-8 justify-between">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className={'text-left w-full'}>
              <div className="absolute top-0 right-0">
                {open ? <MinusIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
              </div>

              <div className="space-y-4">
                {title && <h3 className="text-contrast-3 text-base md:text-2xl">{title}</h3>}
                {description && (
                  <div className="!mt-0 text-sm md:text-base">
                    <ReactHTMLParser html={description} />
                  </div>
                )}
                <div>
                  <span className="text-contrast-2 text-sm md:text-base font-semibold">
                    {label}
                  </span>
                  {required && <sup className="text-red-600 font-semibold">*</sup>}
                  {selectedOption > 0 && (
                    <span className="text-[#777] font-normal text-sm md:text-base ">
                      {selectedDescription.label}
                    </span>
                  )}
                </div>
              </div>
            </Disclosure.Button>
            <Disclosure.Panel
              as="div"
              className="space-y-4 mt-4 !ml-0"
            >
              <select
                ref={selectRef}
                name={name}
                className="rounded-sm border border-[#E5E5E5] p-2 w-full"
                onChange={(e) => setSelectedOption(Number(e.target.value))}
                defaultValue={selectedOption}
              >
                <option value="">Choose an option</option>
                {Object.entries(variation.options).map(([id, value]) => {
                  return (
                    <option
                      key={id}
                      value={id}
                    >
                      {value.label}
                    </option>
                  );
                })}
              </select>
              {selectedOption > 0 && (
                <>
                  <div>
                    <span
                      onClick={() => setSelectedOption(0)}
                      className="underline text-xs block cursor-pointer"
                    >
                      clear
                    </span>
                  </div>
                  <div className="text-sm md:text-base">
                    <ReactHTMLParser html={selectedDescription.description} />
                  </div>
                </>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
