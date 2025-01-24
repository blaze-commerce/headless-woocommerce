import { getTypesenseClient } from '@src/lib/typesense';
import { SubCategory, SubCategorySchema, TaxonomyPermalink } from '@src/schemas/taxonomy-schema';
import { parseJsonValue, stripTrailingSlash } from '@src/lib/helpers/helper';
import TS_CONFIG from '@src/lib/typesense/config';
import { IFilterOptionData, TaxonomyPageParams } from '@src/lib/types/taxonomy';
import siteData from '@public/site.json';

import client from '@src/lib/typesense/client';
import {
  ITSImage,
  ITSFilterOption,
  ITSProductQueryResponse,
  ITSTaxonomy,
  ITSTaxonomyProductQueryVars,
} from '@src/lib/typesense/types';
import { ProductTypesenseResponse } from '@src/models/product';
import { ProductPaths, TaxonomyPaths } from '@src/types';
import { isEmpty, reduce } from 'lodash';
import regionalSettings from 'public/region.json';
import siteSettings from 'public/site.json';
import {
  SearchResponse,
  SearchResponseFacetCountSchema,
  SearchResponseHit,
} from 'typesense/lib/Typesense/Documents';
import { getProductTypesForDisplay, getVariations } from '@src/lib/typesense/product';
import { getCurrencies } from '@src/lib/helpers';
import { getAllCurrencies, getDefaultCurrency } from '@src/lib/helpers/country';

export const getCategoryPermalinks = async (): Promise<string[]> => {
  const permalinks: string[] = [];
  const perPage = 100;

  const fetchPermalinks = async (page: number) => {
    const searchParameters = {
      q: '*',
      query_by: 'name',
      filter_by: 'type:=[`product_cat`]',
      page: page,
      per_page: perPage,
      include_fields: 'permalink',
    };

    const results = await getTypesenseClient()
      .collections(TS_CONFIG.collectionNames.taxonomy)
      .documents()
      .search(searchParameters);

    results.hits?.forEach((hit) => {
      const parse = TaxonomyPermalink.safeParse(hit.document);
      if (parse.success && parse.data.permalink) {
        const permalink = parse.data.permalink;
        permalinks.push(`${stripTrailingSlash(permalink)}/`);
      }
    });

    return results;
  };

  // Fetch first page
  const initialResults = await fetchPermalinks(1);

  // Calculate total remaining pages
  const totalRemainingPages = Math.ceil(initialResults.found / perPage);

  // Fetch remaining pages
  for (let i = 2; i <= totalRemainingPages; i++) {
    await fetchPermalinks(i);
  }

  return permalinks;
};
interface ISearchParameters {
  collection: string;
  q: string;
  query_by: string;
  facet_by: string;
  per_page: number;
  page: number;
  max_facet_values: number;
  sort_by?: string;
  include_fields: string;
  filter_by?: string;
  highlight_fields?: string;
}
interface IPriceFilterOptions {
  [key: string]: {
    [key: string]: string;
  };
}
const sortOptions = (currency = regionalSettings?.[0]?.currency || 'AUD') => [
  // {
  //   label: '<label>Sort by:</label> None',
  //   value: 'menuOrder:asc',
  // },
  {
    label: '<label>Sort by:</label> Popularity',
    value: 'totalSales:desc',
  },
  {
    label: '<label>Sort by:</label> Latest',
    value: 'publishedAt:desc',
  },
  {
    label: '<label>Sort by price:</label> low to high',
    value: `price.${currency}:asc`,
  },
  {
    label: '<label>Sort by price:</label> high to low',
    value: `price.${currency}:desc`,
  },
  {
    label: '<label>Sort by</label> Alphabetical A-Z',
    value: 'name:asc',
  },
  {
    label: '<label>Sort by</label> Alphabetical Z-A',
    value: 'name:desc',
  },
];
const priceFilterOptions: IPriceFilterOptions = {
  Low: {
    label: '$0 - $100',
    value: 'price.{DEFAULT_CURRENCY}:>=0 && price.{DEFAULT_CURRENCY}:<=100',
  },
  Mid: {
    label: '$100 - $150',
    value: 'price.{DEFAULT_CURRENCY}:>=100 && price.{DEFAULT_CURRENCY}:<=150',
  },
  High: {
    label: '$150 - $1699',
    value: 'price.{DEFAULT_CURRENCY}:>=150',
  },
};

