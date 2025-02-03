import { find, isEmpty } from 'lodash';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useProductContext } from '@src/context/product-context';
import { Attribute, Image as ImageType } from '@src/models/product/types';
import { cn } from '@src/lib/helpers/helper';
import { useAttributeParams } from '@src/lib/hooks/product';

type Props = {
  attribute: Attribute;
  image?: ImageType[];
};

export const ImageVariant: React.FC<Props> = ({ attribute }) => {
  const attributeParams = useAttributeParams();

  const {
    product,
    actions: { onAttributeSelect },
  } = useProductContext();
  const { name, label, options } = attribute;
  const attributeImageSrc = product?.variantImageSrc;

  const [currentAttributeLabel, setCurrentAttributeLabel] = useState('');

  useEffect(() => {
    if (!isEmpty(attributeParams[name]) && !isEmpty(name)) {
      const foundLabel = find(options, { slug: attributeParams[name] });
      if (!isEmpty(foundLabel)) {
        setCurrentAttributeLabel(foundLabel.label);
      }
      onAttributeSelect(name, attributeParams[name]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributeParams]);

  if (isEmpty(product?.variantImageSrc)) return null;

  const handleOnClick = (variantImageSrc: ImageType, variantName: string, variantLabel: string) => {
    setCurrentAttributeLabel(variantLabel);
    onAttributeSelect(name, variantName);
  };

  return (
    <div className="mb-4">
      <label
        className="block text-sm font-bold mb-1 capitalize"
        htmlFor={name}
      >
        {label}: <span className="font-medium">{currentAttributeLabel}</span>
      </label>
      <div className="flex gap-2.5 mt-2.5 flex-wrap">
        {options?.map((option, index) => {
          const currentImageSrc = find(attributeImageSrc, [name, option.name]);
          if (!currentImageSrc?.src) {
            return (
              <button
                key={`${index}-${option.slug}`}
                className={cn(
                  'cursor-pointer rounded border peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:border-2 py-2 px-8 h-full flex items-center justify-center text-center text-black/80',
                  {
                    'opacity-100 border-2 border-primary outline-2':
                      option.label === currentAttributeLabel,
                  }
                )}
                onClick={() =>
                  handleOnClick(currentImageSrc as ImageType, option.name, option.label)
                }
              >
                {option.label}
              </button>
            );
          }
          return (
            <div
              key={`${index}-${option.slug}`}
              className={cn('w-[74px] h-[74px] border border-border rounded cursor-pointer', {
                'opacity-60': option.label !== currentAttributeLabel,
                'opacity-100 border-2 border-primary outline-2':
                  option.label === currentAttributeLabel,
              })}
              onClick={() => handleOnClick(currentImageSrc as ImageType, option.name, option.label)}
            >
              <Image
                className="w-full h-full object-contain"
                src={currentImageSrc?.src as string}
                alt={(currentImageSrc?.altText as string) || option.label}
                width={100}
                height={100}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
