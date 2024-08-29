import { env } from '@src/lib/env';

const { NEXT_PUBLIC_TYPESENSE_HOST, NEXT_PUBLIC_STORE_ID, NEXT_PUBLIC_TYPESENSE_PUBLIC_KEY } =
  env();

const TS_CONFIG = {
  server: {
    apiKey: NEXT_PUBLIC_TYPESENSE_PUBLIC_KEY as string, // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: NEXT_PUBLIC_TYPESENSE_HOST,
        path: '', // Optional. Example: If you have your typesense mounted in localhost:8108/typesense, path should be equal to '/typesense'
        port: 443,
        protocol: 'https',
      },
    ],
    connectionTimeoutSeconds: 20,
  },
  collectionNames: {
    product: `product-${NEXT_PUBLIC_STORE_ID}`,
    taxonomy: `taxonomy-${NEXT_PUBLIC_STORE_ID}`,
    page: `page-${NEXT_PUBLIC_STORE_ID}`,
  },
};

export default TS_CONFIG;
