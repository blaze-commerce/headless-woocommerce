import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';

import { NewsLetterApiResponse, NewsLetterProps } from '@src/pages/api/newsletter';
import { FormResponseSchema } from '@src/types/gravityForm';

interface useNewsLetterResult {
  data: NewsLetterApiResponse;
  error: NewsLetterApiResponse;
  loading: boolean;
  subscribe: (requestData: NewsLetterProps) => Promise<void>;
}

export const useNewsLetter = (): useNewsLetterResult => {
  const [data, setData] = useState<NewsLetterApiResponse>(null);
  const [error, setError] = useState<NewsLetterApiResponse>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const subscribe = async (requestData: NewsLetterProps): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/api/newsletter/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(requestData),
    };

    try {
      setLoading(true);
      const { data: responseData } = await axios.request(config);
      const response = FormResponseSchema.safeParse(responseData);

      if (response.success) {
        setData(response.data);
        setError(response.data.is_valid ? null : response.data);
      }
    } catch (err: unknown) {
      let message = 'Internal Server Error';
      if (axios.isAxiosError(err)) {
        // AxiosError: An error from the request made with Axios
        if (err.response) {
          if (err.response.data.message) {
            message = err.response.data.message;
          }
        }
      }

      setError({ is_valid: false, message });
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, subscribe };
};
