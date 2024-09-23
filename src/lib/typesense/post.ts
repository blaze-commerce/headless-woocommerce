import { getTypesenseClient } from '@src/lib/typesense';
import client from '@src/lib/typesense/client';
import TS_CONFIG from '@src/lib/typesense/config';
import { ITSPage } from '@src/lib/typesense/types';
import { PageSlugs } from '@src/schemas/page-schema';

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

  // Calculate total remaining pages
  const totalRemainingPages = Math.ceil(initialResults.found / perPage);

  // Fetch remaining pages
  for (let i = 2; i <= totalRemainingPages; i++) {
    await fetchPageSlugs(i);
  }

  return slugs;
};
