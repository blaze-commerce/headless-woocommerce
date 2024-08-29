import { useEffect, useState } from 'react';

import { getTaxonomyDocument } from '@src/lib/typesense/taxonomy';
import { ITSTaxonomy } from '@src/lib/typesense/types';

export const useFetchTaxonomyItems = (taxonomySlug: string, parentSlug: string) => {
  const [data, setData] = useState<ITSTaxonomy[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (parentSlug) {
      setLoading(true);
      const controller = new AbortController();
      const searchParameters = {
        q: '*',
        query_by: 'parentSlug',
        filter_by: `parentSlug:=[\`${parentSlug}\`] && type:=[\`${taxonomySlug}\`]`,
        facet_by: 'type,parentSlug',
        per_page: 200,
        sort_by: 'name:asc',
      };

      const searchOptions = {
        cacheSearchResultsForSeconds: 60,
        abortSignal: controller.signal,
      };

      getTaxonomyDocument()
        .search(searchParameters, searchOptions)
        .then(async (results) => {
          if (results.hits) {
            const found = results.hits.map((doc) =>
              JSON.parse(JSON.stringify(doc.document))
            ) as ITSTaxonomy[];
            setData(found);
          }
        })
        .catch(setError)
        .finally(() => setLoading(false));

      return () => {
        controller.abort();
      };
    }

    if (parentSlug == '') {
      setLoading(false);
      setData([]);
    }
  }, [taxonomySlug, parentSlug]);

  return { data, error, loading };
};