export const taxonomyTypeToSlug = (slug: string) => {
  if ('product_cat' == slug) {
    return 'product-category';
  }

  if ('product_brand' == slug) {
    return 'brands';
  }

  return slug;
};

export const taxonomyUrlSlugToWpTaxonomySlug = (urlSlug: string) => {
  if ('product-category' == urlSlug) {
    return 'product_cat';
  }

  if ('product-tag' == urlSlug) {
    return 'product_tag';
  }

  if ('brand' == urlSlug || 'brands' == urlSlug) {
    return 'product_brand';
  }

  return urlSlug;
};
const taxonomiesFilterByIn = (query: string[]) => `taxonomies.filters:=[\`${query.join('`,`')}\`]`;
const taxonomiesFilterByAnd = (query: string[]) => query.join(' && ');
const generateSearchParams = (queryVars: ITSTaxonomyProductQueryVars) => {
  // 	taxonomies.type:=[`favourite`] && taxonomies.slug:=[`gourmet-food-gift-baskets`] && taxonomies.nameAndType:=[`For Women|shop-by`,`Farewell|occasion`]
  //   facet_by=price(Low:[0, 100], Mid:[100, 150], High:[150, 10000])
  const filterBySearch: string[] = [];
  const filterByArr: string[] = [];
  const filterByOrLogic: string[] = [];
  const filterByRefinedSelection: string[] = [];
  const filterByBrands: string[] = [];

  if (typeof queryVars.taxonomySlug !== 'undefined' && !isEmpty(queryVars.taxonomySlug)) {
    const taxonomySlug = taxonomyUrlSlugToWpTaxonomySlug(queryVars.taxonomySlug);
    filterByArr.push('taxonomies.type:=[`' + taxonomySlug + '`]');
  }

  if (typeof queryVars.termSlug !== 'undefined' && !isEmpty(queryVars.termSlug)) {
    filterByArr.push('taxonomies.slug:=[`' + queryVars.termSlug + '`]');
  }

  if (typeof queryVars.termIds !== 'undefined' && !isEmpty(queryVars.termIds)) {
    filterByArr.push('taxonomies.termId:=[`' + queryVars.termIds.join('`,`') + '`]');
  }

  if (typeof queryVars.nameAndTypes !== 'undefined' && !isEmpty(queryVars.nameAndTypes)) {
    //	Sample query
    // 	taxonomies.nameAndType:=[`For Women|shop-by`,`Farewell|occasion`]
    const nameAndTypeStrArr = queryVars.nameAndTypes.join('`,`');
    filterByArr.push('taxonomies.nameAndType:=[`' + nameAndTypeStrArr + '`]');
  }

  if (
    typeof queryVars.childAndParentTerm !== 'undefined' &&
    !isEmpty(queryVars.childAndParentTerm)
  ) {
    const childAndParentTermStrArr = queryVars.childAndParentTerm.join('`,`');
    filterByArr.push('taxonomies.childAndParentTerm:=[`' + childAndParentTermStrArr + '`]');
  }

  /**
   * Price filter
   */
  if (queryVars.priceFilter !== 'undefined' && !isEmpty(queryVars.priceFilter)) {
    filterByArr.push(queryVars.priceFilter as string);
  }

  if (typeof queryVars.onSale !== 'undefined') {
    filterByArr.push(`onSale:=[${queryVars.onSale}]`);
  }

  if (typeof queryVars.isFeatured !== 'undefined') {
    filterByArr.push(`isFeatured:=[${queryVars.isFeatured}]`);
  }

  if (typeof queryVars.newThreshold !== 'undefined') {
    filterByArr.push(`daysPassed:=[0..${queryVars.newThreshold}]`);
  }

  if (typeof queryVars.stockStatus !== 'undefined') {
    filterByArr.push(`stockStatus:=[\`${queryVars.stockStatus}\`]`);
  }

  if (!isEmpty(queryVars.categoryFilter)) {
    const newCategoryFilter = queryVars.categoryFilter?.split('|, ');
    newCategoryFilter?.map((queryFilter, key) => {
      let filter = `taxonomies.filters:=[\`${queryFilter}\`]`;

      // if key is not the last item, add | on the last filter value
      if (key !== newCategoryFilter.length - 1) {
        filter += '|';
      }
      filterByOrLogic.push(`${filter}`);
    });
  }

  if (!isEmpty(queryVars.attributeFilter)) {
    filterByOrLogic.push(`taxonomies.filters:=[\`${queryVars.attributeFilter?.join('`,`')}\`]`);
  }

  if (!isEmpty(queryVars.refinedSelection)) {
    const newRefinedSelection = queryVars.refinedSelection?.split(', ');

    newRefinedSelection?.map((queryFilter) => {
      filterByRefinedSelection.push(queryFilter);
    });
  }

  if (!isEmpty(queryVars.brandsFilter)) {
    const newBrandsFilter = queryVars.brandsFilter?.split(', ');

    newBrandsFilter?.map((queryFilter) => {
      filterByBrands.push(queryFilter);
    });
  }

  const currencies = getCurrencies();
  const defaultCurrency = getDefaultCurrency();
  const priceString = `price.${currencies.join(',price.')}`;

  const queryByString = !queryVars.searchQuery
    ? 'slug'
    : 'name,slug,shortDescription,description,seoFullHead';

  const searchParameters: ISearchParameters = {
    collection: TS_CONFIG.collectionNames.product,
    q: !queryVars.searchQuery ? '*' : queryVars.searchQuery,
    query_by: queryByString,
    highlight_fields: queryByString,
    facet_by: `taxonomies.nameAndType,taxonomies.type,taxonomies.slug,price.${defaultCurrency}(Low:[0,100],Mid:[100,150],High:[150,10000]),taxonomies.childAndParentTerm,onSale,daysPassed,taxonomies.filters,stockStatus,${priceString},status,productType`,
    per_page: queryVars.perPage as number,
    page: queryVars.page as number,
    max_facet_values: 200,
    sort_by: `stockStatus:asc,${queryVars.sortBy}`, // Default sortby totalSales desc
    include_fields:
      'permalink,attributes,thumbnail,name,onSale,stockStatus,regularPrice,price,sku,salePrice,galleryImages,createdAt,stockQuantity,productType,id,judgemeReviews,publishedAt,daysPassed,yotpoReviews,variations,metaData,taxonomies',
  };

  const hasRefinedSelection = !isEmpty(filterByRefinedSelection);
  const hasFilterByOrLogic = !isEmpty(filterByOrLogic);
  const hasFilterByArr = !isEmpty(filterByArr);
  const hasFilterByBrands = !isEmpty(filterByBrands);

  // Exclude data that is not for catalog in taxonomy pages results
  const excludedFilter = 'taxonomies.nameAndType:!=[`exclude-from-catalog|product_visibility`]';

  if (hasRefinedSelection) {
    filterBySearch.push(taxonomiesFilterByIn(filterByRefinedSelection));
  }

  if (hasFilterByOrLogic) {
    filterBySearch.push(taxonomiesFilterByAnd(filterByOrLogic));
  }

  if (hasFilterByArr) {
    filterBySearch.push(taxonomiesFilterByAnd(filterByArr));
  }

  if (hasFilterByBrands) {
    filterBySearch.push(taxonomiesFilterByIn(filterByBrands));
  }

  filterBySearch.push(excludedFilter);

  filterBySearch.push('status:=[`publish`]');
  filterBySearch.push(`productType:=[\`${getProductTypesForDisplay().join('`,`')}\`]`);

  searchParameters['filter_by'] = filterBySearch.join(' && ');

  return searchParameters;
};

