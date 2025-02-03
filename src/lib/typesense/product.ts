import { isEmpty } from 'lodash';

import { Product, ProductTypesenseResponse } from '@src/models/product';
import { ContentBlockMetaData } from '@src/types';
import client from '@src/lib/typesense/client';
import TS_CONFIG from '@src/lib/typesense/config';
import siteSettings from 'public/site.json';

import { SearchResponse, SearchResponseHit } from 'typesense/lib/Typesense/Documents';
import { PRODUCT_TYPES } from '@src/lib/constants/product';

const generateSearchParamsByProductIds = (productIds: number[]) => {
  const searchParameters = {
    q: '*',
    query_by: 'name',
    sort_by: 'updatedAt:desc',
    per_page: 250,
    facet_by: 'productId',
    filter_by: 'productId:=[' + productIds.join(',') + ']',
  };

  return searchParameters;
};

export const transformToProduct = async (hit: SearchResponseHit<{}>) => {
  if (isEmpty(hit)) {
    return {};
  }

  let product = hit.document as ProductTypesenseResponse;

  if (product && 'variable' === product.productType && product.id) {
    const variations = await getVariations(parseInt(product.id));
    product = {
      ...product,
      variations,
    };
  }

  return product;
};

export const getProductTypesForDisplay = () => {
  let productTypes = PRODUCT_TYPES.filter((productType) => productType != 'variation');
  if (siteSettings.showVariantAsSeparateProductCards) {
    productTypes = PRODUCT_TYPES.filter((productType) => productType != 'variable');
  }

  return productTypes;
};

export const transformToProducts = async (results: SearchResponse<{}>) => {
  if (typeof results.hits !== 'undefined' && results.hits) {
    const products = results.hits.map(async (doc) => {
      return await transformToProduct(doc);
    });
    return await Promise.all(products);
  }

  return [];
};
export const getProductsByIds = async (productIds: number[] | undefined) => {
  if (typeof productIds === 'undefined' || isEmpty(productIds)) {
    return [];
  }

  const searchParameters = generateSearchParamsByProductIds(productIds);
  const results = await getProductDocument().search(searchParameters);
  return transformToProducts(results);
};

const getProductBySlug = async (sku: string): Promise<Product | null> => {
  const searchParameters = {
    q: '*',
    query_by: 'slug',
    filter_by: `slug:=[${sku}]`,
    sort_by: '_text_match:desc',
    facet_by: 'slug',
  };

  const results = await client
    .collections(TS_CONFIG.collectionNames.product)
    .documents()
    .search(searchParameters);

  if (typeof results.hits !== 'undefined' && results.hits[0]) {
    const tsProductData: Product = Product.buildFromResponse(results.hits[0].document);
    return tsProductData;
  }
  return null;
};

export const getProductDocument = () => {
  return client.collections(TS_CONFIG.collectionNames.product).documents();
};

const generateMetaDataObject = (
  metaData: ContentBlockMetaData,
  currentCountry: string,
  baseCountry: string
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataToPush: any = {};
  const firstCountry = Object.keys(metaData)[0];

  const counrtyToUse = isEmpty(metaData[currentCountry])
    ? baseCountry || firstCountry
    : currentCountry;

  for (const key in metaData[counrtyToUse]) {
    if (isEmpty(metaData[counrtyToUse][key])) {
      dataToPush[key] = metaData[baseCountry || firstCountry][key];
    } else {
      dataToPush[key] = metaData[counrtyToUse][key];
    }
  }

  return dataToPush;
};

export const getVariations = async (productId: number) => {
  const searchParameters = {
    q: '*',
    query_by: 'name',
    filter_by: `parentId:=${productId}`,
    sort_by: '_text_match:desc',
    per_page: 250,
  };

  const results = await client
    .collections(TS_CONFIG.collectionNames.product)
    .documents()
    .search(searchParameters);

  const found: Product[] = [];
  if (typeof results.hits !== 'undefined' && results.hits) {
    results.hits.map((doc) => {
      const tsProductData = doc.document as Product;
      found.push(tsProductData);
    });
  }

  return found;
};

const TSProduct = {
  getBySlug: getProductBySlug,
  getProductDocument,
  getProductsByIds,
  generateSearchParamsByProductIds,
  generateMetaDataObject,
};

export default TSProduct;
