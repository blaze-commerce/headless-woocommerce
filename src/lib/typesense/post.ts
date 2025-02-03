import { getTypesenseClient } from '@src/lib/typesense';
import client from '@src/lib/typesense/client';
import TS_CONFIG from '@src/lib/typesense/config';
import { ITSPage } from '@src/lib/typesense/types';
import { PageSlugs } from '@src/schemas/page-schema';

export type PostQueryVars = {
  page?: number;
  perPage?: number;
};

export const createExcerpt = (text: string, maxLength = 100): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const getPostBySlug = async (slug: string): Promise<ITSPage | null> => {
  const searchParameters = {
    q: '*',
    query_by: 'slug',
    filter_by: `slug:=[${slug}] && type:=[post]`,
    sort_by: '_text_match:desc',
  };

  const results = await client
    .collections(TS_CONFIG.collectionNames.page)
    .documents()
    .search(searchParameters);

  if (typeof results.hits !== 'undefined' && results.hits[0]) {
    const tsPage: ITSPage = JSON.parse(JSON.stringify(results.hits[0].document));
    return tsPage;
  }

  return null;
};

export type GetPostsResponse = {
  posts: ITSPage[];
  found: number;
  perPage: number;
  totalPages: number;
};
/**
 * Query the post data
 * @param queryVars
 * @returns
 */
export const getPosts = async (queryVars: PostQueryVars): Promise<GetPostsResponse | undefined> => {
  const page = queryVars.page ? queryVars.page : 1;
  const perPage = queryVars.perPage ? queryVars.perPage : 10;

  const searchParameters = {
    q: '*',
    query_by: 'slug',
    filter_by: 'type:=[post]',
    sort_by: 'publishedAt:desc',
    per_page: perPage,
    page: page,
  };

  const results = await client
    .collections(TS_CONFIG.collectionNames.page)
    .documents()
    .search(searchParameters);

  if (typeof results.hits !== 'undefined' && results.hits) {
    return {
      posts: results.hits.map((hit) => {
        const post: ITSPage = JSON.parse(JSON.stringify(hit.document));
        return post;
      }),
      found: results.found,
      perPage,
      totalPages: Math.ceil(results.found / perPage),
    };
  }
};

/**
 * @param result this is an optional parameter that we need to remove later on.
 * @returns string[]
 */
export const getPostSlugs = async (): Promise<string[]> => {
  const slugs: string[] = [];

  const perPage = 250;
  const fetchPageSlugs = async (page: number) => {
    const searchParameters = {
      q: '*',
      query_by: 'name',
      page: page,
      per_page: perPage,
      include_fields: 'slug',
      filter_by: 'type:=[post]',
    };

    const results = await getTypesenseClient()
      .collections(TS_CONFIG.collectionNames.page)
      .documents()
      .search(searchParameters);

    results.hits?.forEach((hit) => {
      const parse = PageSlugs.safeParse(hit.document);
      if (parse.success && parse.data.slug) {
        const slug = parse.data.slug;
        slugs.push(slug);
      }
    });

    return results;
  };

  // Fetch first page
  const initialResults = await fetchPageSlugs(1);

  // // Calculate total remaining pages
  // const totalRemainingPages = Math.ceil(initialResults.found / perPage);

  // // Fetch remaining pages
  // for (let i = 2; i <= totalRemainingPages; i++) {
  //   await fetchPageSlugs(i);
  // }

  return slugs;
};