const getPageData = async (taxonomySlug: string, termSlug: string): Promise<ITSTaxonomy | null> => {
  const searchParameters = {
    q: `${termSlug}`,
    query_by: 'slug',
    filter_by: `type:=[${taxonomyUrlSlugToWpTaxonomySlug(taxonomySlug)}]`,
    sort_by: '_text_match:desc',
    facet_by: 'type',
  };

  const results = await client
    .collections(TS_CONFIG.collectionNames.taxonomy)
    .documents()
    .search(searchParameters);

  const found = null;
  if (typeof results.hits !== 'undefined' && results.hits[0]) {
    const tsTaxonomyData: ITSTaxonomy = JSON.parse(JSON.stringify(results.hits[0].document));
    return tsTaxonomyData;
  }
  return found;
};

export const getTaxonomyItemsByParentSlug = async (
  taxonomySlug: string,
  parentSlug: string
): Promise<ITSTaxonomy[]> => {
  const searchParameters = {
    q: `${parentSlug}`,
    query_by: 'parentSlug',
    filter_by: `parentSlug:=[\`${parentSlug}\`] && type:=[${taxonomyUrlSlugToWpTaxonomySlug(
      taxonomySlug
    )}]`,
    facet_by: 'type',
  };

  const results = await getTaxonomyDocument().search(searchParameters);

  const found: ITSTaxonomy[] = [];
  if (typeof results.hits !== 'undefined') {
    results.hits?.forEach((doc) => {
      const tsTaxonomyData: ITSTaxonomy = JSON.parse(JSON.stringify(doc.document));
      found.push(tsTaxonomyData);
    });
  }
  return found;
};

