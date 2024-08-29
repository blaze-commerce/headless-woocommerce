import { useMutation, useQuery } from '@apollo/client';
import { Dictionary } from '@reduxjs/toolkit';
import { useState } from 'react';

import { useSiteContext } from '@src/context/site-context';
import {
  GET_ALLOWED_COUNTRY_STATES,
  UPDATE_CUSTOMER,
  UPDATE_SHIPPING_METHOD,
} from '@src/lib/graphql/queries';

type StateObject = {
  code: string;
  name: string;
};

const COUNTRY_MAP: Dictionary<string> = {
  AU: 'Australia',
  PH: 'Philippines',
};

export const ShippingMethods = () => {
  const {
    currentCurrency,
    calculateShipping,
    availableCountries,
    useSelectedCountry: [selectedCountry, setSelectedCountry],
    useSelectedState: [selectedState, setSelectedState],
    availableShippingMethods,
    selectedShippingMethod,
    onSelectShippingMethod,
    fetchCart,
  } = useSiteContext();
  const [states, setStates] = useState<StateObject[]>();
  const [showCalculateShipping, setShowCalculateShipping] = useState<boolean>(false);

  const { rates } = calculateShipping || {};

  const { refetch: fetchStates } = useQuery(GET_ALLOWED_COUNTRY_STATES, {
    onCompleted: (data) => {
      setStates(data.allowedCountryStates);
    },
    variables: {
      country: selectedCountry,
    },
  });

  const [updateShippingMethod] = useMutation(UPDATE_SHIPPING_METHOD, {
    onCompleted: (data, params) => {
      onSelectShippingMethod(params?.variables?.input.shippingMethods[0] || '');
    },
  });

  const [updateCustomer] = useMutation(UPDATE_CUSTOMER, {
    onCompleted: async () => {
      await fetchCart();
    },
    variables: {
      input: {
        billing: {
          country: selectedCountry,
          state: selectedState,
        },
        shippingSameAsBilling: true,
      },
    },
  });

  const handleCountrySelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setSelectedState('');
    fetchStates({
      country: e.target.value,
    });
  };

  const handleStateSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    updateCustomer({
      variables: {
        input: {
          billing: {
            country: selectedCountry,
            state: e.target.value,
          },
          shippingSameAsBilling: true,
        },
      },
    });
  };

  const handleShippingMethodChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await updateShippingMethod({
      variables: {
        input: {
          shippingMethods: [e.target.value],
        },
      },
    });
  };

  if (!rates) return null;

  return (
    <>
      <h4 className="font-bold mb-2">Shipping Method</h4>
      <div
        className="underline cursor-pointer mb-2"
        onClick={() => setShowCalculateShipping(!showCalculateShipping)}
      >
        Change shipping address
      </div>

      {showCalculateShipping && (
        <div>
          <div className="mb-4">
            <select
              className="w-full border p-2"
              id="selected_country"
              name="selected_country"
              onChange={handleCountrySelectChange}
              value={selectedCountry}
            >
              <option value="">Select a country</option>
              {availableCountries?.map((country) => (
                <option
                  key={country}
                  value={country}
                >
                  {COUNTRY_MAP[country]}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <select
              className="w-full border p-2"
              id="selected_state"
              name="selected_state"
              onChange={handleStateSelectChange}
              value={selectedState}
            >
              <option value="">Select a state</option>
              {selectedCountry &&
                states?.map((state) => (
                  <option
                    key={state.code}
                    value={state.code}
                  >
                    {state.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}

      <div>
        {selectedState !== '' &&
          availableShippingMethods &&
          availableShippingMethods.map((rate) => (
            <p key={rate?.id}>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="mr-2"
                  name="selectedShippingMethod"
                  value={rate.id}
                  checked={selectedShippingMethod === rate.id}
                  onChange={handleShippingMethodChange}
                />
                {rate?.label}:{' '}
                <span className="font-bold ml-auto">{`${currentCurrency} ${parseFloat(
                  rate?.cost
                ).toFixed(2)}`}</span>
              </label>
            </p>
          ))}
      </div>
    </>
  );
};
