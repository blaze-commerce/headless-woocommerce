import axios from 'axios';
import clsx, { ClassValue } from 'clsx';
import { find } from 'lodash';
import { parse } from 'node-html-parser';
import { twMerge } from 'tailwind-merge';

import { Image, ProductPrice } from '@src/models/product/types';
import { imageExtensions } from '@src/lib/constants/image';
import regionSettings from '@public/region.json';
import { numberFormat } from '@src/lib/helpers/product';

export function getEndpointUrl(link: string) {
  let endpoint = link.replace(process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL as string, '');
  endpoint = endpoint.replace('https://cart.gourmetbasket.com.au/', '');
  endpoint = endpoint.replace('https://gb-headless-v2.blz.onl/', '');
  return `${endpoint}`;
}

export function replaceBackendUrlToFrontEndUrl(str: string) {
  return str.replaceAll(
    process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL as string,
    process.env.NEXT_PUBLIC_FRONTEND_SITE_URL as string
  );
}

export const stripTrailingSlash = (str: string) => {
  return str.endsWith('/') ? str.slice(0, -1) : str;
};

export const stripLeadingSlash = (str: string): string => {
  return str.startsWith('/') ? str.slice(1) : str;
};

export const stripSlashes = (str: string): string => {
  return stripTrailingSlash(stripLeadingSlash(str));
};

export const isDevEnvironment = process && process.env.NODE_ENV === 'development';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isLightColor = (color: any) => {
  // Variables for red, green, blue values
  let r, g, b;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 200) {
    return true;
  } else {
    return false;
  }
};

export const isMp4 = (src: string) => {
  if (src && src.includes('.mp4')) {
    return true;
  }
  return false;
};

export const convertToTime = (value: number) => {
  const hours = Math.floor(value / 60);
  const minutes = Math.trunc(value % 60);
  if (minutes < 10) {
    return `${hours}:0${minutes}`;
  } else {
    return `${hours}:${minutes}`;
  }
};

export const removeHttp = (url: string) => {
  if (url.startsWith('https://')) {
    const https = 'https://';
    return url.slice(https.length);
  }

  if (url.startsWith('http://')) {
    const http = 'http://';
    return url.slice(http.length);
  }

  return url;
};

export const getCurrentIPAddress = async () => {
  return await axios.get('https://api.ipify.org?format=json');
};

export const countObjectEntries = (object: { [key: string]: boolean }) => {
  let count = 0;
  for (const key in object) {
    if (object[key]) {
      count++;
    }
  }
  return count;
};

export const computeTotalPercentage = (rate: number, count: number) => {
  return {
    percent: (rate / count) * 100,
    total: rate,
  };
};

export const getBaseURL = (url: string) => url?.replace(/(http(s)?:\/\/)|(\/.*){1}/g, '');

export const makeLinkRelative = (link: string) => {
  try {
    const parsedUrl = new URL(link);
    const path = parsedUrl.pathname + parsedUrl.search;
    return path;
  } catch (error) {
    return link; // Return the original URL in case of an error
  }
};

export const formatTextWithNewline = (text: string) => {
  const replaceNoBreakSpace = text.replace(/&nbsp;/g, '&nbsp; <br />');
  const replaceUnorderedList = replaceNoBreakSpace.replace(/<\/ul>/, '</ul><br />');

  const embedPattern = /\[embed\](.*?)\[\/embed\]/g;
  const replacedYoutubeEmbeds = replaceUnorderedList.replace(embedPattern, replaceEmbedWithIframe);

  return replacedYoutubeEmbeds;
};

// Replace function to create iframe elements
function replaceEmbedWithIframe(match: string, youtubeUrl: string) {
  const videoId = extractVideoId(youtubeUrl);
  if (videoId) {
    const iframeHtml = `<div class="video-container"><iframe width="100%" height="500" src="https://www.youtube.com/embed/${videoId}?feature=oembed" frameborder="0" allowfullscreen></iframe></div>`;
    return iframeHtml;
  }
  return match; // Return the original match if videoId extraction fails
}

function extractVideoId(url: string) {
  // Logic to extract video ID from URL, you can use regex or other methods
  // For example, if URL is https://youtu.be/VIDEO_ID
  const match = url.match(/youtu.be\/([^&]+)/);

  if (match) {
    return match[1];
  }
  return null; // Return null if extraction fails
}

export const getHtmlAttribute = (htmlStr: string, attribute: string) => {
  if (htmlStr) {
    const element = parse(htmlStr);
    const div = element.querySelector('div');
    const value = div?.getAttribute(attribute);
    return value;
  }

  return null;
};

export const isDollar = (currency: string) => {
  const isUSD = currency === 'USD';
  const isAUD = currency === 'AUD';
  const isNZD = currency === 'NZD';

  if (isUSD || isAUD || isNZD) {
    return true;
  }

  return false;
};

