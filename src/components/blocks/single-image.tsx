import cx from 'classnames';
import Image from 'next/image';

import { PrefetchLink } from '@src/components/common/prefetch-link';

type Props = {
  classes: string;
  imageUrl: string;
  altText: string;
  redirectUrl: string;
  redirectType?: '_blank' | undefined;
};

export const SingleImage = ({ classes, imageUrl, altText, redirectUrl, redirectType }: Props) => {
  if (!imageUrl) return null;

  const classNames = cx(classes);
  const image = (
    <Image
      src={imageUrl}
      alt={altText || 'image'}
      width={500}
      height={500}
      className={classNames}
    />
  );

  if (redirectUrl) {
    return (
      <PrefetchLink
        unstyled
        href={redirectUrl}
        target={redirectType || '_self'}
      >
        {image}
      </PrefetchLink>
    );
  }
  return image;
};
