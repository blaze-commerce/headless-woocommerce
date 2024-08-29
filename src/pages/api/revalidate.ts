import { NextApiRequest, NextApiResponse } from 'next';

import { SiteInfo } from '@src/lib/typesense/site-info';
import { Country } from '@src/lib/helpers/country';
import { RegionalData } from '@src/types';
import { stripTrailingSlash } from '@src/lib/helpers/helper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const secretToken = req.headers?.['api-secret-token'];
    if (secretToken !== process.env.TYPESENSE_PRIVATE_KEY) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    const regionsRequest = await SiteInfo.find('currencies');
    const currencies: RegionalData[] = JSON.parse(regionsRequest?.value as string);

    const countries = currencies.map((currency) => currency.baseCountry) || [
      Country.Australia.code,
    ];
    const slugs = req.body;
    const revalidationPromises: Promise<void>[] = [];
    const endpoints: string[] = [];
    for (const url of slugs) {
      countries.forEach(async (country) => {
        const endpoint = `/${country}/${url}`.replaceAll('//', '/').replaceAll('__trashed/', '');
        const finalEndpoint = stripTrailingSlash(endpoint);
        endpoints.push(finalEndpoint);
        revalidationPromises.push(res.revalidate(finalEndpoint));
      });
    }

    await Promise.all(revalidationPromises);

    return res.status(200).json({ message: 'Revalidated', endpoints });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page

    return res.status(500).send('Error revalidating');
  }
}
