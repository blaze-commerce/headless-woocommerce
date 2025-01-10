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
  'homepage_slug',
  'shop_page_slug',
  'blog_page_slug',
  'woocommerce_permalinks',
  'site_message',
  'woocommerce_calc_taxes',
  'woocommerce_prices_include_tax',
  'woocommerce_tax_setup',
  'free_shipping_threshold',
  'description_after_content',
  'woographql_is_composite_enabled',
  'woocommerce_is_afterpay_enabled',
  'show_free_shipping_banner',
  'show_free_shipping_minicart_component',
  'is_multicurrency',
  'gift_card_header_logo',
  'gift_card_header_text',
  'gift_card_footer_text',
  'regions',
  'show_variant_as_separate_product_cards',
  'judgeme_settings',
  'woocommerce_tax_setup',
  'business_reviews_bundle_settings',
  'reviews_plugin',
  'category_page_default_sort',
  'site_icon_url',
  'is_bundle_product_enabled',
  'show_share_to_pinterest_button',
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
  const { NEXT_PUBLIC_STORE_ID, NEXT_PUBLIC_TYPESENSE_HOST, NEXT_PUBLIC_TYPESENSE_PUBLIC_KEY } =
    params.env;
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

  console.log('typesenseConfigs', typesenseConfigs);
  try {
    settingsWithDefaults.header.logo.desktop.wpSrc = typesenseConfigs?.siteLogo?.value;

    settingsWithDefaults.header.logo.mobile.wpSrc = typesenseConfigs?.siteLogo?.value;
    settingsWithDefaults.homepageSlug = typesenseConfigs?.homepageSlug?.value;
    settingsWithDefaults.showShareToPinterestButton = maybeConvertToBool(
      typesenseConfigs?.showShareToPinterestButton?.value
    );
    settingsWithDefaults.shopPageSlug = typesenseConfigs?.shopPageSlug?.value;
    settingsWithDefaults.blogPageSlug = typesenseConfigs?.blogPageSlug?.value;
    settingsWithDefaults.isBundleProductEnabled = maybeConvertToBool(
      typesenseConfigs?.isBundleProductEnabled?.value
    );
    settingsWithDefaults.categoryPageDefaultSort = typesenseConfigs?.categoryPageDefaultSort?.value;
    const favIcon = typesenseConfigs?.siteIconUrl?.value;
    if (!_.isEmpty(favIcon)) {
      settingsWithDefaults.store.favicon = typesenseConfigs?.siteIconUrl?.value;
    }
    settingsWithDefaults.store.fontFamily = typesenseConfigs?.fontFamily?.value || 'Poppins';

    settingsWithDefaults.product.descriptionAfterContent =
      typesenseConfigs?.descriptionAfterContent?.value;
    settingsWithDefaults.product.freeShippingThreshold = parseJSON(
      typesenseConfigs?.freeShippingThreshold?.value,
      {}
    );

    settingsWithDefaults.woocommercePermalinks = parseJSON(
      typesenseConfigs?.woocommercePermalinks?.value,
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

    settingsWithDefaults.store.giftCardHeaderImage = typesenseConfigs?.giftCardHeaderLogo?.value;

    settingsWithDefaults.store.giftCardHeaderText = typesenseConfigs?.giftCardHeaderText?.value;

    settingsWithDefaults.store.giftCardFooterText = typesenseConfigs?.giftCardFooterText?.value;

    settingsWithDefaults.store.isMulticurrency = maybeConvertToBool(
      typesenseConfigs?.isMulticurrency?.value
    );

    settingsWithDefaults.siteMessage = parseJSON(typesenseConfigs?.siteMessage?.value, []);
    settingsWithDefaults.regions = parseJSON(typesenseConfigs?.regions?.value, {});
    settingsWithDefaults.siteMessageTopHeader = parseJSON(
      typesenseConfigs?.siteMessageTopHeader?.value,
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
