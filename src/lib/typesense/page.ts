import { env } from '@src/lib/env';
import siteData from '@public/site.json';
import { getTypesenseClient } from '@src/lib/typesense';
import client from '@src/lib/typesense/client';
import TS_CONFIG from '@src/lib/typesense/config';
import { ITSPage } from '@src/lib/typesense/types';
import { PageSlugs } from '@src/schemas/page-schema';
import { isEmpty, reduce } from 'lodash';
const { NEXT_PUBLIC_STORE_ID } = env();

export type PageThumbnail = {
  title?: string;
  altText?: string;
  src?: string;
};

export type PageTypesenseResponse = {
  name: string;
  permalink: string;
  thumbnail: PageThumbnail;
  slug: string;
  updatedAt?: number;
  publishedAt?: number;
  content?: string;
  template: string;
};

export class Page {
  static async find(count?: number): Promise<PageTypesenseResponse[]> {
    if (!count) return [];

    const searchParameters = {
      q: '*',
      query_by: 'name',
      page: 1,
      per_page: count ?? 100,
      include_fields: 'name,permalink,thumbnail,slug,updatedAt,publishedAt,content',
      sort_by: 'publishedAt:desc',
    };

    const response = await getTypesenseClient()
      .collections<PageTypesenseResponse>(`page-${NEXT_PUBLIC_STORE_ID}`)
      .documents()
      .search(searchParameters);
    const results = response.hits?.map((hit) => hit.document);
    return results || [];
  }

  static async findByThumbnail(): Promise<PageTypesenseResponse[]> {
    const searchParameters = {
      q: '*',
      query_by: 'name',
      page: 1,
      per_page: 250,
      include_fields: 'name,permalink,thumbnail,slug,updatedAt,publishedAt,content',
      sort_by: 'publishedAt:desc',
    };

    const response = await getTypesenseClient()
      .collections<PageTypesenseResponse>(`page-${NEXT_PUBLIC_STORE_ID}`)
      .documents()
      .search(searchParameters);
    const results = response.hits?.map((hit) => hit.document);

    return (
      reduce(
        results,
        (result: PageTypesenseResponse[], page: PageTypesenseResponse) => {
          if (!isEmpty(page?.thumbnail) && page?.thumbnail?.src) {
            result.push(page);
          }

          return result;
        },
        []
      ) || []
    );
  }
}

export const getPageBySlug = async (slug: string): Promise<ITSPage | null> => {
  const searchParameters = {
    q: '*',
    query_by: 'slug',
    filter_by: `slug:=[${slug}]`,
    sort_by: '_text_match:desc',
  };

  const results = await client
    .collections(TS_CONFIG.collectionNames.page)
    .documents()
    .search(searchParameters);

  const found = null;
  if (typeof results.hits !== 'undefined' && results.hits[0]) {
    const tsPage: ITSPage = JSON.parse(JSON.stringify(results.hits[0].document));
    return tsPage;
  }
  return found;
};

const EXCLUDED_PAGE_SLUGS = [siteData.blogPageSlug];
/**
 * We will use this function to get all the page/post slugs so that we can rebuild those pages in the frontend later
 *
 * @param result this is an optional parameter that we need to remove later on.
 * @returns string[]
 */
export const getPageSlugs = async (result = 'static'): Promise<string[]> => {
  const slugs: string[] = [];

  // if ('static' === result) {
  //   // We push the home page slug to the slugs as the only page for now is home page
  //   slugs.push(getHomePageSlug());
  //   return slugs;
  // }

  const perPage = 250;
  const fetchPageSlugs = async (page: number) => {
    const searchParameters = {
      q: '*',
      query_by: 'name',
      page: page,
      per_page: perPage,
      include_fields: 'slug',
      filter_by: 'type:=[page]',
    };

    const results = await getTypesenseClient()
      .collections(TS_CONFIG.collectionNames.page)
      .documents()
      .search(searchParameters);

    results.hits?.forEach((hit) => {
      const parse = PageSlugs.safeParse(hit.document);
      if (parse.success && parse.data.slug) {
        const slug = parse.data.slug;
        if (!EXCLUDED_PAGE_SLUGS.includes(slug)) {
          slugs.push(slug);
        }
      }
    });

    return results;
  };

  // Fetch first page
  const initialResults = await fetchPageSlugs(1);

  // Calculate total remaining pages
  const totalRemainingPages = Math.ceil(initialResults.found / perPage);

  // Fetch remaining pages
  for (let i = 2; i <= totalRemainingPages; i++) {
    await fetchPageSlugs(i);
  }

  return slugs;
};

/**
 *
 * @returns string The homepage slug base on the wordpress settings
 */
export const getHomePageSlug = () => {
  return siteData.homepageSlug;
};
