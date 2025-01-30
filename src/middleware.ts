import type { NextRequest } from 'next/server';
import { geolocation } from '@vercel/functions';
import { NextResponse } from 'next/server';

import CATEGORY_PATHS from '@public/categorypaths.json';
import siteData from '@public/site.json';
import postSlugs from '@public/post-slugs.json';
import { getDefaultCountry, getRegionByCountry } from '@src/lib/helpers/country';
import pageSlugs from '@public/page-slugs.json';
import { NextURL } from 'next/dist/server/web/next-url';

export const PAGE_URL_PATTERN = /\/page\/\d+\//;

function stripSlashes(str: string): string {
  return str.replace(/^\/|\/$/g, '');
}

/**
 *
 * @returns string The homepage slug base on the wordpress settings
 */
export const getHomePageSlug = () => {
  return siteData.homepageSlug;
};

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
  unstable_allowDynamic: ['/node_modules/lodash/lodash.js', '/node_modules/lodash/_root.js'],
};

const generateNextResponse = (nextUrl: NextURL, currentCountry: string, geoCountry: string) => {
  const response = NextResponse.rewrite(nextUrl);
  response.cookies.set('currentCountry', currentCountry);
  response.cookies.set('geoCountry', geoCountry);
  return response;
};

const getCurrentCountry = (country: string) => {
  const region = getRegionByCountry(country);
  if (region) {
    return region.baseCountry;
  }

  return getDefaultCountry();
};

const isBlogPageUrl = (url: string): boolean => {
  const pattern = /^blog\/page\/\d+$/;
  return pattern.test(url);
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

  const { country: geoCountry = '' } = geolocation(req);
  const country = req.cookies.get('currentCountry')?.value || geoCountry;
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

  if (req.nextUrl.pathname.startsWith(siteData.woocommercePermalinks.product_base)) {
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

  if (modifiedPathName === siteData.shopPageSlug) {
    req.nextUrl.pathname = `/${currentCountry}/shop`;
    return generateNextResponse(req.nextUrl, currentCountry, geoCountry);
  }

  if (modifiedPathName === siteData.blogPageSlug) {
    req.nextUrl.pathname = `/${currentCountry}/blog`;
    return generateNextResponse(req.nextUrl, currentCountry, geoCountry);
  }

  if (isBlogPageUrl(modifiedPathName)) {
    req.nextUrl.pathname = `/${currentCountry}/${modifiedPathName}/`;
    return generateNextResponse(req.nextUrl, currentCountry, geoCountry);
  }

  // @TODO we will handle parent child post/page url structure later
  if (typedPageSlugs.includes(modifiedPathName)) {
    req.nextUrl.pathname = `/${currentCountry}/page/${modifiedPathName}`;
    return generateNextResponse(req.nextUrl, currentCountry, geoCountry);
  }

  if (typedPostSlugs.includes(String(modifiedPathName))) {
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
