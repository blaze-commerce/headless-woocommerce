import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import NextImage from 'next/image';
import Link from 'next/link';

import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import {
  parseImageAlt,
  parseImageClass,
  parseImageLink,
  parsetImageSrc,
} from '@src/lib/helpers/image';

type ImageProps = {
  block: ParsedBlock;
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
