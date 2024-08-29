import siteSettings from '@public/site.json';

export const getCookie = (name: string, nameStartsWith = false) => {
  // Split cookie string and get all individual name=value pairs in an array
  const cookieArr = typeof document !== 'undefined' ? document.cookie.split(';') : [];

  // Loop through the array elements
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split('=');
    const cookieName = cookiePair[0].trim();

    /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
    if (name == cookieName || (nameStartsWith === true && cookieName.startsWith(name))) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if not found
  return null;
};

export const setCookie = (name: string, value: string, daysToLive: number) => {
  // Encode value in order to escape semicolons, commas, and whitespace
  let cookie = `${name}=${encodeURIComponent(value)}; domain=${siteSettings.cookieDomain}; path=/`;

  if (typeof daysToLive === 'number') {
    /* Sets the max-age attribute so that the cookie expires
      after the specified number of days */
    cookie += '; max-age=' + daysToLive * 24 * 60 * 60;
    document.cookie = cookie;
  }

  cookie = `${name}=${encodeURIComponent(value)}; domain=${siteSettings.cookieDomain.substring(
    1
  )}; path=/`;

  if (typeof daysToLive === 'number') {
    /* Sets the max-age attribute so that the cookie expires
      after the specified number of days */
    cookie += '; max-age=' + daysToLive * 24 * 60 * 60;
    document.cookie = cookie;
  }
};
