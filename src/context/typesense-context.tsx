import { createContext, useContext } from 'react';
import { Client as TypesenseClient } from 'typesense';
import TypesenseInstantSearchAdapter, { SearchClient } from 'typesense-instantsearch-adapter';
import type { SearchParamsWithPreset } from 'typesense/lib/Typesense/Documents';

import TS_CONFIG from '@src/lib/typesense/config';
import { getProductTypesForDisplay } from '@src/lib/typesense/product';
import { getDefaultSortBy } from '@src/lib/typesense/taxonomy';
import { getTypesenseClient } from '@src/lib/typesense';

type BaseSearchParameters = Partial<Omit<SearchParamsWithPreset, 'q'>>;
interface CollectionSearchParameters {
  [key: string]: BaseSearchParameters;
}

type TypesenseContextType = {
  client: TypesenseClient;
  searchClient: SearchClient;
};

export const TypesenseContext = createContext<TypesenseContextType>({} as TypesenseContextType);

const productTypes = getProductTypesForDisplay();
const specificSearchParameters: CollectionSearchParameters = {};
const productQueryByFields = 'name,slug,shortDescription,description,seoFullHead';

const defaultSortBy = getDefaultSortBy();
let sortBy = 'stockStatus:asc';
if (defaultSortBy.value) {
  sortBy += `,${sortBy}`;
}

specificSearchParameters[TS_CONFIG.collectionNames.product] = {
  query_by: productQueryByFields,
  highlight_fields: productQueryByFields,
  filter_by: `productType:=[\`${productTypes.join('`,`')}\`] && status:=[\`publish\`]`,
  sort_by: sortBy,
};

const taxonomyQueryByFields = 'bannerText,description,name';
specificSearchParameters[TS_CONFIG.collectionNames.taxonomy] = {
  query_by: taxonomyQueryByFields,
  highlight_fields: taxonomyQueryByFields,
  filter_by: 'type:=[`product_cat`]',
};

export const TypesenseContextProvider = ({ children }: { children: JSX.Element }) => {
  const client = getTypesenseClient();

  const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
    server: TS_CONFIG.server,
    // The following parameters are directly passed to Typesense's search API endpoint.
    //  So you can pass any parameters supported by the search endpoint below.
    //  query_by is required.
    additionalSearchParameters: {
      query_by: '*',
      // queryByWeights: '4,2',
      // numTypos: '1',
      // typoTokensThreshold: 1,
    },
    collectionSpecificSearchParameters: specificSearchParameters,
  });
  const searchClient = typesenseInstantsearchAdapter.searchClient;
  return (
    <TypesenseContext.Provider
      value={{
        client,
        searchClient,
      }}
    >
      {children}
    </TypesenseContext.Provider>
  );
};

export const useTypesenseContext = () => useContext(TypesenseContext);
