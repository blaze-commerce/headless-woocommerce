import { Client as TypesenseClient } from 'typesense';

import { env } from '@src/lib/env';
import { ProductTypesenseResponse } from '@src/models/product';
import TS_CONFIG from '@src/lib/typesense/config';

const { NEXT_PUBLIC_STORE_ID } = env();

export const MAX_QUERY_LIMIT = 250;

const client = new TypesenseClient({
  apiKey: TS_CONFIG.server.apiKey as string, // Be sure to use an API key that only allows search operations
  nodes: TS_CONFIG.server.nodes,
  connectionTimeoutSeconds: 20,
  cacheSearchResultsForSeconds: 0,
});

export const getTypesenseClient = () => client;

export class WoolessTypesense {
  static get product() {
    return client.collections<ProductTypesenseResponse>(`product-${NEXT_PUBLIC_STORE_ID}`);
  }
}
