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

const processPostAndPageSlugs = async () => {
  const pageSlugs = await getPageSlugs();

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
  // return pageStyles.join('');
};

export default async function execute() {
  await maybeCreateDir('public/page');
  await maybeCreateDir('public/post');

  let parsedData,
    parsedContent: ParsedBlock[] = [];

  const footerContentBlocks = await SiteInfo.find('site-footer');

  parsedData = SiteInfoSchema.safeParse(footerContentBlocks);

  if (parsedData.success) {
    parsedContent = addIds(parse(parsedData.data.value) as NewParsedBlock[]);
  }

  let cssStyles = '';

  const footerFullFilePath = path.join(process.cwd(), 'public', 'footer.json');
  fs.writeFileSync(footerFullFilePath, JSON.stringify(parsedContent), {
    encoding: 'utf-8',
  });

  cssStyles += cssContentParser(parsedContent as NewParsedBlock[]);
  cssStyles += await processPostAndPageSlugs();

  // for homepage
  const homepageContentBlocks = await SiteInfo.find('homepage_layout');
  parsedData = SiteInfoSchema.safeParse(homepageContentBlocks);
  if (parsedData.success) {
    const parsedValue = parseJSON(parsedData?.data?.value);
    let homepageStringBlocks = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parsedValue?.forEach((block: any) => {
      if (block.blockId === 'gutenbergBlocks') {
        Object.keys(block.metaData).forEach((key) => {
          homepageStringBlocks += block.metaData[key].content;
        });
      }
    });

    parsedContent = addIds(parse(homepageStringBlocks) as NewParsedBlock[]);
  }

  const homepageFullFilePath = path.join(process.cwd(), 'public', 'homepage.json');
  fs.writeFileSync(homepageFullFilePath, JSON.stringify(parsedContent), {
    encoding: 'utf-8',
  });

  cssStyles += cssContentParser(parsedContent as NewParsedBlock[]);

  // for product page
  parsedContent = [];
  const productContentBlocks = await SiteInfo.find('site-product');
  parsedData = SiteInfoSchema.safeParse(productContentBlocks);

  if (parsedData.success) {
    parsedContent = parse(parsedData.data.value);
  }

  const productFullFilePath = path.join(process.cwd(), 'public', 'product.json');
  fs.writeFileSync(productFullFilePath, JSON.stringify(parsedContent), {
    encoding: 'utf-8',
  });

  cssStyles += cssContentParser(parsedContent as NewParsedBlock[]);

  // Header
  const headerContentBlocks = await SiteInfo.find('site-header');
  const parsedHeaderData = SiteInfoSchema.safeParse(headerContentBlocks);
  let parsedHeaderContent: ParsedBlock[] = [];
  if (parsedHeaderData.success) {
    parsedHeaderContent = addIds(parse(parsedHeaderData.data.value) as NewParsedBlock[]);
  }
  const headerFullFilePath = path.join(process.cwd(), 'public', 'header.json');
  fs.writeFileSync(
    headerFullFilePath,
    JSON.stringify(addIds(parsedHeaderContent as NewParsedBlock[])),
    {
      encoding: 'utf-8',
    }
  );
  cssStyles += cssContentParser(parsedHeaderContent as NewParsedBlock[]);
  // console.log('cssStyles', cssStyles);
  // End Header

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
