import cx from 'classnames';
import { useCallback, useEffect } from 'react';

import { Loader } from '@src/components/loader';
import { useSiteContext } from '@src/context/site-context';
import { CalculateShippingProductParam } from '@src/types';

type Props = {
  products: CalculateShippingProductParam[];
  showButton?: boolean;
  showRates?: boolean;
  hidden?: boolean;
  title?: string;
};

const defaultProps = {
  showButton: false,
  showRates: false,
  hidden: false,
  title: undefined,
};

export const CalculateShipping: React.FC<Props> = ({ products, showButton, showRates, hidden }) => {
  const { currentCurrency, calculateShipping } = useSiteContext();

  const {
    rates,
    isLoading,
    countries,
    selectedCountry,
    onCountryChange,
    states,
    selectedState,
    onStateChange,
    handleCalculate,
    fetchAvailableCountries,
  } = calculateShipping || {};

  const calculateCallback = useCallback(() => {
    if (handleCalculate) {
      handleCalculate(products);
    }
  }, [products, handleCalculate]);

  const handleCountryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onCountryChange) {
      await onCountryChange(e);
    }

    calculateCallback();
  };

  useEffect(() => {
    if (!showButton) {
      calculateCallback();
    }

    if (countries?.length === 0 && fetchAvailableCountries) {
      fetchAvailableCountries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAvailableCountries]);

  return (
    <>
      <div className={cx('mb-4 relative text-black', { hidden })}>
        {(isLoading || countries?.length === 0) && <Loader />}
        <p className="text-base font-normal leading-normal mb-4">
          The shipping fee is charged based on the subtotal before taxes, discounts and
          non-refundable.
        </p>
        <div className="mb-4">
          <select
            className="w-full border px-3 py-2.5 rounded-sm border-brand-font text-brand-font text-xs"
            id="selected_country"
            name="selected_country"
            onChange={handleCountryChange}
            value={selectedCountry}
          >
            <option value="">Select a country</option>
            {countries?.map((country) => (
              <option
                key={country.code}
                value={country.code}
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            className="w-full border px-3 py-2.5 rounded-sm border-brand-font text-brand-font text-xs"
            id="selected_state"
            name="selected_state"
            onChange={onStateChange}
            value={selectedState}
          >
            <option value="">Select a state</option>
            {selectedCountry &&
              states?.[selectedCountry]?.map((state) => (
                <option
                  key={state.code}
                  value={state.code}
                >
                  {state.name}
                </option>
              ))}
          </select>
        </div>
        <input
          className="w-full border px-3 py-2.5 rounded-sm border-brand-font text-brand-font text-xs"
          placeholder="Zip Code"
        />
        {showRates && rates && (
          <ul className="my-4 ml-0 pl-0">
            {Object.values(rates).map((rate) => (
              <li
                key={rate?.id}
                className="mb-2 !indent-0"
              >
                {rate?.label}:{' '}
                <span className="font-bold">{`${currentCurrency} ${parseFloat(rate?.cost).toFixed(
                  2
                )}`}</span>
              </li>
            ))}
          </ul>
        )}
        {showButton && (
          <button
            className="button-calculate-shipping w-full px-10 py-2.5 rounded-sm border border-brand-font text-sm font-semibold leading-tight uppercase"
            onClick={() => {
              if (handleCalculate) {
                handleCalculate(products);
              }
            }}
          >
            Calculate
          </button>
        )}
      </div>
    </>
  );
};

CalculateShipping.defaultProps = defaultProps;
