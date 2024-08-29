import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import NextImage from 'next/image';
import Link from 'next/link';

import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';

type ImageProps = {
  block: ParsedBlock;
};

const parseImageLink = (htmlString: string): string | null => {
  // Regular expression to match src attribute in img tag
  const regex = /<a.*?href=["'](.*?)["']/;

  // Match the regex pattern against the input HTML string
  const match = htmlString.match(regex);

  // If match is found, return the src value
  return match && match.length > 1 ? match[1] : null;
};

const parsetImageSrc = (htmlString: string): string | null => {
  // Regular expression to match src attribute in img tag
  const regex = /<img.*?src=["'](.*?)["']/;

  // Match the regex pattern against the input HTML string
  const match = htmlString.match(regex);

  // If match is found, return the src value
  return match && match.length > 1 ? match[1] : null;
};

const parseImageAlt = (htmlString: string): string => {
  // Regular expressions to match alt and title attributes in img tag
  const altRegex = /<img.*?alt=["'](.*?)["']/;
  const titleRegex = /<img.*?title=["'](.*?)["']/;

  // Match the regex patterns against the input HTML string
  const altMatch = htmlString.match(altRegex);
  const titleMatch = htmlString.match(titleRegex);

  // If alt attribute is found, return its value
  if (altMatch && altMatch.length > 1 && altMatch[1]) {
    return altMatch[1];
  }
  // If alt attribute is not found, try to get value from title attribute
  if (titleMatch && titleMatch.length > 1 && titleMatch[1]) {
    return titleMatch[1];
  }

  return ''; // Return empty string if neither alt nor title attribute is found
};

export const parseImageClass = (htmlString: string): string => {
  // Regular expression to match src attribute in img tag
  const regex = /<img.*?class=["'](.*?)["']/;

  // Match the regex pattern against the input HTML string
  const match = htmlString.match(regex);

  // If match is found, return the src value
  return match && match.length > 1 ? match[1].split(' ').join('-') : '';
};

export const Image = ({ block }: ImageProps) => {
  const isImageBlock =
    'core/image' === block.blockName || 'generateblocks/image' === block.blockName;

  const imageSource = parsetImageSrc(block.innerHTML);

  // we just make sure that the block name is correct
  if (!isImageBlock || !imageSource) {
    return null;
  }

  const altText = parseImageAlt(block.innerHTML);
  const attribute = block.attrs as BlockAttributes;

  const { width, height, className } = attribute || {};

  const finalWidth = width ? parseInt(width.replace('px', '')) : 1;
  const finalHeight = height ? parseInt(height.replace('px', '')) : 1;

  const imageClasses = cn(attribute.className, parseImageClass(block.innerHTML));
  const imageLink = parseImageLink(block.innerHTML);

  if (imageLink && imageLink != imageSource) {
    return (
      <Link
        href={imageLink}
        className={className ?? ''}
      >
        <NextImage
          width={finalWidth}
          height={finalHeight}
          alt={altText}
          src={imageSource}
          className={cn(imageClasses, '')}
        />
      </Link>
    );
  }

  return (
    <NextImage
      width={finalWidth}
      height={finalHeight}
      alt={altText}
      src={imageSource}
      className={cn(imageClasses, '')}
    />
  );
};
