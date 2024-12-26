import { ApolloProvider } from '@apollo/client';
import '@public/styles/styles.css';
import '@styles/globals.css';
import '@styles/form.css';
import 'glider-js/glider.min.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode, useEffect } from 'react';
import TagManager from 'react-gtm-module';

import { YotpoRewards } from '@src/features/yotpo-rewards';
import { MetaPixelScript } from '@src/components/track/meta/meta-pixel-script';
import { SiteContextProvider } from '@src/context/site-context';
import { TypesenseContextProvider } from '@src/context/typesense-context';
import { UserContextProvider } from '@src/context/user-context';
import { client } from '@src/lib/apollo-client';
import { env } from '@src/lib/env';
import { ErrorBoundary } from '@src/components/error-boundary';
import { useMetaPageView } from '@src/lib/hooks';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import * as fonts from '@public/fonts';

const fontClasses = Object.keys(fonts)
  .map((key) => fonts[key as keyof typeof fonts].variable)
  .filter(Boolean) // Ensure only defined variables are included
  .join(' ');

const { NEXT_PUBLIC_GTM_ID } = env();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (_page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  useMetaPageView();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      TagManager.initialize({ gtmId: NEXT_PUBLIC_GTM_ID as string });
    }
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ErrorBoundary>
      <MetaPixelScript />
      <ApolloProvider client={client}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <link
            rel="icon"
            href="/favicon.ico"
          />
        </Head>

        <div className={`h-screen overflow-y-auto overflow-x-hidden ${fontClasses} font-primary`}>
          <TypesenseContextProvider>
            <SiteContextProvider>
              <UserContextProvider>
                {getLayout(<Component {...pageProps} />)}
                <YotpoRewards />
              </UserContextProvider>
            </SiteContextProvider>
          </TypesenseContextProvider>
        </div>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default App;
