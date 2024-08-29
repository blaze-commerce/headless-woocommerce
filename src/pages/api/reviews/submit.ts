import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { env } from '@src/lib/env';
import { JUDGE_ME_ENDPOINT, YOTPO_ENDPOINT } from '@src/lib/constants/endpoints';
import { getCurrentIPAddress, removeHttp } from '@src/lib/helpers/helper';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { currentDate } from '@src/lib/helpers/date';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    NEXT_PUBLIC_REVIEW_SERVICE,
    NEXT_PUBLIC_LIVE_URL,
    REVIEW_SERVICE_KEY,
    NEXT_PUBLIC_WORDPRESS_SITE_URL,
    WC_CONSUMER_KEY,
    WC_CONSUMER_SECRET,
    JUDGEME_SHOP_DOMAIN,
  } = env();
  const { name, email, rating, body, reviewerNameFormat, title, id, productTitle, productUrl } =
    req.query;
  const shopDomain = removeHttp(NEXT_PUBLIC_LIVE_URL);
  const ipAddress = await getCurrentIPAddress();
  const platform = 'woocommerce'; // TODO: replace with env variable

  const wooReviewData = {
    product_id: id,
    review: body,
    reviewer: name,
    reviewer_email: email,
    rating: +(rating as string),
    date_created: currentDate(),
    status: 'hold',
  };

  const yotpoOptions = {
    method: 'POST',
    url: `${YOTPO_ENDPOINT}/widget/reviews`,
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    data: {
      appkey: REVIEW_SERVICE_KEY,
      domain: NEXT_PUBLIC_LIVE_URL,
      sku: id,
      product_title: productTitle,
      product_url: `${NEXT_PUBLIC_LIVE_URL}${productUrl}`,
      display_name: name,
      email: email,
      review_content: body,
      review_title: title,
      review_score: +(rating as string),
    },
  };

  const WooCommerce = new WooCommerceRestApi({
    url: NEXT_PUBLIC_WORDPRESS_SITE_URL as string,
    consumerKey: WC_CONSUMER_KEY as string,
    consumerSecret: WC_CONSUMER_SECRET as string,
    version: 'wc/v3',
    queryStringAuth: true,
  });

  try {
    switch (NEXT_PUBLIC_REVIEW_SERVICE) {
      case 'judge.me': {
        const realShopDomain = JUDGEME_SHOP_DOMAIN ?? shopDomain;
        await axios.post(
          `${JUDGE_ME_ENDPOINT}/reviews?&shop_domain=${realShopDomain}&platform=${platform}&name=${name}&email=${email}&rating=${rating}&body=${body}&reviewer_name_format=${
            reviewerNameFormat ?? null
          }&title=${title ?? null}&ip_addr=${ipAddress.data.ip}&id=${id}`
        );
        return res.status(200).json({ message: 'success' });
      }
      case 'yotpo':
        await axios.request(yotpoOptions);
        return res.status(200).json({ message: 'success' });
      case 'woocommerce_native_reviews':
        await WooCommerce.post('products/reviews', wooReviewData);
        return res.status(200).json({ message: 'success' });
      default:
        throw new Error(
          'Review service not found or not supported. Make sure your ENV variable (NEXT_PUBLIC_REVIEW_SERVICE) is set correctly.'
        );
    }
  } catch (error) {
    return res.status(500).json({ message: 'failed' });
  }
}
