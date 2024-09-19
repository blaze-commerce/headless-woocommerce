import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import Script from 'next/script';

import { env } from '@src/lib/env';
import { isDevelopmentEnvironment } from '@src/lib/helpers/helper';
import { font } from 'public/fonts';

class BlazeCommerceDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { html: string }> {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      html:
        '\n<!-- Open Source Headless WooCommerce by Blaze Commerce - https://blazecommerce.io -->' +
        initialProps.html,
    };
  }

  render() {
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
}

export default BlazeCommerceDocument;