export const getTaxonomyPopularProducts = async (
  taxonomySlug: string,
  termSlug: string
): Promise<ProductTypesenseResponse[]> => {
  const defaultCurrency = getDefaultCurrency();
  const searchParameters = {
    q: '*',
    query_by: 'slug',
    filter_by:
      'taxonomies.type:=[`' +
      taxonomyUrlSlugToWpTaxonomySlug(taxonomySlug) +
      '`] && taxonomies.slug:=[`' +
      termSlug +
      '`] && isFeatured:=[true]',
    facet_by: 'taxonomies.type,isFeatured,taxonomies.nameAndType,taxonomies.slug',
    per_page: 2,
    sort_by: `price.${defaultCurrency}:asc`,
    // include_fields: 'permalink, slug, name',
  };
  const results = await client
    .collections<ProductTypesenseResponse>(TS_CONFIG.collectionNames.product)
    .documents()
    .search(searchParameters);

  if (!results.hits) {
    return [];
  }

  return results.hits?.map((doc) => doc.document);
};

export const getDefaultTsQueryVars = () => {
  const queryDefaults = {
    page: 1,
    perPage: +siteSettings.shop.layout.productCount,
    sortBy: 'totalSales:desc',
  };

  return queryDefaults;
};

export const getDefaultSortBy = () => {
  const defaultSortValue = parseJsonValue(siteData.categoryPageDefaultSort);
  let defaultSortOption = 0;
  let splitSortValue;

  if (!isEmpty(defaultSortValue?.sort_option)) {
    splitSortValue = defaultSortValue?.sort_option?.split('_');
    if (splitSortValue[1]) {
      defaultSortOption = +splitSortValue[1];
    }
  }

  return sortOptions()[defaultSortOption];
};

