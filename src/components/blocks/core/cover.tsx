import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { BlockAttributes } from '@src/lib/block/types';
import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import { Content } from '@src/components/blocks/content';

import Image from 'next/image';
import { cn } from '@src/lib/helpers/helper';

type CoverProps = {
  block: ParsedBlock;
};

const parseCoverClass = (htmlString: string): string => {
  const match = htmlString.match(/<div class="([^"]*)"[^>]*>\s*<img/);
  return match ? match[1] : ''; // Get the first class name
};

export const Cover = ({ block }: CoverProps) => {
  if ('core/cover' !== block.blockName) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;
  const coverImageUrl = attributes.url;

  if (!coverImageUrl) {
    return null;
  }

  return (
    <div className={cn('relative isolate overflow-hidden', attributes.className)}>
      <Image
        src={coverImageUrl}
        fill
        alt={attributes.alt ?? 'cover'}
        className="inset-0 -z-10 size-full object-cover h-full object-center !static"
      />
      <div className={cn('absolute w-full h-full top-0', parseCoverClass(block.innerHTML))}>
        <Content content={block.innerBlocks} />
      </div>
    </div>
  );
};
