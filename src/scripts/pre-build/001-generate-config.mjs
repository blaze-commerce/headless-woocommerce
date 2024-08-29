/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

import chalk from 'chalk';
import _ from 'lodash';
import { Client as TypesenseClient } from 'typesense';

const configNames = [
  'site_logo',
  'stock_display_format',
  'currencies',
  'homepage_layout',
  'homepage_slug',
  'site_message_top_header',
  'site_message',
  'footer_content_before',
  'footer_content_1',
  'footer_content_2',
  'footer_content_3',
  'footer_content_4',
  'footer_content_5',
  'footer_content_after',
  'woocommerce_calc_taxes',
  'woocommerce_prices_include_tax',
  'free_shipping_threshold',
  'description_after_content',
  'woographql_is_composite_enabled',
  'woocommerce_is_afterpay_enabled',
  'show_free_shipping_banner',
  'show_free_shipping_minicart_component',
  'is_multicurrency',
  'ec_supreme_all_header_logo',
  'ec_supreme_all_footer_text',
  'regions',
  'show_variant_as_separate_product_cards',
  'judgeme_settings',
  'woocommerce_tax_setup',
  'business_reviews_bundle_settings',
  'reviews_plugin',
  'category_page_default_sort',
  'font_family',
  'site_icon_url'
];

const loadFile = (file) => {
  return JSON.parse(fs.readFileSync(file));
};

const logError = (message) => {
  console.log(chalk.red(message));
};

const logSuccess = (message) => {
  console.log(chalk.green(message));
};

const maybeConvertToBool = (str) => {
  switch (str) {
    case 'yes':
    case 'true':
      return true;
    case 'no':
    case 'false':
    case undefined:
      return false;
    default:
      return str;
  }
};

export const isJsonString = (str) => {
  if (_.isBoolean(str) || _.isNull(str)) {
    return false;
  }
  try {
    const parsed = JSON.parse(str);
    if (Number.isInteger(parsed)) return false;
  } catch (e) {
    return false;
  }
  return true;
};

const transformedData = (data) => {
  return data?.reduce((previousValue, currentValue) => {
    const arr = currentValue.meta_key.split('.');
    const chainedProperty = _.chain(arr).map(_.camelCase).value().join('.');
    let value = currentValue.meta_value;
    if (isJsonString(value)) {
      value = transformJson(JSON.parse(value));
    }

    value = maybeConvertToBool(value);

    _.set(previousValue, chainedProperty, value);

    return previousValue;
  }, {});
};

const transformJson = (obj) => {
  return _.mapKeys(
    _.mapValues(obj, (value) => {
      if (value !== null && isJsonString(value)) {
        return transformJson(JSON.parse(value));
      }

      if (value !== null && typeof value === 'object') {
        return transformJson(value);
      }

      return maybeConvertToBool(value);
    }),
    (v, k) => _.camelCase(k)
  );
};

const parseJSON = (value, fallback = '') => {
  if (typeof value === 'string' && value === '""') {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

const normalizeJsonArray = (obj) => {
  return obj.reduce((resultArrays, currentObject) => {
    currentObject = _.mapValues(currentObject, (value) => {
      if (isJsonString(value)) {
        return JSON.parse(value);
      }

      return value;
    });
    resultArrays.push(_.mapKeys(currentObject, (v, k) => _.camelCase(k)));
    return resultArrays;
  }, []);
};

const getDefaultSettings = () => {
  return loadFile(path.resolve(process.cwd(), 'config', 'default-settings.json'));

};

const generateMenuJSON = async (params) => {
  const { NEXT_PUBLIC_STORE_ID, NEXT_PUBLIC_TYPESENSE_HOST, NEXT_PUBLIC_TYPESENSE_PUBLIC_KEY } = params.env;
  let menuArray = [];
  const fullFilePath = path.join(process.cwd(), 'public', 'menu.json');

  if (!NEXT_PUBLIC_TYPESENSE_PUBLIC_KEY) {
    logError(
      'Missing typesense_api_key. Please make sure you have connected your woocommerce site to the wooless portal.'
    );
    await fs.promises.writeFile(fullFilePath, JSON.stringify(menuArray));
    return {};
  }

  const TYPESENSE_CLIENT_CONFIG = {
    apiKey: NEXT_PUBLIC_TYPESENSE_PUBLIC_KEY, // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: NEXT_PUBLIC_TYPESENSE_HOST,
        path: '', // Optional. Example: If you have your typesense mounted in localhost:8108/typesense, path should be equal to '/typesense'
        port: 443,
        protocol: 'https',
      },
    ],
  };

  const client = new TypesenseClient({
    ...TYPESENSE_CLIENT_CONFIG,
    connectionTimeoutSeconds: 5,
  });

  try {
    console.log('Creating Menu JSON file');

    const menus = await client
      .collections(`menu-${NEXT_PUBLIC_STORE_ID}`)
      .documents()
      .search({ q: '*' });
    const transformedMenu = menus.hits.map((hit) => hit.document);
    menuArray = normalizeJsonArray(transformedMenu);

    await deleteFile(fullFilePath);
    logSuccess(`Menu JSON file created at ${fullFilePath}`);
  } catch (error) {
    console.log('Error on writing menu JSON file file');
    console.log(error);
  }
  await fs.promises.writeFile(fullFilePath, JSON.stringify(menuArray));
  return { client };
};

