import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';

import {
  ProductNotifierApiResponse,
  ProductNotifierProps,
} from '@src/pages/api/instocknotifier/subscribe';

interface UseProductNotifierResult {
  data: ProductNotifierApiResponse | null;
  error: ProductNotifierApiResponse | null;
  loading: boolean;
  subscribeProductNotification: (_requestData: ProductNotifierProps) => Promise<void>;
}

export const useProductNotifier = (): UseProductNotifierResult => {
  const [data, setData] = useState<ProductNotifierApiResponse | null>(null);
  const [error, setError] = useState<ProductNotifierApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const subscribeProductNotification = async (requestData: ProductNotifierProps): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/api/instocknotifier/subscribe/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(requestData),
    };

    try {
      setLoading(true);
      const response: AxiosResponse<ProductNotifierApiResponse> = await axios.request(config);
      setData(response.data);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      let message = 'Internal Server Error';
      if (axios.isAxiosError(err)) {
        // AxiosError: An error from the request made with Axios
        if (err.response) {
          if (err.response.data.message) {
            message = err.response.data.message;
          }
        }
      }

      setError({ message: message });
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, subscribeProductNotification };
};
