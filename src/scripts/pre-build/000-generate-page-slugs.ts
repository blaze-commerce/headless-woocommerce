/* eslint-disable no-console */
import * as fs from 'fs';
import path from 'path';

import { getPageSlugs } from '@src/lib/typesense/page';

export default async function execute() {
  console.log('generating page permalinks');
  try {
    const slugs = await getPageSlugs();

    const filePath = path.join(process.cwd(), 'public', 'pageslugs.json');
    fs.writeFileSync(filePath, JSON.stringify(slugs), {
      encoding: 'utf-8',
    });

    console.log(`Generated page slugs: ${filePath}`);
  } catch (error) {
    console.error('Error generating page slugs:', error);
  }
}
