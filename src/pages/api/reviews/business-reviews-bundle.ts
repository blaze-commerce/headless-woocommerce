import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '@src/lib/env';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { NEXT_PUBLIC_WORDPRESS_SITE_URL } = env();

    const response = await axios.get(
      `${NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/blaze-wooless/v1/brb`
    );

    return res.status(200).json({ data: response.data });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(500).json({ error: error?.message });
  }
}
