// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { env } from '@src/lib/env';
const { NEXT_PUBLIC_WORDPRESS_SITE_URL } = env();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { product_id } = req.query;

      if (!product_id) throw new Error('Product ID is required');

      const config: AxiosRequestConfig = {
        method: 'GET',
        url: `${NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wooless-wc/v1/check-bundle-data?product_id=${product_id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);

      return res.setHeader('Cache-Control', 's-maxage=86400').status(200).json({
        data: response.data,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // AxiosError: An error from the request made with Axios
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const status: number = error.response.status;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any = error.response.data;

          if (
            error.response.data.message &&
            error.response.data.message == 'Seems like that email id has been already subscribed'
          ) {
            return res.status(status).json({
              message: 'The email you entered is already subscribed',
            });
          }
          return res.status(status).json({
            message: data,
          });
        } else if (error.request) {
          // The request was made but no response was received
          return res.status(500).json({ message: 'No response received' });
        } else {
          // Something happened in setting up the request that triggered an Error
          return res.status(500).json({ message: 'Error setting up the request' });
        }
      } else {
        // Non-Axios error
        return res.status(500).json({ message: 'An error occured' });
      }
    }
  }

  // Handle other HTTP methods
  return res.status(405).json({ message: 'Method Not Allowed' });
}
