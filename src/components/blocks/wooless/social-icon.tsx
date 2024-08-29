import { ParsedBlock } from '@wordpress/block-serialization-default-parser';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa';

import { isBlockA } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';

type SocialIconProps = {
  block: ParsedBlock;
};

export const SocialIcon = ({ block }: SocialIconProps) => {
  if (!isBlockA(block, 'SocialIcon')) {
    return null;
  }

  const attribute = block.attrs as BlockAttributes;
  /**
   * We need at least 2 data attribute from the block for link and the icon to be use so we don't render anything if data doesn't follow it
   */
  if (!attribute.htmlAttributes || attribute.htmlAttributes?.length < 2) {
    return (
      <span className="text-red-500">
        Please add custom attribute data-redirect-link and data-icon
      </span>
    );
  }

  const [link, icon, clsn] = attribute.htmlAttributes;
  const iconName = icon.value?.toLocaleLowerCase();
  const classNames = clsn ? ` ${clsn.value}` : '';

  let realIcon;

  switch (iconName) {
    case 'fafacebookf':
      realIcon = <FaFacebookF className={classNames} />;
      break;
    case 'fainstagram':
      realIcon = <FaInstagram className={classNames} />;
      break;
    case 'fayoutube':
      realIcon = <FaYoutube className={classNames} />;
      break;
    case 'fapinterest':
      realIcon = <FaPinterest className={classNames} />;
      break;
    default:
      realIcon = <></>;
      break;
  }

  return (
    <Link
      href={link.value ? link.value : '#'}
      className={cn(attribute.className, 'flex justify-center items-center')}
    >
      {realIcon}
    </Link>
  );
};
