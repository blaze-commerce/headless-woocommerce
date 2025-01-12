import { parseLink } from '@src/lib/helpers/helper';

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#e1e1e1" offset="20%" />
      <stop stop-color="#cfcfcf" offset="50%" />
      <stop stop-color="#e1e1e1" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#e1e1e1" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

export const imageDataBlurUrl = (w: number, h: number) => {
  return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
};

export const parseImageLink = (htmlString: string): string | null => {
  return parseLink(htmlString);
};

export const parsetImageSrc = (htmlString: string): string | null => {
  // Regular expression to match src attribute in img tag
  const regex = /<img.*?src=["'](.*?)["']/;

  // Match the regex pattern against the input HTML string
  const match = htmlString.match(regex);

  // If match is found, return the src value
  return match && match.length > 1 ? match[1] : null;
};

export const parseImageAlt = (htmlString: string): string => {
  // Regular expressions to match alt and title attributes in img tag
  const altRegex = /<img.*?alt=["'](.*?)["']/;
  const titleRegex = /<img.*?title=["'](.*?)["']/;

  // Match the regex patterns against the input HTML string
  const altMatch = htmlString.match(altRegex);
  const titleMatch = htmlString.match(titleRegex);

  // If alt attribute is found, return its value
  if (altMatch && altMatch.length > 1 && altMatch[1]) {
    return altMatch[1];
  }
  // If alt attribute is not found, try to get value from title attribute
  if (titleMatch && titleMatch.length > 1 && titleMatch[1]) {
    return titleMatch[1];
  }

  return ''; // Return empty string if neither alt nor title attribute is found
};

export const parseImageClass = (htmlString: string): string => {
  // Regular expression to match src attribute in img tag
  const regex = /<img.*?class=["'](.*?)["']/;

  // Match the regex pattern against the input HTML string
  const match = htmlString.match(regex);

  // If match is found, return the src value
  return match && match.length > 1 ? match[1].split(' ').join('-') : '';
};
