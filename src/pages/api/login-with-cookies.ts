// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

import { env } from '@src/lib/env';
const { NEXT_PUBLIC_GRAPHQL_URL, NEXT_PUBLIC_COOKIE_DOMAIN } = env();

const corsOptions = {
  origin: '*', // Allow requests from all origins. Replace with the specific subdomain or domain you want to allow.
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  cors(corsOptions)(req, res, async () => {
    const clientMutationId = v4();
    const { login, password } = req.body;
    const data = JSON.stringify({
      operationName: 'LoginMutation',
      variables: {
        login,
        password,
        clientMutationId,
      },
      query:
        'mutation LoginMutation($login: String!, $password: String!, $clientMutationId: String!) {\n  loginWithCookies(\n    input: {password: $password, login: $login, clientMutationId: $clientMutationId}\n  ) {\n    clientMutationId\n    status\n    __typename\n  }\n}',
    });

    const config = {
      method: 'post',
      url: NEXT_PUBLIC_GRAPHQL_URL,
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
      data: data,
    };

    try {
      const axiosResponse = await axios(config);

      const cookies = axiosResponse.headers['set-cookie'];
      const woocommerceSession = axiosResponse.headers['woocommerce-session'];

      if (woocommerceSession) {
        cookies?.push(
          `woo-session=${woocommerceSession}; domain=${NEXT_PUBLIC_COOKIE_DOMAIN}; path=/; Max-Age=2419200; SameSite=None; Secure`
        );
      }

      if (axiosResponse.data.data.loginWithCookies) {
        cookies?.push(
          `isLoggedIn=true; domain=${NEXT_PUBLIC_COOKIE_DOMAIN}; path=/; Max-Age=2419200; SameSite=None; Secure`
        );
        cookies?.push(
          `loginSessionId=${axiosResponse.data.data.loginWithCookies.clientMutationId}; domain=${NEXT_PUBLIC_COOKIE_DOMAIN}; path=/; Max-Age=2419200; SameSite=None; Secure`
        );
      }

      if (cookies) {
        res.setHeader('Set-Cookie', cookies);
      }

      return res.status(200).send(axiosResponse.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return res.status(400).send(error);
    }
  });
}
