import { Dictionary } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { Fragment } from 'react';

import { PrefetchLink } from '@src/components/common/prefetch-link';
import { useSiteContext } from '@src/context/site-context';
import { cn } from '@src/lib/helpers/helper';

type Card = {
  imageUrl: string;
  redirectUrl: string;
  title: string;
  shortDescription?: string;
};

type Props = {
  cards: Card[];
  config?: Dictionary<string>;
  blockId?: string;
};

export const CardGroup = ({ cards, config, blockId }: Props) => {
  const { settings } = useSiteContext();
  const { shop } = settings || {};
  const { layout } = shop || {};
  const { font } = settings?.homepage || {};

  const cardGroupStyle = {
    fontWeight: font?.featuredCategories?.weight,
    fontSize: font?.featuredCategories?.size,
    color: font?.featuredCategories?.color,
  };

  const containerClass = cn(
    config?.containerClass,
    {
      'w-full h-full px-0 grid-cols-2 md:px-4': !config?.containerClass,
      'grid lg:grid-cols-4': blockId !== 'cardGroupCentered',
      'flex flex-col lg:flex-row justify-between': blockId === 'cardGroupCentered',
    },
    settings?.productCardGapClasses
  );

  const cardContainerClass = cn(config?.cardContainerClass, {
    'w-full h-full bg-white justify-start flex-col gap-6 inline-flex': !config?.cardContainerClass,
    'border border-solid border-[#CDCDCD] max-w-xs':
      layout?.productCards?.hasBorders && blockId !== 'cardGroupCentered',
    'items-center': !settings?.homepage?.layout?.featuredCategories?.title?.alignText,
  });

  const cardImageClass = cn(config?.cardImageClass, {
    'absolute object-cover object-center': !config?.cardImageClass,
    'h-full w-full': blockId !== 'cardGroupCentered',
    'h-8 w-8': blockId === 'cardGroupCentered',
  });

  return (
    <div className={containerClass}>
      {cards.map((card) => {
        const { title, imageUrl, redirectUrl, shortDescription } = card;
        const splitSrc = imageUrl?.split('/');
        const splitType = imageUrl?.split('.');
        const imageType = splitType?.[splitType?.length - 1];
        const srcName = splitSrc?.[splitSrc?.length - 1];
        let newImageUrl = `/images/homepage/${srcName}`;

        if (imageType === 'svg') {
          newImageUrl = imageUrl;
        }

        const cardContentStyle: React.CSSProperties = {};
        cardContentStyle.borderColor = '#000000';
        cardContentStyle.borderWidth = '0px';
        cardContentStyle.borderStyle = 'solid';
        if (blockId !== 'cardGroupCentered') {
          if (layout?.productCards?.imagePadding) {
            cardContentStyle.padding = `${layout?.productCards?.imagePadding}px`;
          }

          if (settings?.homepage?.layout?.featuredCategories?.cardLayout?.border?.color) {
            cardContentStyle.borderColor =
              settings?.homepage?.layout?.featuredCategories?.cardLayout?.border?.color;
          }
          if (settings?.homepage?.layout?.featuredCategories?.cardLayout?.border?.enabled) {
            cardContentStyle.borderWidth = '1px';
          }
        }

        const shortDescriptionStyle = {
          color:
            settings?.homepage?.layout?.featuredCategories?.shortDescription?.font?.color ??
            '#000000',
          fontSize:
            settings?.homepage?.layout?.featuredCategories?.shortDescription?.font?.size ?? '12px',
          fontWeight:
            settings?.homepage?.layout?.featuredCategories?.shortDescription?.font?.weight ?? '400',
        };

        const cardContent = (
          <div
            className={cardContainerClass}
            style={cardContentStyle}
          >
            <div
              className={cn(
                'w-full',
                {
                  'aspect-w-1': !config?.cardImageClass && blockId !== 'cardGroupCentered',
                  'flex justify-center mb-5': blockId === 'cardGroupCentered',
                },
                settings?.productCardAspectRatioClasses
              )}
            >
              <Image
                className={cardImageClass}
                src={newImageUrl}
                alt={title}
                width={500}
                height={500}
              />
            </div>

            <div className="basis-0 px-2.5 justify-center">
              <div
                className={cn(
                  'basis-0 leading-tight no-underline',
                  settings?.homepage?.layout?.featuredCategories?.title?.alignText,
                  {
                    'text-center': blockId === 'cardGroupCentered',
                  }
                )}
                style={!isEmpty(cardGroupStyle) ? cardGroupStyle : {}}
              >
                {title}
              </div>
            </div>

            {settings?.homepage?.layout?.featuredCategories?.shortDescription?.enabled &&
              shortDescription && (
                <div className="basis-0 px-2.5 mb-5 justify-center">
                  <div
                    className={cn('basis-0 leading-tight', {
                      'text-center': blockId === 'cardGroupCentered',
                    })}
                    style={shortDescriptionStyle}
                  >
                    {shortDescription}
                  </div>
                </div>
              )}
          </div>
        );

        if (redirectUrl) {
          return (
            <PrefetchLink
              unstyled
              key={title}
              href={redirectUrl}
            >
              {cardContent}
            </PrefetchLink>
          );
        }

        return <Fragment key={title}>{cardContent}</Fragment>;
      })}
    </div>
  );
};
