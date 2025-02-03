import {
  getAttributeValue,
  getContainerClasses,
  getGridClasses,
  getImageClasses,
} from '@src/lib/block';
import { getBlockStyleRepresenter } from '@src/lib/block/block-style-representer';
import { ParsedBlock } from '@src/components/blocks';
import * as fs from 'fs';
import { parse } from '@wordpress/block-serialization-default-parser';
import { BlockAttributes } from '@src/lib/block/types';

import { map } from 'lodash';
import { generateRandomString } from '@src/lib/helpers';
import { getPageBySlug } from '@src/lib/typesense/page';
import { DefaultBlockStyleRepresenter } from '@src/components/blocks/style-representer';
import { WooCommerceStyleRepresenter } from '@src/components/blocks/woocommerce/style-representer';
import path from 'path';
import { parseImageClass } from '@src/lib/helpers/image';
import { getPostBySlug } from '@src/lib/typesense/post';
import Color from 'color';

export const maybeDeleteFile = async (filePath: string) => {
  if (fs.existsSync(filePath)) {
    await fs.promises.unlink(filePath);
  }
};

export const toHttps = (url: string) => {
  if (url.startsWith('http://')) {
    const https = 'https://';
    const http = 'http://';
    return url.replace(http, https);
  }

  return url;
};

export const maybeCreateDir = async (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    try {
      await fs.promises.mkdir(folderPath, { recursive: true });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating folder:', error);
    }
  }
};

export const maybeDeleteDir = async (path: string) => {
  if (!fs.existsSync(path)) return;
  fs.rmSync(path, { recursive: true });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseJSON = (value: any, fallback = '') => {
  if (typeof value === 'string' && value === '""') {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

export const cssContentParser = (content: string | ParsedBlock[]) => {
  const parsedContent = typeof content === 'string' ? (parse(content) as ParsedBlock[]) : content;
  if (!parsedContent) {
    return '';
  }

  let styles = '';
  parsedContent.forEach((block) => {
    const attribute = block.attrs as BlockAttributes;
    let blockClases = '';
    const imageClassName = parseImageClass(block.innerHTML);

    const containerBlocks = [
      'generateblocks/container',
      'core/columns',
      'core/column',
      'core/navigation',
    ];
    if (block.blockName && containerBlocks.includes(block.blockName)) {
      blockClases = `${getContainerClasses(block)}`;
      if (blockClases) {
        if (typeof block.id !== 'undefined') {
          styles += `._${block.id}{@apply ${blockClases};}`;
        }

        if (typeof attribute.uniqueId !== 'undefined') {
          styles += `._${attribute.uniqueId}{@apply ${blockClases};}`;
        }
      }

      if (block.innerBlocks) {
        styles += cssContentParser(block.innerBlocks);
      }

      const htmlAttributes = attribute.htmlAttributes ?? [];

      const submitClassnames = getAttributeValue(htmlAttributes, 'data-submit-classnames');
      styles += submitClassnames ? `/*${submitClassnames}*/` : '';
    } else if ('generateblocks/grid' === block.blockName) {
      blockClases = `${getGridClasses(block)}`;
      if (blockClases) {
        styles += `._${block.id}{@apply ${blockClases};}`;
      }

      if (block.innerBlocks) {
        styles += cssContentParser(block.innerBlocks);
      }
    } else if ('core/image' === block.blockName || 'generateblocks/image' === block.blockName) {
      blockClases = `${getImageClasses(block)}`;

      if (blockClases && imageClassName) {
        // We have to comment the css here so that tailwind will see the css and we just put the css in the image component because it doesn't have an id
        styles += `.${imageClassName}{@apply ${blockClases}}`;
      }
    } else if (typeof block.blockName === 'string') {
      const [coreName, blockName] = block.blockName.split('/');

      if (coreName === 'woocommerce') {
        const style = WooCommerceStyleRepresenter(block);
        // we will come back to this later
      } else {
        const blockRepresenter = getBlockStyleRepresenter(block);

        if (blockRepresenter) {
          const blockRepresenterInstance = new blockRepresenter();
          styles += blockRepresenterInstance.generateClassNames(block);
        } else {
          const blockRepresenterInstance = new DefaultBlockStyleRepresenter();
          const style = blockRepresenterInstance.generateClassNames(block);
          styles += style;
        }

        if (block.innerBlocks) {
          styles += cssContentParser(block.innerBlocks);
        }
      }
    }

    if (attribute.className) {
      //Add custom classes added by the user in the advance settings tab of Gutenberg blocks.
      styles += `/*${attribute.className}*/`;
    }
  });

  return styles;
};

export const addIds = (blocks: ParsedBlock[]) => {
  return map(blocks, (block) => {
    block.id = generateRandomString(6);
    if (block.innerContent.length > 0) {
      block.innerBlocks = addIds(block.innerBlocks);
    }
    return block;
  });
};

export const generateJsonDataBySlug = async (slug: string) => {
  const pageData = await getPageBySlug(slug);

  const jsonData = {
    ...pageData,
    blocks: addIds(parse(pageData?.rawContent || '') as ParsedBlock[]),
  };

  const pagePath = path.join(process.cwd(), 'public/page/', `${slug}.json`);
  fs.writeFileSync(pagePath, JSON.stringify(jsonData), {
    encoding: 'utf-8',
  });

  return jsonData;
};

export const generatePostJsonDataBySlug = async (slug: string) => {
  const pageData = await getPostBySlug(slug);
  const jsonData = {
    ...pageData,
    blocks: addIds(parse(pageData?.rawContent || '') as ParsedBlock[]),
  };

  const pagePath = path.join(process.cwd(), 'public/post/', `${slug}.json`);
  fs.writeFileSync(pagePath, JSON.stringify(jsonData), {
    encoding: 'utf-8',
  });

  return jsonData;
};

/**
 * Slugifies a given string.
 * Converts the string into a URL-friendly slug by:
 * 1. Lowercasing all characters
 * 2. Removing special characters
 * 3. Replacing spaces with hyphens
 *
 * @param {string} text - The string to slugify
 * @returns {string} - The slugified string
 */
export function slugify(text: string): string {
  return text
    .toString() // Ensure the input is a string
    .trim() // Remove leading and trailing whitespace
    .toLowerCase() // Convert to lowercase
    .normalize('NFD') // Normalize Unicode characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Collapse multiple hyphens into one
}
