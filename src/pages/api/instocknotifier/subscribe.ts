// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosRequestConfig } from 'axios';
import { isEmpty } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

import { env } from '@src/lib/env';
import { AUTHORIZATION_HEADER } from '@src/lib/wc-api';
const { NEXT_PUBLIC_WORDPRESS_SITE_URL } = env();

export interface ProductNotifierApiResponse {
  // Define the structure of your API response data
  // For example:
  message: string;
}

export interface ProductNotifierProps {
  // Define the structure of your request data
  // For example:
  subscriber_name: string;
  email: string;
  product_id: string;
  status: string;
}

type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    const modifiedRequestData = {
      ...req.body,
      subscriber_phone: '+1 0000000000',
      custom_quantity: 1,
    };

    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wc-instocknotifier/v3/create_subscriber`,
      headers: {
        ...AUTHORIZATION_HEADER,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(modifiedRequestData),
    };

    try {
      const response = await axios.request(config);
      if (!isEmpty(response.data.subscribed_date)) {
        return res.status(200).json({
          message: 'You will be notified when product is back in stock',
        });
      }

      return res.status(200).json({
        message: '123',
      });
    } catch (error) {
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
            message: data?.message || 'Internal Server Error',
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
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  // Handle other HTTP methods
  return res.status(405).json({ message: 'Method Not Allowed' });
}
