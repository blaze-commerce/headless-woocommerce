import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { env } from '@src/lib/env';
import { GRAVITY_FORM_HEADER } from '@src/lib/wc-api';
import { FormResponseSchema, FormResponseType } from '@src/types/gravityForm';
const { NEXT_PUBLIC_WORDPRESS_SITE_URL } = env();

// Zod Schema for Newsletter
export const NewsLetterSchema = z.object({
  emailId: z.union([z.string(), z.number()]),
  formId: z.union([z.string(), z.number()]),
  email: z.string().email(),
});

export type NewsLetterProps = z.infer<typeof NewsLetterSchema>;

export type NewsLetterApiResponse = FormResponseType | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsLetterApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ is_valid: false, message: 'Method Not Allowed' });
  }

  const { formId, emailId, email, ...rest } = req.body;

  const modifiedRequestData = {
    ...rest,
    [`input_${emailId}`]: email,
  };

  const url = `${NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/gf/v2/forms/${formId}/submissions`;

  const config: AxiosRequestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url,
    headers: {
      ...GRAVITY_FORM_HEADER,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(modifiedRequestData),
  };

  try {
    const data = await axios.request(config);
    const response = FormResponseSchema.safeParse(data);
    if (response.success) {
      return res.status(200).json(response.data);
    }

    return res.status(200).json(data.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const { status, data } = axiosError.response;
        const errorResponse = FormResponseSchema.safeParse(data);

        if (errorResponse.success && !errorResponse.data.is_valid) {
          return res.status(200).json(errorResponse.data);
        }

        return res.status(status).json({
          is_valid: false,
          message: JSON.stringify(data),
        });
      } else if (axiosError.request) {
        return res.status(500).json({ is_valid: false, message: 'No response received' });
      } else {
        return res.status(500).json({ is_valid: false, message: 'Error setting up the request' });
      }
    } else {
      return res.status(500).json({ is_valid: false, message: 'Internal Server Error' });
    }
  }
}
