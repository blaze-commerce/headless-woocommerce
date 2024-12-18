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
import { cn, validateEmail } from '@src/lib/helpers/helper';
import { useEffectOnce } from 'usehooks-ts';
import { debounce, isObject } from 'lodash';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { useSiteContext } from '@src/context/site-context';
import { ProductPrice } from '@src/models/product/types';

type TAmountOptions = {
  id: number;
  name: string;
  attr: string;
  price: {
    [key: string]: number;
  };
};

export const GiftCardForm = () => {
  const {
    product,
    giftCards: {
      state: [giftCardInput, setGiftCardInput],
      validation: [, setIsFormValid],
      emailValidation: [isEmailValid, setIsEmailValid],
      productId: [giftProductId, setGiftProductId],
    },
    actions: { onGiftCardQuantityChange },
    addToCartStatus,
  } = useProductContext();
  const { currentCurrency: currency } = useSiteContext();
  const giftCardAmountKey = 'gift-card-amount';

  const [, setDisableAddToCart] = addToCartStatus;
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [amountOptions, setAmountOptions] = useState<TAmountOptions[]>([]);
  const [optionCustomAmount, setOptionCustomAmount] = useState<number | null>(null);
  const [giftCardValue, setGiftCardValue] = useState<number>(0);

  const dateRef = useRef<HTMLInputElement>(null);
  const [minPriceCurr, maxPriceCurr] = product?.giftCardPrice ?? [
    { [currency]: 0 },
    { [currency]: 0 },
  ];

  const minPrice = minPriceCurr as ProductPrice;
  const maxPrice = maxPriceCurr as ProductPrice;

  const currentDate = currentDateFn();

  const formattedCurrentDate = formatDate(currentDate.toISOString(), 'yyyy-mm-dd');

  const maxDeliveryDate = addYears(currentDate, 1);

  const formattedMaxDeliveryDate = formatDate(
    deductDays(maxDeliveryDate, 1).toISOString(),
    'yyyy-mm-dd'
  );

  const messageCharacterCount = 500 - (giftCardInput?.['giftcard-message-field']?.length ?? 0);

  useEffectOnce(() => {
    if (!product?.isGiftCard || !product?.id) return;

    setDisableAddToCart(true);

    const defaultAttributes = product.defaultAttributes;

    // get variations from current product
    getVariations(parseInt(product?.id)).then((variations) => {
      const variationsArray = variations.map((variation) => {
        return {
          id: parseInt(variation.id ?? '0'),
          name: String(variation.name),
          price: variation.price as ProductPrice,
          attr: isObject(variation.attributes)
            ? (variation.attributes as { [key: string]: string })[
                `attribute_${giftCardAmountKey}`
              ] ?? ''
            : '',
        };
      });

      // sort variationsArray by price, put the custom amount at the end
      variationsArray.sort((a, b) => {
        if (a.attr === 'Other amount') return 1;
        if (b.attr === 'Other amount') return -1;
        if (a.price === undefined) return 1;
        if (b.price === undefined) return -1;
        if (Number(a.price[currency]) == 0) return 1;
        if (Number(b.price[currency]) == 0) return -1;
        return Number(a.price[currency]) - Number(b.price[currency]);
      });

      setAmountOptions(variationsArray);

      // set default giftProductId based on defaultAttributes
      const defaultAmount = defaultAttributes ? defaultAttributes[giftCardAmountKey] : '';
      const matchedVariation = variationsArray.find(
        (variation) => variation.attr === defaultAmount
      );

      if (matchedVariation) {
        setGiftProductId(matchedVariation.id);
      }

      // find custom amount product ID from variationsArray where attributes.attribute_gift-card-amount is 'Other amount'
      const customAmount = variationsArray.find((variation) => variation.attr === 'Other amount');

      // set optionCustomAmount to custom amount product ID
      if (customAmount) {
        setOptionCustomAmount(customAmount.id);
      }

      let lowestPrice;

      // fund the lowest price from variationsArray and not 0
      if (variationsArray.length === 0) {
        lowestPrice = variationsArray.find((variation) => variation.price[currency] > 0);
      } else {
        lowestPrice = {
          price: {
            [currency]: 0,
          },
        };
      }

      // set giftCardValue to lowest price
      setGiftCardValue(lowestPrice?.price[currency] ?? 0);
      setGiftCardInput({
        'giftcard-to-field': '',
        'giftcard-from-field': '',
        'giftcard-message-field': '',
        'giftcard-delivery-date-field': formattedCurrentDate,
        'giftcard-email-design-field': '0',
        'giftcard-custom-amount-field': lowestPrice?.price[currency]
          ? String(lowestPrice?.price[currency])
          : '0',
      });
    });
  });

  useEffect(() => {
    if (giftProductId !== optionCustomAmount) {
      // set giftCardValue if giftProductId is not custom amount, the value is from its price
      const selectedOption = amountOptions.find((option) => option.id === giftProductId);

      if (selectedOption) {
        setGiftCardValue(selectedOption.price[currency]);
        setGiftCardInput((prev) => ({
          ...prev,
          'giftcard-custom-amount-field': String(selectedOption.price[currency]),
        }));
      }
    }
  }, [giftProductId, optionCustomAmount, giftCardValue, amountOptions, currency, setGiftCardInput]);

  useEffect(() => {
    if (
      giftCardInput?.['giftcard-to-field'] == '' ||
      giftCardInput?.['giftcard-from-field'] == ''
    ) {
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
    if (giftCardInput?.['giftcard-delivery-date-field'] == '') {
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
    if (isShowPreview && isEmailValid && giftCardValue > 0) {
      setDisableAddToCart(false);
    } else if (!isEmailValid || giftCardValue == 0) {
      setDisableAddToCart(true);
    }
  }, [isShowPreview, isEmailValid, setDisableAddToCart, giftCardValue]);

  useEffect(() => {
    if (giftProductId === optionCustomAmount) {
      setGiftCardValue(parseFloat(giftCardInput['giftcard-custom-amount-field']));
    }
  }, [giftProductId, optionCustomAmount, giftCardInput, setGiftCardValue]);

  if (!product?.isGiftCard) return null;

  const onPreviewClick = (e: { preventDefault: () => void }) => {
    const giftCardAmount = parseFloat(giftCardInput?.['giftcard-custom-amount-field']);

    if (
      giftCardInput?.['giftcard-to-field'] == '' ||
      giftCardInput?.['giftcard-from-field'] == '' ||
      giftCardAmount < minPrice[currency] ||
      giftCardAmount > maxPrice[currency]
    ) {
      if (giftCardAmount < minPrice[currency] || giftCardAmount > maxPrice[currency]) {
        (
          document.getElementById('giftcard-custom-amount-field') as HTMLInputElement
        )?.setCustomValidity(
          `Please enter an amount between ${minPrice[currency]} and ${maxPrice[currency]}`
        );
      }
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
      [inputName]: inputValue.toString(),
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

  const onAmountChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const amountValue = parseFloat(event.target.value);

    if (amountValue < minPrice[currency] || isNaN(amountValue)) {
      setGiftCardInput((prev) => ({
        ...prev,
        'giftcard-custom-amount-field': String(minPrice[currency]),
      }));

      setGiftCardValue(minPrice[currency]);
      // set value for element #giftcard-custom-amount-field

      event.target.setCustomValidity(`Please enter an amount greater than ${minPrice[currency]}`);
      event.target.value = String(minPrice[currency]);
    } else if (amountValue > maxPrice[currency]) {
      setGiftCardInput((prev) => ({
        ...prev,
        'giftcard-custom-amount-field': String(maxPrice[currency]),
      }));
      setGiftCardValue(maxPrice[currency]);

      event.target.setCustomValidity(`Please enter an amount less than ${maxPrice[currency]}`);
      event.target.value = String(maxPrice[currency]);
    } else {
      event.target.setCustomValidity('');
      setGiftCardInput((prev) => ({
        ...prev,
        'giftcard-custom-amount-field': String(amountValue),
      }));
      setGiftCardValue(amountValue);
    }
  }, 800);

  const renderShortDescription = () => {
    const { shortDescription } = product;

    if (!shortDescription) return null;

    return (
      <>
        <div className="my-3 font-normal text-sm text-[#6F6F6F] space-y-5">
          <ReactHTMLParser html={shortDescription as string} />
        </div>
        <Divider className="mb-4" />
      </>
    );
  };

  return (
    <>
      {renderShortDescription()}
      <form className="space-y-4 gift-card-form">
        <div className="atc-field-group required">
          <label
            htmlFor="giftcard-variant-selection"
            className="atc-field-label"
          >
            Select Amount
          </label>
          <select
            id="giftcard-variant-selection"
            className="atc-field-select"
            value={giftProductId}
            onChange={(e) => {
              const selectedOption = amountOptions.find(
                (option) => option.id === parseInt(e.target.value)
              );

              if (selectedOption) {
                setGiftCardValue(selectedOption.price[currency]);
                setGiftProductId(selectedOption.id);
              }
            }}
          >
            {amountOptions.map((option) => {
              return (
                <option
                  key={option.id}
                  value={option.id}
                >
                  {option.price[currency] > 0
                    ? `${currency} ${option.price[currency]}`
                    : 'Custom Amount'}
                </option>
              );
            })}
          </select>
        </div>
        <div
          className={cn('atc-field-group required', {
            '!hidden': giftProductId !== optionCustomAmount,
          })}
        >
          <label
            htmlFor="giftcard-custom-amount-field"
            className="atc-field-label"
          >
            Other amount ($)
          </label>
          <input
            type="number"
            id="giftcard-custom-amount-field"
            name="giftcard-custom-amount-field"
            className="atc-field-input"
            defaultValue={giftCardValue}
            onClick={(e) => {
              //highlight the text on click
              e.currentTarget.select();
            }}
            onChange={onAmountChange}
          />
        </div>
        <div className="atc-field-group required">
          <label
            htmlFor="giftcard-to-field"
            className="atc-field-label"
          >
            To
          </label>
          <input
            type="text"
            id="giftcard-to-field"
            name="giftcard-to-field"
            className="atc-field-input"
            placeholder="Enter an email address for each recipient"
            onChange={onChange}
            required
            value={giftCardInput?.['giftcard-to-field'] || ''}
            onBlur={onBlurToField}
          />
          <span className="atc-field-description">
            Separate multiple email addresses with a comma.
          </span>
        </div>
        {/* <div className="atc-field-group required">
          <label
            htmlFor="giftcard-recipient-field"
            className="atc-field-label"
          >
            Recipient
          </label>
          <input
            type="text"
            id="giftcard-recipient-field"
            name="giftcard-recipient-field"
            className="atc-field-input"
            placeholder="Enter a friendly name for the recipient (optional)"
            onChange={onChange}
            value={giftCardInput?.['giftcard-recipient-field'] || ''}
          />
        </div> */}
        <div className="atc-field-group required">
          <label
            htmlFor="giftcard-from-field"
            className="atc-field-label"
          >
            From
          </label>
          <input
            type="text"
            id="giftcard-from-field"
            name="giftcard-from-field"
            className="atc-field-input"
            placeholder="Your name"
            onChange={onChange}
            required
            value={giftCardInput?.['giftcard-from-field'] || ''}
          />
        </div>
        <div className="atc-field-group">
          <label
            htmlFor="giftcard-message-field"
            className="atc-field-label"
          >
            Message (optional)
          </label>
          <textarea
            id="giftcard-message-field"
            name="giftcard-message-field"
            className="atc-field-input"
            placeholder="Add a message"
            maxLength={500}
            onChange={onChange}
            value={giftCardInput?.['giftcard-message-field'] || ''}
          />
          <span className="atc-field-description">
            {messageCharacterCount} characters remaining.
          </span>
        </div>
        <div className="atc-field-group required">
          <label
            htmlFor="giftcard-delivery-date-field"
            className="atc-field-label"
          >
            Delivery date:
          </label>
          <input
            type="text"
            ref={dateRef}
            id="giftcard-delivery-date-field"
            name="giftcard-delivery-date-field"
            className="atc-field-input"
            placeholder="Now"
            min={formattedCurrentDate}
            max={formattedMaxDeliveryDate}
            onFocus={() => ((dateRef as MutableRefObject<HTMLInputElement>).current.type = 'date')}
            onBlur={() => ((dateRef as MutableRefObject<HTMLInputElement>).current.type = 'text')}
            onChange={onChange}
          />
          <span className="atc-field-description">Up to a year from today</span>
        </div>
        <button
          className="preview-button"
          onClick={onPreviewClick}
        >
          Preview
        </button>
        {isShowPreview && isEmailValid && <GiftCardPreview amount={giftCardValue} />}
      </form>
    </>
  );
};
