import { ContentBlocks } from '@src/components/content-blocks';
import { FreeShippingBanner } from '@src/components/free-shipping-banner';
import { useSiteContext } from '@src/context/site-context';

export const TopHeader = () => {
  const { settings } = useSiteContext();

  if (!settings?.siteMessageTopHeader) return null;

  return (
    <>
      <ContentBlocks
        baseCountry=""
        blocks={settings.siteMessageTopHeader}
      />
      <FreeShippingBanner />
    </>
  );
};
