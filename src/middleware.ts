import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import CATEGORY_PATHS from '@public/categorypaths.json';
import siteData from '@public/site.json';
import postSlugs from '@public/post-slugs.json';
import { PAGE_URL_PATTERN } from '@src/lib/constants/taxonomy';
import { getDefaultCountry } from '@src/lib/helpers/country';
import { getHomePageSlug, getPageSlugs } from '@src/lib/typesense/page';
import { stripSlashes } from '@src/lib/helpers/helper';
import { NextURL } from 'next/dist/server/web/next-url';

import pageSlugs from '@public/page-slugs.json';

const typedPostSlugs: string[] = postSlugs;
const typedPageSlugs: string[] = pageSlugs;

// Limit middleware pathname config
export const config = {
  matcher: [
    '/',
    '/shop/:path*',
    '/product/:path*',
    '/products/:path*',
    '/brand/:path*',
    '/product-category/:path*',
    '/brands',
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
  unstable_allowDynamic: ['/node_modules/lodash/lodash.js'],
};

const generateNextResponse = (nextUrl: NextURL, currentCountry: string, geoCountry: string) => {
  const response = NextResponse.rewrite(nextUrl);
  response.cookies.set('currentCountry', currentCountry);
  response.cookies.set('geoCountry', geoCountry);
  return response;
};

const getCurrentCountry = (country: string) => {
  const regionsMapping: { [key: string]: string[] } = siteData.regions;

  let currentCountry = '';
  for (const region in regionsMapping) {
    currentCountry = region;
    if (regionsMapping && regionsMapping[region].includes(country)) {
      break;
    }
  }

  if (currentCountry === '') {
    currentCountry = getDefaultCountry();
  }

  return currentCountry;
};

export async function middleware(req: NextRequest) {
  // Exclude image paths, xml, and wp-admin/content
  if (
    /\.(jpg|jpeg|png|gif|webp|svg|xml)$/i.test(req.nextUrl.pathname) ||
    /\/wp-admin|\/wp-content/i.test(req.nextUrl.pathname) ||
    req.nextUrl.search.includes('esc-nextjs=1')
  ) {
    return NextResponse.next();
  }

  // Extract country
  let country = req.cookies.get('currentCountry')?.value;
  const geoCountry = req.geo?.country || '';
  if (!country) {
    country = geoCountry;
  }

  const currentCountry = getCurrentCountry(country);

  if (req.nextUrl.pathname.startsWith('/products/new')) {
    req.nextUrl.pathname = `/${currentCountry}/new`;
    // Rewrite to URL
    const response = NextResponse.rewrite(req.nextUrl);
    return response;
  }

  if (req.nextUrl.pathname.startsWith('/products/on-sale')) {
    req.nextUrl.pathname = `/${currentCountry}/on-sale`;
    // Rewrite to URL
    const response = NextResponse.rewrite(req.nextUrl);
    return response;
  }

  if (
    req.nextUrl.pathname.startsWith('/shop') ||
    req.nextUrl.pathname.startsWith('/product') ||
    req.nextUrl.pathname.startsWith('/brand') ||
    req.nextUrl.pathname.startsWith('/brands')
  ) {
    const pathName = req.nextUrl.pathname;
    req.nextUrl.pathname = `/${currentCountry}${pathName}`;

    const isShopProductPage = /\/shop\/.+$/.test(pathName);
    if (isShopProductPage) {
      req.nextUrl.pathname = `/${currentCountry}${pathName.replace('/shop/', '/product/')}`;
    }

    // Rewrite to URL
    return generateNextResponse(req.nextUrl, currentCountry, geoCountry);
  }

  const pathname = req.nextUrl.pathname;

  const isCatalogPage = CATEGORY_PATHS.includes(pathname.replace(PAGE_URL_PATTERN, ''));

  if (isCatalogPage) {
    req.nextUrl.pathname = `/${currentCountry}/product-category${pathname}`;

    return generateNextResponse(req.nextUrl, currentCountry, geoCountry);
  }

  let modifiedPathName = pathname;
  if ('/' === modifiedPathName) {
    modifiedPathName = getHomePageSlug();
  }

  // We remove the leading slash since slugs we save doesn't have it to make sure this goes to the right nextjs page path
  modifiedPathName = stripSlashes(modifiedPathName);

  // @TODO we will handle parent child post/page url structure later
  if (typedPageSlugs.includes(modifiedPathName)) {
    req.nextUrl.pathname = `/${currentCountry}/page/${modifiedPathName}`;
    return generateNextResponse(req.nextUrl, currentCountry, geoCountry);
  }

  if (typedPostSlugs.includes(modifiedPathName)) {
    req.nextUrl.pathname = `/${currentCountry}/post/${modifiedPathName}`;
    return generateNextResponse(req.nextUrl, currentCountry, geoCountry);
  }

  if (['/search-results', '/search-results/'].includes(pathname)) {
    req.nextUrl.pathname = `/${currentCountry}${pathname}`;
    return generateNextResponse(req.nextUrl, currentCountry, geoCountry);
  }

  // Let next.js handle the clients/browser request
  return NextResponse.next();
}
