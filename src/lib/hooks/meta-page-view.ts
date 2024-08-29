import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { meta } from '@src/lib/track/meta';

export const useMetaPageView = () => {
  const router = useRouter();

  useEffect(() => {
    if (meta.META_PIXEL_ID) {
      meta.pageView();
      const handleRouteChange = () => {
        meta.pageView();
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router.events]);
};
