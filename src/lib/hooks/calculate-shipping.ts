/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Dictionary } from '@reduxjs/toolkit';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { CalculateShippingProductParam } from '@src/types';

export type Rate = {
  id: string;
  label: string;
  cost: string;
};

export type Country = {
  code: string;
  name: string;
};

export type State = {
  code: string;
  name: string;
};

export type CalculateShippingHook = {
  rates: Rate[];
  isLoading: boolean;
  countries: Country[];
  selectedCountry: string;
  onCountryChange: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
  states: Dictionary<State[]>;
  selectedState: string;
  onStateChange: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCalculate: (_products: CalculateShippingProductParam[]) => void;
  resetRates: () => void;
  selectedShippingMethod: string;
  onSelectShippingMethod: (_shippingMethod: string) => void;
  fetchAvailableCountries: () => void;
};

export const useCalculateShipping = (): CalculateShippingHook => {
  const [rates, setRates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useLocalStorage<Country[]>('wooless-countries-product', []);
  const [selectedCountry, setSelectedCountry] = useLocalStorage(
    'wooless-selected-country-product',
    ''
  );
  const [states, setStates] = useLocalStorage<Dictionary<State[]>>('wooless-states-product', {});
  const [selectedState, setSelectedState] = useLocalStorage('wooless-selected-state-product', '');

  const fetchAvailableStates = useCallback(
    async (selectedCountry: string) => {
      setIsLoading(true);
      setSelectedState('');
      const statesResponse = await axios.get(`/api/countries/${selectedCountry}/states`);

      setStates({
        ...states,
        [selectedCountry]: statesResponse.data,
      });
      setIsLoading(false);
    },
    [setSelectedState, setStates, states]
  );

  const fetchAvailableCountries = useCallback(async () => {
    setIsLoading(true);
    const countries = await axios.get('/api/countries');
    setCountries(countries.data);
    if (countries.data.length === 1) {
      const { code: countryCode } = countries.data[0];
      await setSelectedCountry(countryCode);
      await fetchAvailableStates(countryCode);
    }
    setIsLoading(false);
  }, [setCountries, setSelectedCountry, fetchAvailableStates]);

  const onCountryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await setSelectedCountry(e.target.value);
    await fetchAvailableStates(e.target.value);
  };

  const onStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await setSelectedState(e.target.value);
  };

  const handleCalculate = async (products: CalculateShippingProductParam[]) => {
    setIsLoading(true);
    const data = {
      country: selectedCountry,
      state: selectedState,
      products,
    };
    const response = await axios.post('/api/calculate-shipping', data);
    setRates(response.data.rates);
    setIsLoading(false);
  };

  const resetRates = () => {
    setRates([]);
  };

  const selectedShippingMethod = '';
  const onSelectShippingMethod = () => {};

  return {
    rates,
    isLoading,
    countries,
    selectedCountry,
    onCountryChange,
    states,
    selectedState,
    onStateChange,
    handleCalculate,
    resetRates,
    selectedShippingMethod,
    onSelectShippingMethod,
    fetchAvailableCountries,
  };
};
