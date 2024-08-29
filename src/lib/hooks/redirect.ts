import Cookies from 'js-cookie';
import { useEffect } from 'react';

import { isStagingSite } from '@src/lib/helpers/helper';

export const useRedirectSite = () => {
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const noredirect = urlSearchParams.get('noredirect') ?? '';

    if (noredirect === '1') {
      Cookies.set('redirect', 'false');
    } else if (isStagingSite() && !noredirect && Cookies.get('redirect') !== 'false') {
      window.location.replace(process.env.NEXT_PUBLIC_LIVE_URL);
    }
  }, []);
};
