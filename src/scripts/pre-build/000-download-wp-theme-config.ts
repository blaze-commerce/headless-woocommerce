/* eslint-disable no-console */
import { SiteInfo } from '@src/lib/typesense/site-info';
import { parseJSON } from '@src/scripts/utils';
import * as fs from 'fs';
import path from 'path';

export default async function execute() {
  try {
    const theme = await SiteInfo.find('theme_json');

    if (theme?.value) {
      const pageFilePath = path.join(process.cwd(), 'public', 'wp-theme.json');
      fs.writeFileSync(pageFilePath, parseJSON(JSON.stringify(theme?.value)), {
        encoding: 'utf-8',
      });
    }
  } catch (error) {
    console.error('Error downloading current theme config:', error);
  }
}
