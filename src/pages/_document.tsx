import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import { env } from '@src/lib/env';
import { isDevelopmentEnvironment } from '@src/lib/helpers/helper';
import { font } from 'public/fonts';

export default function Document() {
  const { KLAVIYO_PUBLIC_KEY } = env();

  return (
    <Html lang="en">
      <Head>
        {isDevelopmentEnvironment() && (
          <meta
            name="robots"
            content="noindex, nofollow"
          />
        )}
      </Head>
      <body className={`${font.variable} font-sans`}>
        <Main />
        <NextScript />
        {KLAVIYO_PUBLIC_KEY && (
          <Script
            id="klaviyo-script"
            src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${KLAVIYO_PUBLIC_KEY}`}
            strategy="beforeInteractive"
          />
        )}
      </body>
    </Html>
  );
}
