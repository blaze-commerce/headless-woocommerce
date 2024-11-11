import { useEffect, useState } from 'react';
import { useUpdateEffect } from 'usehooks-ts';

import TSTaxonomy from '../typesense/taxonomy';
import { ITSProductQueryResponse, ITSTaxonomyProductQueryVars } from '../typesense/types';

export const useFetchTsTaxonomyProducts = (
  queryVars: ITSTaxonomyProductQueryVars,
  fetchOnload = false
) => {
  const [data, setData] = useState<ITSProductQueryResponse>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const effect = fetchOnload ? useEffect : useUpdateEffect;
  effect(() => {
    const controller = new AbortController();
    setLoading(true);
    setIsFetched(false);
    const searchParameters = TSTaxonomy.generateSearchParams(queryVars);
    const searchOptions = {
      cacheSearchResultsForSeconds: 60,
      abortSignal: controller.signal,
    };

    TSTaxonomy.getProductDocument()
      .search(searchParameters, searchOptions)
      .then(async (results) => {
        setData(await TSTaxonomy.generateProductQueryResponse(queryVars, results));
      })
      .catch(setError)
      .finally(() => {
        setIsFetched(true);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [queryVars]);

  return { data, error, loading, isFetched };
};
