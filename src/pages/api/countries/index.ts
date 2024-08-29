// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import type { NextApiRequest, NextApiResponse } from 'next';

import { env } from '@src/lib/env';
const { WC_CONSUMER_KEY, WC_CONSUMER_SECRET, NEXT_PUBLIC_WORDPRESS_SITE_URL } = env();

type Country = {
  code: string;
  name: string;
};

type Data = Country[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const WooCommerce = new WooCommerceRestApi({
    url: NEXT_PUBLIC_WORDPRESS_SITE_URL as string,
    consumerKey: WC_CONSUMER_KEY as string,
    consumerSecret: WC_CONSUMER_SECRET as string,
    version: 'wc/v3',
    queryStringAuth: true,
  });

  let output = [];

  const allowedCountriesResponse = await WooCommerce.get(
    'settings/general/woocommerce_allowed_countries'
  );

  const specificCountriesResponse = await WooCommerce.get(
    'settings/general/woocommerce_specific_allowed_countries'
  );
  const countries = specificCountriesResponse.data.options;

  if (allowedCountriesResponse.data.value === 'specific') {
    const allowedCountries = specificCountriesResponse.data.value;
    output = allowedCountries.map((code: string) => ({ code, name: countries[code] }));
  } else {
    output = Object.keys(countries).map((code: string) => ({ code, name: countries[code] }));
  }

  return res.status(200).json(output);
}
