import React, { ReactElement } from 'react';

import { ContentBlocks } from '@src/components/content-blocks';
import { Header } from '@components/header-block';
import { Footer } from '@components/footer';
import { useSiteContext } from '@src/context/site-context';
import { AgeGate } from '@src/features/age-gate';
import { MiniCart } from '@src/features/mini-cart';

type Props = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<Props> = ({ children }) => {
  const { settings } = useSiteContext();
  return (
    <>
      <Header />
      <MiniCart />
      {settings?.siteMessage && (
        <ContentBlocks
          baseCountry=""
          blocks={settings.siteMessage}
        />
      )}
      <main className="product-archive-page">{children}</main>
      <Footer />
      {settings?.store?.ageGate?.enabled && <AgeGate />}
    </>
  );
};

export const defaultLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
