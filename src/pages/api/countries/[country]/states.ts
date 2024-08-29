// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import type { NextApiRequest, NextApiResponse } from 'next';

import { env } from '@src/lib/env';
const { WC_CONSUMER_KEY, WC_CONSUMER_SECRET, NEXT_PUBLIC_WORDPRESS_SITE_URL } = env();

type State = {
  code: string;
  name: string;
};

type Data = State[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const WooCommerce = new WooCommerceRestApi({
    url: NEXT_PUBLIC_WORDPRESS_SITE_URL as string,
    consumerKey: WC_CONSUMER_KEY as string,
    consumerSecret: WC_CONSUMER_SECRET as string,
    version: 'wc/v3',
    queryStringAuth: true,
  });

  const { country } = req.query;
  const statesResponse = await WooCommerce.get(`data/countries/${country}`);
  return res.status(200).json(statesResponse.data.states);
}
