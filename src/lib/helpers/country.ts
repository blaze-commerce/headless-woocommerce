import regionSettings from '@public/region.json';

export const Country = {
  Australia: {
    code: 'AU',
    currency: 'AUD',
  },
};

export const getDefaultRegion = () => {
  return regionSettings.find((item) => item.default === true);
};

export const getDefaultCurrency = () => {
  const defaultRegion = getDefaultRegion();

  return defaultRegion?.currency ?? 'AUD';
};

export const getDefaultCountry = () => {
  const defaultRegion = getDefaultRegion();
  return defaultRegion?.baseCountry ?? 'AU';
};

export const getAllBaseContries = () => {
  return regionSettings.map((item) => item.baseCountry);
};

export const getAllCurrencies = () => {
  return regionSettings.map((item) => item.currency);
};
