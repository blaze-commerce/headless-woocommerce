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
  maybeCreateDir,
  parseJSON,
} from '@src/scripts/utils';
import { ParsedBlock as NewParsedBlock } from '@src/components/blocks';
import { getHomePageSlug, getPageSlugs } from '@src/lib/typesense/page';

export default async function execute() {
  await maybeCreateDir('public/page');

  const templateData = [
    {
      key: 'site-footer',
      file: 'footer.json',
    },
    {
      key: 'homepage_layout',
      file: 'homepage.json',
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
      key: 'site-header',
      file: 'header.json',
    },
  ];

  let parsedData,
    cssStyles = '',
    parsedContent: ParsedBlock[] = [];

  templateData.forEach(async (data) => {
    const { key, file } = data;
    const contentBlocks = await SiteInfo.find(key);

    parsedData = SiteInfoSchema.safeParse(contentBlocks);

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

    cssStyles += cssContentParser(parsedContent as NewParsedBlock[]);
  });

  const pageSlugs = await getPageSlugs();

  pageSlugs.forEach(async (pageSlug: string) => {
    const pageData = await generateJsonDataBySlug(pageSlug);
    if (pageData.blocks) {
      cssStyles += cssContentParser(pageData.blocks);
    }
  });

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
