import cx from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

import { Image } from '@src/components/common/image';
import { useSiteContext } from '@src/context/site-context';
import { ProductCards } from '@src/models/settings/shop';
import { emptyImagePlaceholder } from '@src/lib/constants/image';
import { TaxonomyPageParams } from '@src/lib/types/taxonomy';
import Link from 'next/link';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

interface Props extends ProductCards {
  taxonomies: TaxonomyPageParams;
  classNames?: string;
}

export const CategoryCard = (props: Props) => {
  const { name, permalink, thumbnail } = props.taxonomies;
  const { classNames, detailsAlignment = 'center', hasBorders, imagePadding } = props;
  const { currentCountry, settings } = useSiteContext();

  const [imgError, setImgError] = useState(false);

  const { push, prefetch } = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible) {
      prefetch(`/${currentCountry}${permalink}`);
    }
  }, [isVisible, currentCountry, prefetch, permalink]);

  const handleMouseEnter = () => {
    prefetch(`/${currentCountry}${permalink}`);
  };

  const renderCardTitle = () => {
    return (
      <div
        ref={ref}
        className="font-bold text-sm text-neutral-600 tracking-[0.2em] uppercase text-center"
        onMouseEnter={handleMouseEnter}
      >
        <Link href={permalink ? permalink : '#'}>
          <span
            aria-hidden="true"
            className="absolute inset-0 z-[8] cursor-pointer"
          />
          <ReactHTMLParser html={name as string} />
        </Link>
      </div>
    );
  };

  const renderEmptyImagePlaceholder = () => {
    return (
      <Image
        src={emptyImagePlaceholder}
        alt={thumbnail?.altText as string}
        width={359}
        height={312}
        className={cx('absolute opacity-100', {
          'group-hover:opacity-0 group-hover:transition group-hover:ease-linear group-hover:duration-300 ease-linear duration-300':
            thumbnail?.src && typeof thumbnail?.src !== undefined && !imgError,
          'object-center object-cover lg:w-full lg:h-full': !imgError,
          'p-4 lg:p-7': imgError,
        })}
      />
    );
  };

  const renderCardImage = () => {
    return (
      <div
        className={cx(
          'aspect-w-1 relative overflow-hidden mx-auto flex justify-center items-center',
          settings?.productCardAspectRatioClasses,
          {
            'bg-gray-200': imgError,
          }
        )}
      >
        {imgError ? (
          renderEmptyImagePlaceholder()
        ) : (
          <Image
            src={thumbnail?.src as string}
            alt={thumbnail?.altText as string}
            width={359}
            height={312}
            className={cx('absolute opacity-100', {
              // 'group-hover:opacity-0 group-hover:transition group-hover:ease-linear group-hover:duration-300 ease-linear duration-300':
              //   thumbnail?.src && typeof thumbnail?.src !== undefined && !imgError,
              // 'object-center object-cover lg:w-full lg:h-full': !imgError,
              // 'p-4 lg:p-7': imgError,
            })}
            onError={() => {
              setImgError(true);
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div
      className={cx(
        'group relative grid content-between hover:shadow-xl transition-all ease-linear duration-300',
        {
          'border border-solid border-[#CDCDCD] max-w-xs': hasBorders,
        },
        classNames
      )}
      style={{ padding: `${imagePadding}px` }}
    >
      <div className="mb-4">{renderCardImage()}</div>
      <div className={`truncate text-${detailsAlignment}`}>{renderCardTitle()}</div>
    </div>
  );
};
