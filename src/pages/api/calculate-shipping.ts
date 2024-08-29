// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { env } from '@src/lib/env';
const { NEXT_PUBLIC_WORDPRESS_SITE_URL } = env();

type State = {
  code: string;
  name: string;
};

type Data = State[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = req.body;
  const statesResponse = await axios.post(
    `${NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wooless-wc/v1/available-shipping-methods`,
    data
  );
  return res.status(200).json(statesResponse.data);
}
