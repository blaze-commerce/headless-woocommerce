import { useEffect, useState, Fragment } from 'react';
import dynamic from 'next/dynamic';
import { Disclosure } from '@headlessui/react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { uniq } from 'lodash';

import { useProductContext } from '@src/context/product-context';
import { useAddToCartContext } from '@src/context/add-to-cart-context';
import { TAddOnItem } from '@src/types/addToCart';
import { ProductAddons as TProductAddons } from '@src/models/product/types';
import { AddOnsPriceBreakdown } from '@src/features/product/addons/price-breakdown';

const SelectElement = dynamic(() =>
  import('@src/features/product/addons/select').then((mod) => mod.AddOnsSelect)
);

const HeadingElement = dynamic(() =>
  import('@src/features/product/addons/heading').then((mod) => mod.AddOnsHeading)
);

const TextareaElement = dynamic(() =>
  import('@src/features/product/addons/textarea').then((mod) => mod.AddOnsTextarea)
);

const CheckboxElement = dynamic(() =>
  import('@src/features/product/addons/checkbox').then((mod) => mod.AddOnsCheckbox)
);

const RadioButtonElement = dynamic(() =>
  import('@src/features/product/addons/radio-button').then((mod) => mod.AddOnsRadioButton)
);

const MultiplierElement = dynamic(() =>
  import('@src/features/product/addons/input-multiplier').then((mod) => mod.AddOnsInputMultiplier)
);

const FileUploadElement = dynamic(() =>
  import('@src/features/product/addons/file-upload').then((mod) => mod.AddOnsFileUpload)
);

export const AddToCartAddons = () => {
  const { product, fields } = useProductContext();
  const { addons } = useAddToCartContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [headers, setHeaders] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [panels, setPanels] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [standAlone, setStandAlone] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [checkboxes, setCheckboxes] = useState<any[]>([]);

  const [, setAddonItems] = addons;
  const [, setRequiredFields] = fields.required;
  const [fieldsValue, setFieldsValue] = fields.value;

  useEffect(() => {
    if (!product || !product.addons) return;

    const required = product.addons.filter((addon) => addon.required);

    // set required fields
    setRequiredFields((prev) => {
      const fields: string[] = [];

      required.forEach((addon) => {
        fields.push(`addon-${product.productId}-${addon.position}`);
      });

      return uniq([...prev, ...fields]);
    });

    const items: TAddOnItem[] = [];

    product.addons.forEach((addon) => {
      items.push({
        id: addon.id,
        name: addon.name,
        price: parseFloat(addon.price === '' ? '0' : addon.price),
        priceType: addon.price_type,
        quantity: 0,
        isCalculated: false,
        display: addon.display,
      });
    });

    // set addon items
    setAddonItems(items);
  }, [product, setRequiredFields, setAddonItems]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const standAlone: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const headers: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const panels: any[][] = [];
    let iteration = -1;

    if (!product || !product.addons) return;

    let afterHeader = false;

    product.addons.forEach((addon) => {
      addon.classNames = addon.classNames || [];

      if (headers.length === 0 && addon.type !== 'heading') {
        standAlone.push(addon);
      }

      if (addon.type === 'heading') {
        headers.push(addon);
        afterHeader = true;
        iteration++;
      } else {
        if (panels[iteration] === undefined) {
          panels[iteration] = [];
        }

        if (afterHeader && addon.type === 'checkbox') {
          setCheckboxes((prev) => {
            if (!prev.includes(addon.id)) {
              return [...prev, addon.id];
            }
            return prev;
          });
        }

        if (!afterHeader && !addon.classNames.includes('custom-field')) {
          addon.classNames.push('custom-field');
        }

        panels[iteration].push(addon);

        afterHeader = false;
      }
    });

    setHeaders(headers);
    setPanels(panels);
    setStandAlone(standAlone);
  }, [product]);

  useEffect(() => {
    if (!product) return;

    if (!product.addons) return;

    // loop chexkboxes and then find in the fieldsValue if it has value

    checkboxes.forEach((checkbox) => {
      const selected = fieldsValue[`addon-${product.productId}-${checkbox}`] as string[];

      const theClassName = `field-${checkbox}`;

      const parent = document.querySelector(`.${theClassName}`);
      const grandParent = parent?.parentElement?.parentElement?.parentElement?.parentElement;

      if (grandParent) {
        // check if selected has length
        if (selected.length > 0) {
          grandParent.classList.add('custom-active');
        } else {
          grandParent.classList.remove('custom-active');
        }
      }
    });
  }, [fieldsValue, checkboxes, product, panels]);

  if (!product || !product.addons) return null;

  const onChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFieldsValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const renderAddon = (addon: TProductAddons, key: number) => {
    switch (addon.type) {
      case 'checkbox':
        return (
          <CheckboxElement
            key={`addon-field-${key}`}
            field={addon}
            product={product}
          />
        );

      case 'input_multiplier':
        return (
          <MultiplierElement
            key={`addon-field-${key}`}
            field={addon}
            product={product}
          />
        );

      case 'multiple_choice':
        if (addon.display === 'radiobutton') {
          return (
            <RadioButtonElement
              key={`addon-field-${key}`}
              field={addon}
              product={product}
              onChange={onChange}
            />
          );
        }
        return (
          <SelectElement
            key={`addon-field-${key}`}
            product={product}
            field={addon}
          />
        );

      case 'custom_text':
      case 'custom_textarea':
        return (
          <TextareaElement
            key={`addon-field-${key}`}
            field={addon}
            product={product}
          />
        );

      case 'heading':
        return (
          <HeadingElement
            key={`addon-field-${key}`}
            heading="h3"
            {...addon}
          />
        );

      case 'file_upload':
        return (
          <FileUploadElement
            key={`addon-field-${key}`}
            field={addon}
            product={product}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="product-addon-container">
      {standAlone.length > 0 &&
        standAlone.map((addon: TProductAddons, key: number) => renderAddon(addon, key))}

      {headers.length > 0 &&
        headers.map((header, key) => (
          <Disclosure key={key}>
            {({ open }) => (
              <Fragment key={key}>
                <Disclosure.Button
                  className="addon-header addon-field-heading"
                  as="h3"
                >
                  {header.name}
                  <span className="accordion-button">
                    {open ? (
                      <FaMinus
                        width="8"
                        height="8"
                      />
                    ) : (
                      <FaPlus
                        width="8"
                        height="8"
                      />
                    )}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel
                  as="div"
                  className="addon-panel"
                >
                  {typeof panels[key] !== 'undefined' &&
                    panels[key].length > 0 &&
                    panels[key].map((addon: TProductAddons, key: number) =>
                      renderAddon(addon, key)
                    )}
                </Disclosure.Panel>
              </Fragment>
            )}
          </Disclosure>
        ))}
      <AddOnsPriceBreakdown />
    </div>
  );
};