export const getCurrencySymbol = (currency: string) => {
  const matchedCurrency = regionSettings.find((item) => item.currency === currency);
  return matchedCurrency?.symbol || '$';
};

export const removeCurrencySymbol = (currency: string, price: string) => {
  const symbol = getCurrencySymbol(currency);
  const regex = new RegExp(`\\${symbol}`, 'g');
  return numberFormat(parseFloat(price.replace(regex, '').replace(/,/g, '')));
};

const priceOrder = ['symbol', 'price'];

export const formatPrice = (price: ProductPrice = {}, currency: string) => {
  const matchedCurrency = regionSettings.find((item) => item.currency === currency);
  const percision =
    (typeof matchedCurrency?.precision === 'string'
      ? parseInt(matchedCurrency?.precision)
      : matchedCurrency?.precision) || 2;
  const thousandSeparator = matchedCurrency?.thousandSeparator || ',';
  return priceOrder.map((component) => {
    switch (component) {
      case 'symbol':
        return matchedCurrency?.symbol || '$';
      case 'price':
        return `${price[currency]?.toFixed(percision)}`.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          thousandSeparator
        );
      case 'currency':
        return currency;
    }
  });
};

export const sortAscending = (a?: string | number, b?: string | number) => {
  if (!a || !b) return 0;
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

export const isImage = (images: Image[], mainImageSrc: string) => {
  const imageArray: Image[] = [];

  imageExtensions.map((ext) => {
    find(images, (image, index) => {
      if (image?.src.endsWith(ext) && image?.src !== mainImageSrc) {
        imageArray.push(images?.[index]);
      }
    });
  });

  return imageArray?.[0];
};

export const validateEmail = (email: string) => {
  const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};

export const parseJsonValue = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return [];
  }
};

export const splitStringToArray = (baseValue: string, otherValue: string) => {
  try {
    if (!otherValue) return baseValue.split(',').map((item) => parseInt(item));
    return otherValue.split(',').map((item) => parseInt(item));
  } catch (error) {
    return [];
  }
};

export const stringToBoolean = (value: string): boolean | undefined => {
  const lowerCaseValue = value.toLowerCase().trim();
  if (lowerCaseValue === 'true') {
    return true;
  } else if (lowerCaseValue === 'false') {
    return false;
  } else {
    return undefined; // Return undefined for invalid input
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isStagingSite = () => {
  if (typeof window !== 'undefined') {
    return window.location.host.includes('.blz.onl');
  }

  return false;
};

export const isDevelopmentEnvironment = () => {
  const siteUrl = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL;
  return siteUrl.includes('.blz.onl');
};

export const getColumnWidth = (span?: string) => {
  switch (span) {
    case '1':
      return 'w-1/12';
    case '2':
      return 'w-2/12';
    case '3':
      return 'w-3/12';
    case '4':
      return 'w-4/12';
    case '5':
      return 'w-5/12';
    case '6':
      return 'w-6/12';
    case '7':
      return 'w-7/12';
    case '8':
      return 'w-8/12';
    case '9':
      return 'w-9/12';
    case '10':
      return 'w-10/12';
    case '11':
      return 'w-11/12';
    default:
      return 'w-full';
  }
};

/**
 * Extracts the href value from the canonical link tag in the given HTML string.
 * @param html - The HTML string to search within.
 * @returns The href value if found, otherwise null.
 */
export const getCanonicalHref = (html: string): string | null => {
  // Regular expression to match the canonical link tag and capture the href value
  const canonicalHrefRegex = /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']\s*\/?>/i;

  // Execute the regex on the HTML string
  const match = canonicalHrefRegex.exec(html);

  // If a match is found, return the captured href value, otherwise return null
  return match ? match[1] : null;
};

export const updateCanonicalLink = (html: string, newCanonicalUrl: string): string => {
  const canonicalRegex = /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i;
  const newCanonicalTag = `<link rel="canonical" href="${newCanonicalUrl}" />`;

  if (canonicalRegex.test(html)) {
    return html.replace(canonicalRegex, newCanonicalTag);
  }

  return '';
};

/**
 * Convert a string to a slug that can be used in URLs
 * @param   string text
 * @returns string
 */
export const sanitizeTitle = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
};

export function formatPriceWithCurrency(price: number | string, currency: string) {
  // convert string or number price to currency format

  if (typeof price === 'string') price = parseFloat(price);

  const currencySymbol = getCurrencySymbol(currency);
  return `${currencySymbol}${numberFormat(price)}`;
}

export const parseLink = (htmlString: string): string | null => {
  // Regular expression to match src attribute in img tag
  const regex = /<a.*?href=["'](.*?)["']/;

  // Match the regex pattern against the input HTML string
  const match = htmlString.match(regex);

  // If match is found, return the src value
  return match && match.length > 1 ? match[1] : null;
};