const recompileTaxonomyFilterOptions = (
  facetData: SearchResponseFacetCountSchema<{}>[] | undefined
) => {
  const taxonomyFilterOptions = reduce(
    facetData?.[7]?.counts ?? [],
    (result: IFilterOptionData[], data) => {
      const filterArr = data.value.split('|');
      const label = Object.values(filterArr)[0];
      const type = Object.values(filterArr)[1];
      const slug = Object.values(filterArr)[2];
      const parent = Object.values(filterArr)[3];
      const termOrder = Object.values(filterArr)[4];
      const permalink = Object.values(filterArr)[5];
      const parentSlug = Object.values(filterArr)[6];
      const thumbnailSrc = Object.values(filterArr)[7];

      const itemData: IFilterOptionData = {
        count: data.count,
        value: data.value,
        label: label,
        type: type,
        slug: slug ?? '',
        parent: parent ?? '',
        order: +termOrder || 0,
        permalink: permalink ?? '',
        parentSlug: parentSlug ?? '',
        thumbnailSrc: thumbnailSrc ?? '',
      };

      if (type === 'product_cat') {
        result.push(itemData);
      }

      return result;
    },
    []
  );

  return taxonomyFilterOptions;
};
const getPriceFilterOptions = (facetData: SearchResponseFacetCountSchema<{}>[] | undefined) => {
  if (typeof facetData !== 'undefined' && typeof facetData[3] !== 'undefined') {
    const priceOptions: IFilterOptionData[] = [];
    const defaultCurrency = getDefaultCurrency();

    facetData[3].counts.map((item) => {
      const priceOption: IFilterOptionData = {
        label: priceFilterOptions[item.value].label,
        value: priceFilterOptions[item.value].value.replace(/{DEFAULT_CURRENCY}/g, defaultCurrency),
        count: item.count,
      };

      priceOptions.push(priceOption);
    });

    return {
      label: 'Price',
      items: priceOptions.reverse(),
    };
  }

  return {
    label: 'Price',
    items: [],
  };
};
const getOnSaleFilterOptions = (facetData: SearchResponseFacetCountSchema<{}>[] | undefined) => {
  if (typeof facetData !== 'undefined' && typeof facetData[5] !== 'undefined') {
    const saleOptions: IFilterOptionData[] = [];
    facetData[5].counts.map((item) => {
      const saleOption: IFilterOptionData = {
        count: item.count,
        label: 'Sale',
        value: item.value,
      };

      if (item.value === 'true') {
        saleOptions.push(saleOption);
      }
    });

    return {
      label: 'Sale',
      items: saleOptions,
    };
  }

  return {
    label: 'Sale',
    items: [],
  };
};
const getNewProductsFilterOptions = (
  facetData: SearchResponseFacetCountSchema<{}>[] | undefined
) => {
  const newProductsFilterOption = {
    label: 'New',
    items: [],
  };

  if (typeof facetData !== 'undefined' && typeof facetData[6] !== 'undefined') {
    let newProductsCount = 0;
    const newBadgeThreshold = siteSettings?.product?.productGallery?.newProductBadgeThreshold;

    facetData[6].counts.map((item) => {
      const isNewProduct = +item.value < +newBadgeThreshold;

      if (isNewProduct) {
        newProductsCount = newProductsCount + item.count;
      }
    });

    const newOptions: IFilterOptionData[] = [
      {
        count: newProductsCount,
        label: 'New',
        value: newBadgeThreshold,
      },
    ];

    if (newOptions[0].count !== 0) {
      return {
        label: 'New',
        items: newOptions,
      };
    }

    return newProductsFilterOption;
  }

  return newProductsFilterOption;
};
const getBrandsFilterOptions = (facetData: SearchResponseFacetCountSchema<{}>[] | undefined) => {
  const taxonomyFilterOptions = reduce(
    facetData?.[7]?.counts,
    (result: IFilterOptionData[], data) => {
      const filterArr = data.value.split('|');
      const label = Object.values(filterArr)[0];
      const type = Object.values(filterArr)[1];
      const slug = Object.values(filterArr)[2];
      const parent = Object.values(filterArr)[3];
      const termOrder = Object.values(filterArr)[4];
      const permalink = Object.values(filterArr)[5];
      const parentSlug = Object.values(filterArr)[6];
      const thumbnailSrc = Object.values(filterArr)[7];

      const itemData: IFilterOptionData = {
        count: data.count,
        value: data.value,
        label: label,
        type: type,
        slug,
        parent,
        order: +termOrder || 0,
        permalink,
        parentSlug,
        thumbnailSrc,
      };

      if (type === 'product_brand' || type === 'product_brands') {
        result.push(itemData);
      }

      return result;
    },
    []
  );

  return taxonomyFilterOptions;
};
const getAvailabilityFilterOptions = (
  facetData: SearchResponseFacetCountSchema<{}>[] | undefined
) => {
  if (typeof facetData !== 'undefined' && typeof facetData[5] !== 'undefined') {
    const availabilityOptions: IFilterOptionData[] = [];
    facetData[8].counts.map((item) => {
      const availabilityOption: IFilterOptionData = {
        count: item.count,
        label: 'In Stock',
        value: item.value,
      };

      if (item.value === 'instock') {
        availabilityOptions.push(availabilityOption);
      }
    });

    return {
      label: 'In Stock',
      items: availabilityOptions,
    };
  }

  return {
    label: 'In Stock',
    items: [],
  };
};
const getRefinedSelectionOptions = (
  facetData: SearchResponseFacetCountSchema<{}>[] | undefined
) => {
  const taxonomyFilterOptions = reduce(
    facetData?.[7]?.counts,
    (result: IFilterOptionData[], data) => {
      const filterArr = data.value.split('|');
      const label = Object.values(filterArr)[0];
      const type = Object.values(filterArr)[1];
      const slug = Object.values(filterArr)[2];
      const parent = Object.values(filterArr)[3];
      const termOrder = Object.values(filterArr)[4];
      const permalink = Object.values(filterArr)[5];
      const parentSlug = Object.values(filterArr)[6];
      const thumbnailSrc = Object.values(filterArr)[7];

      const itemData: IFilterOptionData = {
        count: data.count,
        value: data.value,
        label: label,
        type: type,
        slug: slug ?? '',
        parent: parent ?? '',
        order: +termOrder || 0,
        permalink: permalink ?? '',
        parentSlug: parentSlug ?? '',
        thumbnailSrc: thumbnailSrc ?? '',
      };

      if (type === 'product_cat' || type === 'product_brand') {
        result.push(itemData);
      }

      return result;
    },
    []
  );

  return taxonomyFilterOptions;
};

