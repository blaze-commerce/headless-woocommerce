import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useProductContext } from '@src/context/product-context';

export const useFetchReviews = (
  sku: string | number | null,
  page = 1,
  rating: number | undefined | null
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const isDevEnv = process.env.VERCEL_ENV != 'production';
    axios
      .get(`/api/reviews?sku=${sku}&page=${page}&rating=${rating}`, isDevEnv ? {} : { signal })
      .then((res) => {
        setData(res.data);
      })
      .catch(setError)
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [sku, page, rating]);

  return { data, error, loading };
};

export const useReviewsCount = () => {
  const { product, customer } = useProductContext();
  const { asPath } = useRouter();

  const totalItems =
    product?.judgemeReviews?.count ??
    (customer?.stats?.total_review as number) ??
    product?.metaData?.wooProductReviews?.stats?.count_reviews ??
    0;
  const [reviewsCount, setSetReviewsCount] = useState(totalItems);

  useEffect(() => {
    setSetReviewsCount(totalItems);
  }, [asPath]);

  return reviewsCount;
};
