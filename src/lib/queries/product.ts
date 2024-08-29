import axios from 'axios';
import { kebabCase } from 'lodash';
import siteData from '@public/site.json';

import { env } from '@src/lib/env';
import {
  JUDGE_ME_ENDPOINT,
  REVIEWS_IO_ENDPOINT,
  YOTPO_CDN_ENDPOINT,
} from '@src/lib/constants/endpoints';
import { computeTotalPercentage, removeHttp } from '@src/lib/helpers/helper';
import { ReviewFormProps } from '@src/lib/types/reviews';
import { JudgeMeSettings } from '@src/models/product/reviews';

export const PRODUCT_FRAGMENTS = `
id
productId: databaseId
description,
averageRating
slug
link
image {
	id
	uri
	title
	srcSet
	sourceUrl
	altText
}
... on SimpleProduct {
	price(format: RAW)
	regularPrice(format: RAW)
	sku
	name
	onSale
	stockQuantity
	stockStatus
}
`;

export const PRODUCT_SEO_FRAGMENTS = `
... on SimpleProduct {
	seo {
		fullHead
	}
}
`;

export const getReviewsEndpoint = (sku: string | number, page: number, rating?: number | null) => {
  const {
    NEXT_PUBLIC_REVIEW_SERVICE,
    REVIEW_SERVICE_KEY,
    NEXT_PUBLIC_LIVE_URL,
    JUDGEME_SHOP_DOMAIN,
  } = env();

  const apiKey = REVIEW_SERVICE_KEY;
  const baseUrl = removeHttp(NEXT_PUBLIC_LIVE_URL);
  const productId = sku as number;

  switch (NEXT_PUBLIC_REVIEW_SERVICE) {
    case 'reviews.io':
      return `${REVIEWS_IO_ENDPOINT}/product/review?store=${kebabCase(
        baseUrl
      )}&sort=date_desc&lang=en&enable_avatars=true&include_subrating_breakdown=1&per_page=5&apikey=${apiKey}&sku=${sku}&page=${page}`;
    case 'judge.me': {
      const shopDomain = JUDGEME_SHOP_DOMAIN ?? baseUrl;
      const params: { [key: string]: string | number } = {
        api_token: String(apiKey),
        shop_domain: String(shopDomain),
        page: page,
        per_page: 5,
      };

      if ((siteData?.store?.review?.judgemeSettings as JudgeMeSettings)?.single_review !== '1') {
        params['product_id'] = productId;
      }

      if ((rating as number) > 0 && rating !== null && typeof rating === 'number') {
        params['rating'] = rating;
      }

      const url = new URL(`${JUDGE_ME_ENDPOINT}/reviews`);

      Object.keys(params).forEach((key) => url.searchParams.append(key, String(params[key])));

      return url;
    }
    case 'yotpo':
      return `${YOTPO_CDN_ENDPOINT}/widget/${apiKey}/products/${productId}/reviews.json?page=${page}&per_page=5${
        (rating as number) > 0 ? `&star=${rating}` : ''
      }`;
  }
};

export const getProductReviews = async (sku: string | number, page = 1) => {
  const PRODUCT_REVIEWS_ENDPOINT = getReviewsEndpoint(sku, page);
  return await axios.get(PRODUCT_REVIEWS_ENDPOINT as string);
};

export const getCurrentPageItems = (currentPage: number, totalPages: number) => {
  const currentPageCount = currentPage - 1;
  const currentPageItemsCount = 5 * currentPageCount;
  return currentPageItemsCount >= totalPages ? totalPages : currentPageItemsCount;
};

export const submitReviewForm = async (formData: ReviewFormProps) => {
  const { name, email, rating, body, nameFormat, title, id, productUrl, productTitle } = formData;
  const newName = name.replace(' ', '%20');
  const newNameFormat = nameFormat ?? null;
  const newTitle = title ?? null;

  return await axios.get(
    `/api/reviews/submit?name=${newName}&email=${email}&rating=${rating}&body=${body}&reviewerNameFormat=${newNameFormat}&title=${newTitle}&id=${id}&productUrl=${productUrl}&productTitle=${productTitle}`
  );
};

export const computeProductReviews = async (slug: string, productId: number) => {
  const { NEXT_PUBLIC_LIVE_URL, REVIEW_SERVICE_KEY, NEXT_PUBLIC_REVIEW_SERVICE } = env();
  const shopDomain = removeHttp(NEXT_PUBLIC_LIVE_URL);
  const apiKey = REVIEW_SERVICE_KEY;
  const baseUrl = JUDGE_ME_ENDPOINT;

  let fetchProductId = null;
  let PRODUCT_COUNT_ENDPOINT = '';
  let count = null;
  let rating = null;
  const ratings = [];

  if (!productId && slug && NEXT_PUBLIC_REVIEW_SERVICE === 'judge.me') {
    fetchProductId = await axios.get(
      `${baseUrl}/products/-1/?api_token=${apiKey}&shop_domain=${shopDomain}&handle=${slug}`
    );

    PRODUCT_COUNT_ENDPOINT = `${baseUrl}/reviews/count/?api_token=${apiKey}&shop_domain=${shopDomain}&product_id=${
      productId ?? fetchProductId
    }&per_page=5`;

    count = await axios.get(PRODUCT_COUNT_ENDPOINT);

    for (let i = 1; i <= 5; i++) {
      rating = await axios.get(`${PRODUCT_COUNT_ENDPOINT}&rating=${i}`);
      ratings.push(rating.data.count);
    }
  }

  const average =
    (1 * ratings[0] + 2 * ratings[1] + 3 * ratings[2] + 4 * ratings[3] + 5 * ratings[4]) /
    (ratings[0] + ratings[1] + ratings[2] + ratings[3] + ratings[4]);

  const percentage = [
    computeTotalPercentage(ratings[4], count?.data.count),
    computeTotalPercentage(ratings[3], count?.data.count),
    computeTotalPercentage(ratings[2], count?.data.count),
    computeTotalPercentage(ratings[1], count?.data.count),
    computeTotalPercentage(ratings[0], count?.data.count),
  ];

  return { count, average, percentage };
};
