import HTMLReactParser from 'html-react-parser';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

import { RawLink } from '@src/components/common/raw-link';
import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';
import { cn } from '@src/lib/helpers/helper';
import { ITSBreadcrumbs } from '@src/lib/typesense/types';
import Link from 'next/link';
import { HomeIcon } from '@src/components/svg/home';

export const Separator = ({ separator = '/', className = 'text-[#AAAAAA]' }) => {
  return <span className={`mx-1.5 ${className}`}>{separator}</span>;
};

const BCLink = ({ uri, name, className }: { uri: string; name: string; className: string }) => {
  return (
    <RawLink href={uri}>
      <span className={className}>{HTMLReactParser(name)}</span>
    </RawLink>
  );
};

type Props = {
  className?: string;
  separator?: string;
  productName?: string;
  crumbs?: ITSBreadcrumbs[];
};

const removeDash = (text: string) => {
  return text.replace('-', ' ');
};

export const BreadCrumbs: React.FC<Props> = ({ className, separator, productName, crumbs }) => {
  const { asPath } = useRouter();
  const { settings } = useSiteContext();
  const { store } = settings as Settings;

  const pathIndex = asPath.split('/');
  const firstPath = pathIndex[1] ? removeDash(pathIndex[1]) : null;
  const secondPath = pathIndex[2] ? removeDash(pathIndex[2]) : null;
  const isCategoryBrand = pathIndex[1] === 'brand';
  const isShopPages = (pathIndex[1] === 'shop' || pathIndex[1] === 'brands') && !pathIndex[2];
  const isDefaultBreadcrumbs = isEmpty(crumbs) || productName || isShopPages;
  const isProductBreadcrumbs = isEmpty(crumbs) || !productName;

  const renderSecondaryPagesBreadcrumbs = () => {
    const isSecondaryPages = pathIndex[2] === 'on-sale' || pathIndex[2] === 'new';
    if (!isSecondaryPages) return null;

    return (
      <>
        <Separator separator={separator} />
        <BCLink
          uri="/shop"
          name="Products"
          className="text-[#AAAAAA]"
        />
        {secondPath && (
          <>
            <Separator separator={separator} />
            <span className="text-[#585858]">{HTMLReactParser(secondPath as string)}</span>
          </>
        )}
      </>
    );
  };

  const renderShopPagesBreadcrumbs = () => {
    if (!isShopPages) return null;

    return (
      <>
        {firstPath && (
          <>
            <Separator separator={separator} />{' '}
            <span className="text-[#585858]">
              {HTMLReactParser((isCategoryBrand ? 'brands' : firstPath) as string)}
            </span>
          </>
        )}
      </>
    );
  };

  const renderProductBreadcrumbs = () => {
    if (isProductBreadcrumbs) return null;

    return (
      <>
        {crumbs?.map((crumb, i: number) => (
          <Fragment key={i}>
            <Separator separator={separator} />
            <BCLink
              uri={crumb?.permalink as string}
              name={crumb?.name as string}
              className="text-brand-primary"
            />
          </Fragment>
        ))}
        <Separator separator={separator} />
        <span className="text-brand-primary">{HTMLReactParser(productName as string)}</span>
      </>
    );
  };

  const renderDefaultBreadcrumbs = () => {
    if (isDefaultBreadcrumbs) return null;

    return (
      <>
        {crumbs?.map((crumb, index) => (
          <Fragment key={index}>
            <Separator separator={separator} />{' '}
            {crumbs.length > 1 && index === 0 ? (
              <BCLink
                uri={crumb?.permalink as string}
                name={crumb?.name as string}
                className="text-brand-primary"
              />
            ) : (
              <span className="text-brand-primary px-1.5">
                {HTMLReactParser(crumb?.name as string)}
              </span>
            )}
          </Fragment>
        ))}
      </>
    );
  };

  return (
    <div
      className={cn(
        'breadcrumbs flex-wrap text-sm md:text-base font-normal text-brand-primary',
        className,
        {
          'hidden md:flex': !store?.breadcrumbMobile?.enabled,
        }
      )}
    >
      <span className="flex gap-1.5 items-center">
        <HomeIcon />
        <BCLink
          uri="/"
          name="Home"
          className="  text-brand-primary pr-1.5"
        />
      </span>
      {renderDefaultBreadcrumbs()}
      {renderProductBreadcrumbs()}
      {renderShopPagesBreadcrumbs()}
      {renderSecondaryPagesBreadcrumbs()}
    </div>
  );
};
