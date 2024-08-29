import { ArrowRightIcon } from '@heroicons/react/20/solid';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import { v4 } from 'uuid';

import { PrefetchLink } from '@src/components/common/prefetch-link';

type LinkItems = {
  classes: string;
  text: string;
  redirectUrl: string;
};

type Props = {
  links: LinkItems[];
};

export const MultipleLinks = ({ links }: Props) => {
  if (isEmpty(links)) return null;

  const lastIndex = links[links.length - 1];

  return (
    <div className="mt-8 w-full flex flex-row justify-center flex-wrap">
      {links?.map((link) => {
        const classNames = cx(link?.classes, 'gap-2.5');
        const fontColor = link?.classes?.match(/text-\[(.*)\]/)?.pop();
        const textStyle = {
          color: fontColor ? fontColor : '',
        };
        const hasArrowIcon = link?.classes?.includes('has-arrow-icon');

        if (!link?.redirectUrl) return null;
        return (
          <>
            <PrefetchLink
              key={v4()}
              unstyled
              href={link?.redirectUrl}
              className={classNames}
              style={textStyle}
            >
              {link?.text}
              {hasArrowIcon && <ArrowRightIcon className="w-3.5 h-3.5" />}
            </PrefetchLink>
            {link !== lastIndex && <span className="text-sm text-stone-400 px-1">|</span>}
          </>
        );
      })}
    </div>
  );
};
