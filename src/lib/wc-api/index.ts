import axios from 'axios';

import { env } from '@src/lib/env';
const {
  WC_CONSUMER_KEY,
  WC_CONSUMER_SECRET,
  NEXT_PUBLIC_WORDPRESS_SITE_URL,
  GRAVITY_FORM_KEY,
  GRAVITY_FORM_SECRET,
} = env();

export const AUTHORIZATION_HEADER = {
  Authorization: `Basic ${Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString(
    'base64'
  )}`,
};

export const GRAVITY_FORM_HEADER = {
  Authorization: `Basic ${Buffer.from(`${GRAVITY_FORM_KEY}:${GRAVITY_FORM_SECRET}`).toString(
    'base64'
  )}`,
};

export const WC_REST_API = axios.create({
  baseURL: `${NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wc/v3`,
  headers: AUTHORIZATION_HEADER,
});
