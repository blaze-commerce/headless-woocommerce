import HTMLReactParser from 'html-react-parser';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import { Divider } from '@src/components/common/divider';
import { GiftCardPreview } from '@src/features/product/gift-card/gift-card-preview';
import { useProductContext } from '@src/context/product-context';
import {
  addYears,
  currentDate as currentDateFn,
  deductDays,
  formatDate,
} from '@src/lib/helpers/date';
import { getVariations } from '@src/lib/typesense/product';
import { validateEmail } from '@src/lib/helpers/helper';
import { useEffectOnce } from 'usehooks-ts';
import { isObject } from 'lodash';

export const GiftCardForm = () => {
  const {
    product,
    giftCards: {
      state: [giftCardInput, setGiftCardInput],
      validation: [, setIsFormValid],
      emailValidation: [isEmailValid, setIsEmailValid],
      productId: [, setGiftProductId],
    },
    actions: { onGiftCardQuantityChange },
    addToCartStatus,
  } = useProductContext();

  const [, setDisableAddToCart] = addToCartStatus;
  const [isShowPreview, setIsShowPreview] = useState(false);

  const dateRef = useRef<HTMLInputElement>(null);

  const currentDate = currentDateFn();

  const formattedCurrentDate = formatDate(currentDate.toISOString(), 'yyyy-mm-dd');

  const maxDeliveryDate = addYears(currentDate, 1);

  const formattedMaxDeliveryDate = formatDate(
    deductDays(maxDeliveryDate, 1).toISOString(),
    'yyyy-mm-dd'
  );

  const messageCharacterCount = 500 - giftCardInput?.['giftcard-message-field']?.length;

  useEffectOnce(() => {
    if (!product?.isGiftCard || !product?.id) return;

    const defaultAttributes = product.defaultAttributes;

    getVariations(parseInt(product?.id)).then((variations) => {
      variations.forEach((variation) => {
        if (!variation.id) return;

        if (!isObject(defaultAttributes)) return;

        const attributes = variation.attributes as { [key: string]: string };

        if (!attributes) return;

        const defaultAttributesKeys = Object.keys(defaultAttributes);

        defaultAttributesKeys.forEach((key: string) => {
          const attributeValue = attributes[`attribute_${key}`];
          const defAttributeValue = defaultAttributes[key];

          if (attributeValue === defAttributeValue) {
            const variationId = variation.id as string; // Type guard to ensure variation.id is not undefined
            setGiftProductId(parseInt(variationId));
          }
        });
      });
    });
  });

  useEffect(() => {
    if (!giftCardInput?.['giftcard-to-field'] || !giftCardInput?.['giftcard-from-field']) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [giftCardInput, setIsFormValid]);

  useEffect(() => {
    if (giftCardInput?.['giftcard-to-field']) {
      const splitValue = giftCardInput?.['giftcard-to-field']?.split(', ');

      onGiftCardQuantityChange(splitValue.length);
    }
  }, [giftCardInput, onGiftCardQuantityChange]);

  useEffect(() => {
    if (!giftCardInput?.['giftcard-delivery-date-field']) {
      setGiftCardInput((prev) => ({
        ...prev,
        'giftcard-delivery-date-field': formattedCurrentDate,
      }));
    }
  }, [formattedCurrentDate, giftCardInput, setGiftCardInput]);

  useEffect(() => {
    if (!giftCardInput?.['giftcard-email-design-field']) {
      setGiftCardInput((prev) => ({
        ...prev,
        'giftcard-email-design-field': '0',
      }));
    }
  }, [giftCardInput, setGiftCardInput]);

  useEffect(() => {
    if (isShowPreview && isEmailValid) {
      setDisableAddToCart(false);
    } else {
      setDisableAddToCart(true);
    }
  }, [isShowPreview, isEmailValid, setDisableAddToCart]);

  if (!product?.isGiftCard) return null;

  const onPreviewClick = (e: { preventDefault: () => void }) => {
    if (!giftCardInput['giftcard-to-field'] || !giftCardInput?.['giftcard-from-field']) {
      return;
    } else {
      e.preventDefault();
      setIsShowPreview((current) => !current);
    }
  };

  const onBlurToField = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    const inputName = event.target.name;

    if (inputValue?.endsWith(',')) {
      inputValue = inputValue?.slice(-0, -1);
    } else if (inputValue?.endsWith(', ')) {
      inputValue = inputValue?.slice(-0, -2);
    } else if (inputValue?.endsWith(' ')) {
      inputValue = inputValue?.slice(-0, -1);
    }

    setGiftCardInput((prev) => ({
      ...prev,
      [inputName]: inputValue,
    }));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let inputValue = event.target.value;
    const inputName = event.target.name;
    const emailValidity: boolean[] = [];

    if (inputName === 'giftcard-to-field') {
      if (inputValue?.endsWith(' ')) {
        inputValue = inputValue?.slice(0, -1)?.concat(', ');
      }

      inputValue?.split(', ')?.map((fieldValue) => {
        if (!validateEmail(fieldValue)) {
          emailValidity.push(false);
        } else {
          emailValidity.push(true);
        }
      });

      if (!inputValue) {
        event.target.setCustomValidity('Please fill out this field.');
        setIsEmailValid(false);
      } else if (emailValidity.includes(false)) {
        event.target.setCustomValidity('Please use the correct email format. e.g. email@mail.com');
        setIsEmailValid(false);
      } else {
        event.target.setCustomValidity('');
        setIsEmailValid(true);
      }
    }

    setGiftCardInput((prev) => ({
      ...prev,
      [inputName]: inputValue,
    }));
  };

  const renderShortDescription = () => {
    const { shortDescription } = product;

    if (!shortDescription) return null;

    return (
      <>
        <div className="my-3 font-normal text-sm text-[#6F6F6F] space-y-5">
          {HTMLReactParser(shortDescription as string)}
        </div>
        <Divider className="mb-4" />
      </>
    );
  };

  return (
    <>
      {renderShortDescription()}
      <div className="mb-3 flex flex-col">
        <form>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="giftcard-to-field"
                className="font-semibold text-sm text-[#6F6F6F]"
              >
                To:
              </label>
              <input
                type="text"
                id="giftcard-to-field"
                name="giftcard-to-field"
                className="border border-[#BFBFBF] rounded-sm text-[#555555]"
                placeholder="Enter an email address for each recipient"
                onChange={onChange}
                required
                value={giftCardInput?.['giftcard-to-field'] || ''}
                onBlur={onBlurToField}
              />
              <span className="font-normal text-xs text-[#555555]">
                Separate multiple email addresses with a comma.
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="giftcard-recipient-field"
                className="font-semibold text-sm text-[#6F6F6F]"
              >
                Recipient:
              </label>
              <input
                type="text"
                id="giftcard-recipient-field"
                name="giftcard-recipient-field"
                className="border border-[#BFBFBF] rounded-sm text-[#555555]"
                placeholder="Enter a friendly name for the recipient (optional)"
                onChange={onChange}
                value={giftCardInput?.['giftcard-recipient-field'] || ''}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="giftcard-from-field"
                className="font-semibold text-sm text-[#6F6F6F]"
              >
                From:
              </label>
              <input
                type="text"
                id="giftcard-from-field"
                name="giftcard-from-field"
                className="border border-[#BFBFBF] rounded-sm text-[#555555]"
                placeholder="Your name"
                onChange={onChange}
                required
                value={giftCardInput?.['giftcard-from-field'] || ''}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="giftcard-message-field"
                className="font-semibold text-sm text-[#6F6F6F]"
              >
                Message (optional):
              </label>
              <textarea
                id="giftcard-message-field"
                name="giftcard-message-field"
                className="border border-[#BFBFBF] rounded-sm text-[#555555]"
                placeholder="Add a message"
                maxLength={500}
                onChange={onChange}
                value={giftCardInput?.['giftcard-message-field'] || ''}
              />
              <span className="font-normal text-xs text-[#555555]">
                {messageCharacterCount} characters remaining.
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="giftcard-delivery-date-field"
                className="font-semibold text-sm text-[#6F6F6F]"
              >
                Delivery date:
              </label>
              <input
                type="text"
                ref={dateRef}
                id="giftcard-delivery-date-field"
                name="giftcard-delivery-date-field"
                className="border border-[#BFBFBF] rounded-sm text-[#555555]"
                placeholder="Now"
                min={formattedCurrentDate}
                max={formattedMaxDeliveryDate}
                onFocus={() =>
                  ((dateRef as MutableRefObject<HTMLInputElement>).current.type = 'date')
                }
                onBlur={() =>
                  ((dateRef as MutableRefObject<HTMLInputElement>).current.type = 'text')
                }
                onChange={onChange}
              />
              <span className="font-normal text-xs text-[#555555]">Up to a year from today</span>
            </div>
          </div>
          <button
            className="w-full my-2.5 font-semibold text-sm text-black px-10 py-2.5 border border-[#E7D4BD] rounded-sm"
            onClick={onPreviewClick}
          >
            PREVIEW
          </button>
          {isShowPreview && isEmailValid && <GiftCardPreview />}
        </form>
      </div>
    </>
  );
};
