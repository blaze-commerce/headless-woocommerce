import cx from 'classnames';
import { isEmpty } from 'lodash';
import { v4 } from 'uuid';

import { FacebookIconDefault } from '@components/svg/social/facebook';
import { InstagramIconDefault } from '@components/svg/social/instragram';
import { PinterestIconDefault } from '@components/svg/social/pinterest';

type SocialItem = {
  classes?: string;
  redirectUrl?: string;
  redirectType?: '_blank' | undefined;
  icon?: string;
};

type Props = {
  items: SocialItem[];
};

export const SocialIcons = ({ items }: Props) => {
  if (isEmpty(items)) return null;

  return (
    <div className="mt-5 flex flex-row gap-5">
      {items?.map((item) => {
        if (!item?.icon) return null;
        const classNames = cx(item?.classes, 'h-12 w-12');

        const renderIcon = () => {
          switch (item?.icon) {
            case 'facebook-default-icon':
              return (
                <FacebookIconDefault
                  className={classNames}
                  color={'none'}
                  size={'none'}
                />
              );
            case 'instagram-default-icon':
              return (
                <InstagramIconDefault
                  className={classNames}
                  color={'none'}
                  size={'none'}
                />
              );
            case 'pinterest-default-icon':
              return (
                <PinterestIconDefault
                  className={classNames}
                  color={'none'}
                  size={'none'}
                />
              );
          }
        };

        if (item?.redirectUrl) {
          return (
            <a
              key={v4()}
              href={item?.redirectUrl}
              target={item?.redirectType}
            >
              {renderIcon()}
            </a>
          );
        }
      })}
    </div>
  );
};
