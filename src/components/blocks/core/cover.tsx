import { BlockAttributes } from '@src/lib/block/types';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import { Content } from '@src/components/blocks/content';
import theme from '@public/theme.json';

import Image from 'next/image';
import { cn } from '@src/lib/helpers/helper';
import { hexToHslValue, percentageToDecimal } from '@src/lib/helpers/color';
import { useContentContext } from '@src/context/content-context';

type CoverProps = {
  block: ParsedBlock;
};

const parseCoverClass = (htmlString: string): string => {
  const match = htmlString.match(/<div class="([^"]*)"[^>]*>\s*<img/);
  return match ? match[1] : ''; // Get the first class name
};

export const Cover = ({ block }: CoverProps) => {
  const { type } = useContentContext();

  if ('core/cover' !== block.blockName) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;
  const coverImageUrl = attributes.url;

  const overlayColor = Object.keys(theme.colorVars).find(
    (colorKey) => colorKey == `--${attributes.overlayColor}`
  );

  const colorVars = theme.colorVars as Record<string, string>;
  const overlay = (overlayColor && colorVars[overlayColor]) || undefined;
  const dimRatio = attributes.dimRatio && percentageToDecimal(attributes.dimRatio);

  const backgroundColor = `hsla(${hexToHslValue(
    overlay ? overlay : attributes.customOverlayColor ? attributes.customOverlayColor : '#ffffff',
    ','
  )},${dimRatio})`;

  if (!coverImageUrl) {
    return null;
  }

  return (
    <div className={cn('cover relative isolate overflow-hidden', attributes.className)}>
      <Image
        src={coverImageUrl}
        fill
        alt={attributes.alt ?? 'cover'}
        className="inset-0 -z-10 size-full object-cover h-full object-center !static"
      />
      {attributes.isUserOverlayColor && (
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundColor }}
        ></div>
      )}
      <div className={cn('absolute w-full h-full top-0', parseCoverClass(block.innerHTML))}>
        <Content
          type={type}
          content={block.innerBlocks}
        />
      </div>
    </div>
  );
};