const getAttributeFilterOptions = (facetData: SearchResponseFacetCountSchema<{}>[] | undefined) => {
  const taxonomyFilterOptions = reduce(
    facetData?.[7]?.counts,
    (result: IFilterOptionData[], data) => {
      const filterArr = data.value.split('|');
      const dataValues = Object.values(filterArr);
      const label = dataValues[0] ?? '';
      const type = dataValues[1] ?? '';
      const slug = dataValues[2] ?? '';
      const parent = dataValues[3] ?? '';
      const termOrder = dataValues[4];
      const permalink = dataValues[5] ?? '';
      const parentSlug = dataValues[6] ?? '';
      const thumbnailSrc = dataValues[7] ?? '';
      const componentType = isEmpty(dataValues[8])
        ? ''
        : (dataValues[8] as IFilterOptionData['componentType']);
      const componentValue = dataValues[9] ?? '';

      const itemData: IFilterOptionData = {
        count: data.count,
        value: data.value,
        label,
        type,
        slug,
        parent,
        order: +termOrder || 0,
        permalink,
        parentSlug,
        thumbnailSrc,
        componentType,
        componentValue,
      };

      if (type.startsWith('pa_')) {
        result.push(itemData);
      }

      return result;
    },
    []
  );
  return taxonomyFilterOptions;
};

const initializeCurrencyObject = (currencies: string[]): { [key: string]: number } => {
  const currencyObject: { [key: string]: number } = {};

  currencies.forEach((currency) => {
    currencyObject[currency] = 0;
  });

  return currencyObject;
};

const filterFacetDataByCurrency = (
  data: SearchResponseFacetCountSchema<{}>[],
  currency: string
) => {
  return data.filter((item) => item.field_name === `price.${currency}`);
};