const deleteFile = async (fullFilePath) => {
  if (fs.existsSync(fullFilePath)) {
    await fs.promises.unlink(fullFilePath);
  }
};


const getTypesenseConfigs = async (client, storeId) => {
  const siteInfos = await client
    .collections(`site_info-${storeId}`)
    .documents()
    .search({
      q: '*',
      query_by: 'name',
      filter_by: `name:${JSON.stringify(configNames)}`,
      per_page: 250,
    });
  const siteInfosHits = siteInfos.hits.map((hit) => hit.document);
  return _.keyBy(siteInfosHits, (o) => _.camelCase(o.name));
};

export default async function execute(params) {
  const { NEXT_PUBLIC_STORE_ID, NEXT_PUBLIC_COOKIE_DOMAIN, VERCEL_ENV, VERCEL_URL } = params.env;

  let settingsWithDefaults = await getDefaultSettings();
  const { client } = await generateMenuJSON(params, settingsWithDefaults);

  const typesenseConfigs = await getTypesenseConfigs(client, NEXT_PUBLIC_STORE_ID);

  try {

    settingsWithDefaults.header.logo.desktop.wpSrc = typesenseConfigs?.siteLogo?.value;

    settingsWithDefaults.header.logo.mobile.wpSrc = typesenseConfigs?.siteLogo?.value;
    settingsWithDefaults.homepageSlug = typesenseConfigs?.homepageSlug?.value;
    settingsWithDefaults.categoryPageDefaultSort = typesenseConfigs?.categoryPageDefaultSort?.value;
    settingsWithDefaults.store.favicon = typesenseConfigs?.siteIconUrl?.value;
    settingsWithDefaults.store.fontFamily = typesenseConfigs?.fontFamily?.value || 'Poppins';

    settingsWithDefaults.product.descriptionAfterContent =
      typesenseConfigs?.descriptionAfterContent?.value;
    settingsWithDefaults.product.freeShippingThreshold = parseJSON(
      typesenseConfigs?.freeShippingThreshold?.value,
      {}
    );
    settingsWithDefaults.store.woocommerceCalcTaxes = maybeConvertToBool(
      typesenseConfigs?.woocommerceCalcTaxes?.value
    );
    settingsWithDefaults.store.woocommercePricesIncludeTax = maybeConvertToBool(
      typesenseConfigs?.woocommercePricesIncludeTax?.value
    );
    settingsWithDefaults.store.freeShippingThreshold = parseJSON(
      typesenseConfigs?.freeShippingThreshold?.value,
      {}
    );

    settingsWithDefaults.showFreeShippingBanner = maybeConvertToBool(
      typesenseConfigs?.showFreeShippingBanner?.value
    );

    settingsWithDefaults.showFreeShippingMinicartComponent = maybeConvertToBool(
      typesenseConfigs?.showFreeShippingMinicartComponent?.value
    );

    settingsWithDefaults.showVariantAsSeparateProductCards = maybeConvertToBool(
      typesenseConfigs?.showVariantAsSeparateProductCards?.value
    );

    settingsWithDefaults.store.isCompositeEnabled = maybeConvertToBool(
      typesenseConfigs?.woographqlIsCompositeEnabled?.value
    );

    settingsWithDefaults.store.isAfterpayEnabled = maybeConvertToBool(
      typesenseConfigs?.woocommerceIsAfterpayEnabled?.value
    );

    settingsWithDefaults.store.giftCardHeaderImage =
      typesenseConfigs?.ecSupremeAllHeaderLogo?.value;

    settingsWithDefaults.store.giftCardFooterText = typesenseConfigs?.ecSupremeAllFooterText?.value;

    settingsWithDefaults.store.isMulticurrency = maybeConvertToBool(
      typesenseConfigs?.isMulticurrency?.value
    );

    settingsWithDefaults.siteMessage = parseJSON(typesenseConfigs?.siteMessage?.value, []);
    settingsWithDefaults.regions = parseJSON(typesenseConfigs?.regions?.value, {});
    settingsWithDefaults.homepageLayout = parseJSON(typesenseConfigs?.homepageLayout?.value, []);
    settingsWithDefaults.siteMessageTopHeader = parseJSON(
      typesenseConfigs?.siteMessageTopHeader?.value,
      []
    );
    settingsWithDefaults.footerContentBefore = parseJSON(
      typesenseConfigs?.footerContentBefore?.value,
      []
    );
    settingsWithDefaults.footerContent1 = parseJSON(typesenseConfigs?.footerContent1?.value, []);
    settingsWithDefaults.footerContent2 = parseJSON(typesenseConfigs?.footerContent2?.value, []);
    settingsWithDefaults.footerContent3 = parseJSON(typesenseConfigs?.footerContent3?.value, []);
    settingsWithDefaults.footerContent4 = parseJSON(typesenseConfigs?.footerContent4?.value, []);
    settingsWithDefaults.footerContent5 = parseJSON(typesenseConfigs?.footerContent5?.value, []);
    settingsWithDefaults.footerContentAfter = parseJSON(
      typesenseConfigs?.footerContentAfter?.value,
      []
    );

    settingsWithDefaults.store.reviewsPlugin = typesenseConfigs?.reviewsPlugin?.value ?? '';
    settingsWithDefaults.store.review = {};
    settingsWithDefaults.store.review.judgemeSettings = parseJSON(
      typesenseConfigs?.judgemeSettings?.value,
      {}
    );

    settingsWithDefaults.store.review.businessReviewsBundleSettings = parseJSON(
      typesenseConfigs?.businessReviewsBundleSettings?.value,
      {
        collection: '',
      }
    );

    settingsWithDefaults.store.woocommerceTaxSetup = parseJSON(
      typesenseConfigs?.woocommerceTaxSetup?.value,
      {
        displayPricesIncludingTax: 'incl',
        priceDisplaySuffix: '',
      }
    );

    if (VERCEL_ENV === 'preview') {
      settingsWithDefaults.cookieDomain = VERCEL_URL;
    } else {
      settingsWithDefaults.cookieDomain = NEXT_PUBLIC_COOKIE_DOMAIN;
    }
  } catch (error) {
    console.log(error);
  }

  const omitValues = [
    'store.typesensePrivateKey',
    'store.woocommerceConsumerKey',
    'store.woocommerceConsumerSecret',
    'store.reviewServiceApiKey',
    'store.reviewServiceSecretKey',
    'store.klaviyoPublicKey',
  ];

  const fullFilePath = path.join(process.cwd(), 'public', 'site.json');
  console.log('Creating Site config file');
  settingsWithDefaults = _.omit(settingsWithDefaults, omitValues);
  console.log({ settingsWithDefaults });
  try {
    await deleteFile(fullFilePath);
    await fs.promises.writeFile(fullFilePath, JSON.stringify(settingsWithDefaults));
    logSuccess(`Site config JSON file created at ${fullFilePath}`);
  } catch (error) {
    console.log('Error on writing Site config JSON file');
    console.log(error);
  }

  const regionalDataPath = path.join(process.cwd(), 'public', 'region.json');
  console.log('Creating Regional Data file');
  try {
    await deleteFile(regionalDataPath);
    await fs.promises.writeFile(regionalDataPath, typesenseConfigs?.currencies?.value || '');
    logSuccess(`Regional Data JSON file created at ${regionalDataPath}`);
    console.log(typesenseConfigs?.currencies?.value);
  } catch (error) {
    console.log('Error on writing Regional data JSON file');
    console.log(error);
  }
  // menuArray = normalizeJsonArray(transformedSiteInfo);
}
