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
  parseJSON,
} from '@src/scripts/utils';
import { ParsedBlock as NewParsedBlock } from '@src/components/blocks';
import { getPageSlugs } from '@src/lib/typesense/page';

import postSlugs from '@public/post-slugs.json';
import siteData from '@public/site.json';

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

  return pageStyles.join('');
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
    {
      key: 'site-template-product-cards',
      file: 'product-cards.json',
    },
    {
      key: 'site-wp-custom-template-mini-cart',
      file: 'minicart.json',
    },
    {
      key: 'site-wp-custom-template-wish-list-sidebar',
      file: 'wishlist.json',
    },
  ];

  const templateStyles = await Promise.all(
    templateData.map(async (data) => {
      let parsedContent: ParsedBlock[] = [];
      const { key, file } = data;
      const contentBlocks = await SiteInfo.find(key);

      const parsedData = SiteInfoSchema.safeParse(contentBlocks);

      if (parsedData.success) {
        parsedContent = addIds(parse(parsedData.data.value) as NewParsedBlock[]);
        const parsedValue = parseJSON(parsedData?.data?.value);
        if (parsedValue) {
          let stringBlocks = '';
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          parsedValue?.forEach((block: any) => {
            if (block.blockId === 'gutenbergBlocks') {
              Object.keys(block.metaData).forEach((key) => {
                stringBlocks += block.metaData[key].content;
              });
            }
          });

          parsedContent = addIds(parse(stringBlocks) as NewParsedBlock[]);
        } else {
          parsedContent = addIds(parse(parsedData.data.value) as NewParsedBlock[]);
        }
      }

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