const getMulticurrencyPriceMinMaxValue = (
  facetData: SearchResponseFacetCountSchema<{}>[] | undefined
) => {
  const currencies = getAllCurrencies();

  const minValue = initializeCurrencyObject(currencies);
  const maxValue = { ...minValue };

  if (typeof facetData === 'undefined') {
    return { minValue, maxValue };
  }

  currencies.forEach((currency) => {
    const currencyData = filterFacetDataByCurrency(facetData, currency);

    if (currencyData.length > 0 && currencyData[0]) {
      const { min, max } = currencyData[0].stats;

      if (min) {
        minValue[currency] = min;
      }

      if (max) {
        maxValue[currency] = max;
      }
    }
  });

  return { minValue, maxValue };
};
const generateProductQueryResponse = async (
  queryVars: ITSTaxonomyProductQueryVars,
  results: SearchResponse<ProductTypesenseResponse>
): Promise<ITSProductQueryResponse> => {
  const taxonomyFilterOptions: IFilterOptionData[] = recompileTaxonomyFilterOptions(
    results.facet_counts
  );

  const priceFilter: ITSFilterOption = getPriceFilterOptions(results.facet_counts);

  const saleFilter: ITSFilterOption = getOnSaleFilterOptions(results.facet_counts);

  const newProductsFilter: ITSFilterOption = getNewProductsFilterOptions(results.facet_counts);

  const brandsFilter: IFilterOptionData[] = getBrandsFilterOptions(results.facet_counts);

  const availabilityFilter: ITSFilterOption = getAvailabilityFilterOptions(results.facet_counts);

  const refinedSelectionOptions: IFilterOptionData[] = getRefinedSelectionOptions(
    results.facet_counts
  );

  const attributeFilterOptions: IFilterOptionData[] = getAttributeFilterOptions(
    results.facet_counts
  );

  let found: ProductTypesenseResponse[] = [];
  if (typeof results.hits !== 'undefined' && results.hits) {
    found = await Promise.all(
      results.hits.map(async (doc) => {
        let product = doc.document;
        if ('variable' == product.productType && product.id) {
          const variations = await getVariations(parseInt(product.id));

          product = {
            ...product,
            variations,
          };
        }
        return product as ProductTypesenseResponse;
      })
    );
  }

  const totalPages = Math.ceil(results.found / (queryVars?.perPage as number));
  const hasMore = (queryVars.page as number) < totalPages;
  const nextPage = hasMore ? (queryVars?.page as number) + 1 : 0;

  const priceRangeAmount = getMulticurrencyPriceMinMaxValue(results.facet_counts);

  const previousPage = nextPage - 2;
  return {
    products: found,
    queryVars,
    pageInfo: {
      totalFound: results.found,
      totalPages,
      nextPage,
      previousPage: previousPage,
      page: queryVars.page as number,
      perPage: queryVars.perPage as number,
      hasNextPage: nextPage > 0 ? true : false,
      hasPreviousPage: previousPage <= 0 ? false : true,
    },
    taxonomyFilterOptions,
    priceFilter,
    saleFilter,
    newProductsFilter,
    brandsFilter,
    availabilityFilter,
    refinedSelectionOptions,
    priceRangeAmount,
    attributeFilterOptions,
  };
};
const getProductDocument = () => {
  return client.collections(TS_CONFIG.collectionNames.product).documents();
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTaxonomyDocument = <DocumentType extends Record<string, any>>() => {
  return client.collections<DocumentType>(TS_CONFIG.collectionNames.taxonomy).documents();
};

export const getProducts = async (
  queryVars: ITSTaxonomyProductQueryVars
): Promise<ITSProductQueryResponse> => {
  const searchParameters = generateSearchParams(queryVars);

  const results = await getProductDocument().search(searchParameters);
  return await generateProductQueryResponse(queryVars, results);
};

export const getSubTaxonomies = async (parentSlug: string): Promise<SubCategory[]> => {
  const searchParameters = {
    collection: TS_CONFIG.collectionNames.taxonomy,
    q: '*',
    query_by: 'name',
    facet_by: 'parentSlug',
    filter_by: `parentSlug:=[${parentSlug}]`,
    per_page: 250,
    page: 1,
    max_facet_values: 200,
    sort_by: 'order:asc', // Default sortby totalSales desc,
    include_fields: 'name,thumbnail,permalink,productCount',
  };

  const results = await getTaxonomyDocument<SubCategory>().search(searchParameters);
  const subCategories: SubCategory[] = [];

  results.hits?.forEach((doc) => {
    // doc.document
    const parse = SubCategorySchema.safeParse(doc.document);
    if (parse.success && parse.data.productCount && parse.data.productCount > 0) {
      subCategories.push(parse.data);
    }
  });

  return subCategories;
};

export const buildStaticPathParams = async (page: number) => {
  // Generate an array like below
  // [
  // 	{
  // 		params: {
  // 			taxonomyFrontendSlug:'',
  // 			taxonomyItemSlug: stripTrailingSlash(itemSlug)
  // 		}
  // 	}
  // ]
  const pathsData: TaxonomyPaths[] = [];

  const searchParameters = {
    q: '*',
    query_by: 'name',
    filter_by: 'type:=[`product_cat`,`product_tag`,`product-type`,`shop-by`,`product-brand`]',
    page: page,
    per_page: 250,
    include_fields: 'permalink',
  };

  const results = await client
    .collections(TS_CONFIG.collectionNames.taxonomy)
    .documents()
    .search(searchParameters);

  if (typeof results.hits !== 'undefined' && results.hits) {
    const index = 'permalink';
    results.hits.map((doc: SearchResponseHit<{ [key: string]: any }>) => {
      const permalink = doc.document.permalink;
      //exclude link if it has ?product_type= on it
      if (!permalink.includes('?product_type=')) {
        let productEndpoint = doc.document['permalink'];
        productEndpoint = productEndpoint.replace(/^\/|\/$/g, '');
        const taxSlug = productEndpoint.split('/');
        if (taxSlug[0] && taxSlug[1] && !taxSlug[2]) {
          pathsData.push({
            params: {
              taxonomyFrontendSlug: taxSlug[0],
              taxonomyItemSlug: [taxSlug[1]],
            },
          });
        }
        if (taxSlug[0] && taxSlug[1] && taxSlug[2]) {
          pathsData.push({
            params: {
              taxonomyFrontendSlug: taxSlug[0],
              taxonomyItemSlug: [taxSlug[1], taxSlug[2]],
            },
          });
        }
      }
    });
  }

  return pathsData;
};
const buildShopProductStaticPathParams = async (products: ProductTypesenseResponse[]) => {
  const pathsData: ProductPaths[] = [];

  if (typeof products !== 'undefined' && products) {
    products.map((product) => {
      const permalink = product?.permalink;
      //exclude link if it has ?product_type= on it
      if (!permalink?.includes('?product_type=') && permalink && typeof permalink !== 'undefined') {
        const productEndpoint = permalink?.replace(/^\/|\/$/g, '');
        const taxSlug = productEndpoint?.split('/');
        const slugArray: string[] = [];

        taxSlug?.forEach((slug) => {
          if (slug !== 'shop' && slug !== 'product') {
            slugArray.push(slug);
          }
        });

        pathsData.push({
          params: {
            productSlug: slugArray,
          },
        });
      }
    });
  }

  return pathsData;
};
const getTaxonomiesPageData = async (page: number, category: string) => {
  const restructureTaxonomies: TaxonomyPageParams[] = [];

  const searchParameters = {
    q: '*',
    query_by: 'name',
    filter_by: 'type:=[`product_cat`,`product_tag`,`product-type`,`shop-by`,`product_brand`]',
    page: page,
    per_page: 250,
    sort_by: 'name:asc',
    include_fields: 'permalink, thumbnail, name, type',
  };

  const results = await client
    .collections(TS_CONFIG.collectionNames.taxonomy)
    .documents()
    .search(searchParameters);

  const taxonomySlug = taxonomyUrlSlugToWpTaxonomySlug(category);

  if (typeof results.hits !== 'undefined' && results.hits) {
    (results.hits as SearchResponseHit<{ [key: string]: string & ITSImage }>[]).map((doc) => {
      const permalink = doc.document['permalink'];
      const thumbnail = doc.document['thumbnail'];
      const name = doc.document['name'];
      const type = doc.document['type'];
      //exclude link if it has ?product_type= on it
      if (!permalink.includes('?product_type=')) {
        if (type === taxonomySlug && name) {
          restructureTaxonomies.push({
            name,
            permalink,
            thumbnail,
          });
        }
      }
    });
  }

  return restructureTaxonomies;
};
const TSTaxonomy = {
  getPageData: getPageData,
  sortOptions,
  getDefaultTsQueryVars,
  generateSearchParams,
  generateProductQueryResponse,
  getProductDocument,
  taxonomyUrlSlugToWpTaxonomySlug,
  buildStaticPathParams,
  getTaxonomiesPageData,
  buildShopProductStaticPathParams,
};
export default TSTaxonomy;
