/* eslint-disable no-console */
import * as fs from 'fs';
import path from 'path';
import axios from 'axios';

import { ParsedBlock, parse } from '@wordpress/block-serialization-default-parser';

import { SiteInfo } from '@src/lib/typesense/site-info';
import { SiteInfoSchema } from '@src/schemas/typesense-schema';
import {
  addIds,
  cssContentParser,
  generateJsonDataBySlug,
  generatePostJsonDataBySlug,
  maybeCreateDir,
  parseJSON,
} from '@src/scripts/utils';
import { ParsedBlock as NewParsedBlock } from '@src/components/blocks';
import { getPageSlugs } from '@src/lib/typesense/page';

import postSlugs from '@public/post-slugs.json';
import siteData from '@public/site.json';

const MAX_RETRIES = 5;
const TIMEOUT = 60000; // Increase timeout to 60 seconds

async function fetchWithRetry(key: string, retries = 0): Promise<ParsedBlock[]> {
  try {
    const contentBlocks = await axios.get(`/api/site-info/${key}`, { timeout: TIMEOUT });
    const parsedData = SiteInfoSchema.safeParse(contentBlocks.data);

    if (parsedData.success) {
      const parsedValue = parseJSON(parsedData?.data?.value);
      let stringBlocks = '';

      if (parsedValue) {
        parsedValue.forEach((block: any) => {
          if (block.blockId === 'gutenbergBlocks') {
            Object.keys(block.metaData).forEach((key) => {
              stringBlocks += block.metaData[key].content;
            });
          }
        });

        return addIds(parse(stringBlocks) as NewParsedBlock[]);
      } else {
        return addIds(parse(parsedData.data.value) as NewParsedBlock[]);
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED' && retries < MAX_RETRIES) {
      console.log(`Request failed due to timeout. Retrying... (${retries + 1}/${MAX_RETRIES})`);
      await new Promise((resolve) => setTimeout(resolve, 100 * Math.pow(2, retries)));
      return fetchWithRetry(key, retries + 1);
    } else {
      throw error;
    }
  }

  return [];
}

/**
 * This process the post and pages styles blocks
 *
 * @returns String tailwind css class styles
 */
const processPostAndPageStyles = async () => {
  const pageSlugs = await getPageSlugs();
  pageSlugs.push(siteData.blogPageSlug);

  const pageStyles = await Promise.all(
    pageSlugs.map(async (slug: string) => {
      const data = await generateJsonDataBySlug(slug);
      if (data.blocks) {
        return cssContentParser(data.blocks);
      }

      return ''; // If no blocks, return an empty string
    })
  );

  const postStyles = await Promise.all(
    postSlugs.map(async (slug: string) => {
      const data = await generatePostJsonDataBySlug(slug);
      if (data.blocks) {
        return cssContentParser(data.blocks);
      }

      return ''; // If no blocks, return an empty string
    })
  );

  return pageStyles.join('') + postStyles.join('');
};

/**
 * This Process the template styles that comes from gutenberg
 * @returns string tailwind css styles
 */
const processTemplatesStyles = async () => {
  const templateData = [
    {
      key: 'site-footer',
      file: 'footer.json',
    },
    {
      key: 'site-single',
      file: 'single-post.json',
    },
    {
      key: 'site-single-product',
      file: 'single-product.json',
    },
    {
      key: 'site-page',
      file: 'page.json',
    },
    {
      key: 'site-single-product',
      file: 'single-product.json',
    },
    {
      key: 'site-archive-product',
      file: 'archive-product.json',
    },
    {
      key: 'site-taxonomy-product_cat',
      file: 'taxonomy-product-cat.json',
    },
    {
      key: 'site-header',
      file: 'header.json',
    },
  ];

  const templateStyles = await Promise.all(
    templateData.map(async (data) => {
      const { key, file } = data;
      const parsedContent = await fetchWithRetry(key);

      const fullFilePath = path.join(process.cwd(), 'public', file);
      fs.writeFileSync(fullFilePath, JSON.stringify(parsedContent), {
        encoding: 'utf-8',
      });

      return cssContentParser(parsedContent as NewParsedBlock[]);
    })
  );

  return templateStyles.join('');
};

export default async function execute() {
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
}
