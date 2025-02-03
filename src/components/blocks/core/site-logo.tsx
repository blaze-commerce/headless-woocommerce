import Image from 'next/image';
import { last } from 'lodash';

import { BlockAttributes } from '@src/lib/block/types';
import { BlockComponentProps } from '@src/components/blocks';
import { PrefetchLink } from '@src/components/common/prefetch-link';
import { useSiteContext } from '@src/context/site-context';

export const SiteLogo = ({ block }: BlockComponentProps) => {
  const { settings } = useSiteContext();

  if ('core/site-logo' !== block.blockName || !settings) {
    return null;
  }

  const { header } = settings;
  const hasCustomLogo = header?.logo.desktop?.src;

  const attributes = block.attrs as BlockAttributes;

  const widthRegex = new RegExp('w-[(d*)px]', 'gm');
  const matchedWidth = widthRegex.exec(attributes.className || '');
  const width = parseInt(last(matchedWidth) || '') || parseInt(attributes.width || '') || 160;

  const heightRegex = new RegExp('h-[(d*)px]', 'gm');
  const matchedHeight = heightRegex.exec(attributes.className || '');
  const height = parseInt(last(matchedHeight) || '') || 60;

  if (!header?.logo?.desktop.src) {
    return null;
  }

  return (
    <PrefetchLink
      unstyled
      href="/"
    >
      <Image
        src={
          hasCustomLogo
            ? `/logo.${header?.logo.desktop?.src?.split('.')?.[1]}`
            : (header?.logo?.desktop?.wpSrc as string) || ''
        }
        alt="site logo"
        width={width}
        height={height}
        priority
        className="h-full w-full"
      />
    </PrefetchLink>
  );
};
