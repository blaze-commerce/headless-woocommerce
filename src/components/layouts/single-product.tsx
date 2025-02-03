import React, { ReactElement } from 'react';
import { cn } from '@src/lib/helpers/helper';
import { ContentBlocks } from '@src/components/content-blocks';
import { Header } from '@components/header-block';
import { Footer } from '@components/footer';
import { useSiteContext } from '@src/context/site-context';
import { AgeGate } from '@src/features/age-gate';
import { MiniCart } from '@src/features/mini-cart';

type Props = {
  children: React.ReactNode;
};

const SingleProductLayout: React.FC<Props> = ({ children }) => {
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
      {children}
      <Footer />
      {settings?.store?.ageGate?.enabled && <AgeGate />}
    </>
  );
};

export const singleProductLayout = (page: ReactElement) => {
  return <SingleProductLayout>{page}</SingleProductLayout>;
};
