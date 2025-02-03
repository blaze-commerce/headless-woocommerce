import { ApolloError } from '@apollo/client';
import { camelCase, chain, set } from 'lodash';
import regionSettings from '@public/region.json';

import { CountryPaths } from '@src/types';
import { htmlParser } from '@src/lib/block/react-html-parser';

export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformedData = (data: any[]) => {
  return data?.reduce((previousValue, currentValue) => {
    const arr = currentValue.meta_key.split('.');
    const chainedProperty = chain(arr).map(camelCase).value().join('.');
    let value = currentValue.meta_value;
    if (isJsonString(value)) {
      value = JSON.parse(value);
    }
    set(previousValue, chainedProperty, value);

    return previousValue;
  }, {});
};

export const parseApolloError = (error: ApolloError) => {
  if (!error.message) return '';
  const removePattern = /<a(.*)<\/a>/g;

  return htmlParser(error.message.replace(removePattern, '').trim());
};

export function generatePathsByCountry<T extends CountryPaths>(
  countries: string[],
  paths: T[]
): T[] {
  const generatedPaths: T[] = [];

  paths?.forEach((slugPath) => {
    countries.forEach((country) => {
      generatedPaths.push({
        ...slugPath,
        params: {
          ...slugPath.params,
          country,
        },
      });
    });
  });

  return generatedPaths;
}

export const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

export function getPageParams(urlArgs: string[]): number | undefined {
  if (urlArgs.length < 2) {
    return undefined;
  }

  const secondToLastItem = urlArgs[urlArgs.length - 2];
  const lastItem = urlArgs[urlArgs.length - 1];

  if (secondToLastItem === 'page' && !isNaN(Number(lastItem))) {
    return Number(lastItem);
  }

  return undefined;
}

export const getCurrencies = () => {
  return regionSettings.map((item) => item.currency);
};

export const capitalizeString = (stringVal: string) => {
  if (!stringVal) {
    return stringVal;
  }
  return stringVal.charAt(0).toUpperCase() + stringVal.slice(1);
};
