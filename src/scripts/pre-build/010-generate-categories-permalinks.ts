/* eslint-disable no-console */
import * as fs from 'fs';
import path from 'path';

import { getCategoryPermalinks } from '@src/lib/typesense/taxonomy';

export default async function execute() {
  console.log('generating category permalinks');
  try {
    const permalinks = await getCategoryPermalinks();

    const categoryPermalinksPath = path.join(process.cwd(), 'public', 'categorypaths.json');
    fs.writeFileSync(categoryPermalinksPath, JSON.stringify(permalinks), {
      encoding: 'utf-8',
    });

    console.log(`Generated category permalinks: ${categoryPermalinksPath}`);
  } catch (error) {
    console.error('Error generating category permalinks:', error);
  }
}
