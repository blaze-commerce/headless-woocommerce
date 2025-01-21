/* eslint-disable no-console */
import * as fs from 'fs';
import path from 'path';

import { ParsedBlock, parse } from '@wordpress/block-serialization-default-parser';

import { SiteInfo } from '@src/lib/typesense/site-info';
import { SiteInfoSchema } from '@src/schemas/typesense-schema';
import {
  addIds,
  cssContentParser,
  generateJsonDataBySlug,
  generatePostJsonDataBySlug,
  maybeCreateDir,
} from '@src/scripts/utils';
import { ParsedBlock as NewParsedBlock } from '@src/components/blocks';
import { getPageSlugs } from '@src/lib/typesense/page';

import postSlugs from '@public/post-slugs.json';
import siteData from '@public/site.json';

/**
 * Helper to process items in chunks
 */
const processInChunks = async <T>(
  items: T[],
  chunkSize: number,
  processor: (item: T) => Promise<string>
): Promise<string[]> => {
  const results: string[] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const chunkResults = await Promise.all(chunk.map(processor));
    results.push(...chunkResults);
  }
  return results;
};

/**
 * Process post and page styles to generate Tailwind CSS classes
 */
const processPostAndPageStyles = async (): Promise<string> => {
  const pageSlugs = await getPageSlugs();
  pageSlugs.push(siteData.blogPageSlug);

  const pageStyles = await processInChunks(pageSlugs, 5, async (slug) => {
    const data = await generateJsonDataBySlug(slug);
    return data.blocks ? cssContentParser(data.blocks) : '';
  });

  const postStyles = await processInChunks(postSlugs, 5, async (slug) => {
    const data = await generatePostJsonDataBySlug(slug);
    return data.blocks ? cssContentParser(data.blocks) : '';
  });

  return pageStyles.join('') + postStyles.join('');
};

/**
 * Process template styles from Gutenberg templates
 */
const processTemplatesStyles = async (): Promise<string> => {
  const templateData = [
    { key: 'site-footer', file: 'footer.json' },
    { key: 'site-single', file: 'single-post.json' },
    { key: 'site-single-product', file: 'single-product.json' },
    { key: 'site-page', file: 'page.json' },
    { key: 'site-archive-product', file: 'archive-product.json' },
    { key: 'site-taxonomy-product_cat', file: 'taxonomy-product-cat.json' },
    { key: 'site-header', file: 'header.json' },
  ];

  const templateStyles = await processInChunks(templateData, 3, async ({ key, file }) => {
    const contentBlocks = await SiteInfo.find(key);
    const parsedData = SiteInfoSchema.safeParse(contentBlocks);

    let parsedContent: ParsedBlock[] = [];
    if (parsedData.success) {
      parsedContent = addIds(parse(parsedData.data.value) as NewParsedBlock[]);
    }

    const fullFilePath = path.join(process.cwd(), 'public', file);
    fs.writeFileSync(fullFilePath, JSON.stringify(parsedContent), { encoding: 'utf-8' });

    return cssContentParser(parsedContent as NewParsedBlock[]);
  });

  return templateStyles.join('');
};

/**
 * Main function to execute the entire process
 */
const execute = async () => {
  await maybeCreateDir('public/page');
  await maybeCreateDir('public/post');

  let cssStyles = '';
  cssStyles += await processTemplatesStyles();
  cssStyles += await processPostAndPageStyles();

  const stylesFolderPath = './public/styles';
  await maybeCreateDir(stylesFolderPath);

  fs.writeFile(`${stylesFolderPath}/styles.css`, cssStyles, (err) => {
    if (err) {
      console.error('Error writing CSS file:', err);
    } else {
      console.log('CSS file created successfully!');
    }
  });
};

export default execute;
