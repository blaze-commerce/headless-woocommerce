/* eslint-disable no-console */
import * as fs from 'fs';
import path from 'path';

import { getPageSlugs } from '@src/lib/typesense/page';
import { getPostSlugs } from '@src/lib/typesense/post';

export default async function execute() {
  console.log('generating page/post slugs');
  try {
    const slugs = await getPageSlugs();

    const pageFilePath = path.join(process.cwd(), 'public', 'page-slugs.json');
    fs.writeFileSync(pageFilePath, JSON.stringify(slugs), {
      encoding: 'utf-8',
    });
    console.log(`Generated page slugs: ${pageFilePath}`);

    const postSlugs = await getPostSlugs();
    const postFilePath = path.join(process.cwd(), 'public', 'post-slugs.json');
    fs.writeFileSync(postFilePath, JSON.stringify(postSlugs), {
      encoding: 'utf-8',
    });
    console.log(`Generated post slugs: ${postFilePath}`);
  } catch (error) {
    console.error('Error generating page slugs:', error);
  }
}
