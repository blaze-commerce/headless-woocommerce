import { decode } from 'html-entities';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

import { useSiteContext } from '@src/context/site-context';
import { numberFormat } from '@src/lib/helpers/product';
import { emptyImagePlaceholder } from '@src/lib/constants/image';
import { cn, formatPrice } from '@src/lib/helpers/helper';
import { ITSImage } from '@src/lib/typesense/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProductHit = ({ hit }: any) => {
  const { push, prefetch } = useRouter();
  const { currentCurrency, currentCountry, settings } = useSiteContext();
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;
  // TODO: Use seoUrlParser

  const productLink = hit.permalink;
  const thumbnail: ITSImage = hit.thumbnail;

  const isOnSale = hit.onSale && parseFloat(hit?.salePrice[currentCurrency]) > 0;
  const isFree = parseFloat(hit.price[currentCurrency]) === 0;

  const handleMouseEnter = () => {
    prefetch(`/${currentCountry}${productLink}`);
  };

  const handleMouseClick = () => {
    push(`/${currentCountry}${productLink}`, productLink + '#top');
  };

  useEffect(() => {
    if (isVisible) {
      prefetch(`/${currentCountry}${productLink}`);
    }
  }, [isVisible, productLink, currentCountry, prefetch]);

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onClick={handleMouseClick}
      className="flex gap-4 justify-start group cursor-pointer mb-2.5 hover:bg-[#F2F2F2]"
    >
      <div>
        <div className="w-[63px] h-[55px] overflow-hidden bg-gray-200 group-hover:opacity-75 ml-1">
          {thumbnail?.src ? (
            <Image
              src={thumbnail.src}
              alt={decode(thumbnail.altText)}
              className="w-full h-full object-center object-cover rounded-lg"
              width={253}
              height={280}
            />
          ) : (
            <Image
              src={emptyImagePlaceholder}
              alt="Thumbnail"
              width={253}
              height={280}
              className="h-full w-full p-2.5 bg-gray-200 object-contain object-center rounded-lg"
            />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p
          className={cn('mb-1 text-xs xl:text-sm mt-0.5', {
            'text-[#303030]': !settings?.search?.results?.customColors?.enabled,
          })}
        >
          {decode(hit.name)}
        </p>
        {!isFree && (
          <p>
            {isOnSale ? (
              <>
                <span
                  className={cn('line-through', {
                    'text-gray-400': !settings?.search?.results?.salePrice?.font?.color,
                    'font-bold': !settings?.search?.results?.salePrice?.font?.weight,
                    'text-xs': !settings?.search?.results?.salePrice?.font?.size,
                  })}
                  style={{
                    color: settings?.search?.results?.salePrice?.font?.color,
                    fontWeight: settings?.search?.results?.salePrice?.font?.weight ?? '',
                    fontSize: settings?.search?.results?.salePrice?.font?.size ?? '',
                  }}
                >
                  {formatPrice(hit.regularPrice, currentCurrency)}
                </span>
                <span
                  className={cn('ml-1', {
                    'text-gray-400': !settings?.search?.results?.price?.font?.color,
                    'font-bold': !settings?.search?.results?.price?.font?.weight,
                    'text-xs': !settings?.search?.results?.price?.font?.size,
                  })}
                  style={{
                    color: settings?.search?.results?.price?.font?.color,
                    fontWeight: settings?.search?.results?.price?.font?.weight ?? '',
                    fontSize: settings?.search?.results?.price?.font?.size ?? '',
                  }}
                >
                  {formatPrice(hit.salePrice, currentCurrency)}
                </span>
              </>
            ) : (
              <>
                {settings?.isTaxExclusive ? (
                  <span
                    className={cn({
                      'text-[#585858]': !settings?.search?.results?.customColors?.enabled,
                    })}
                    style={{ color: settings?.search?.results?.customColors?.color ?? '' }}
                  >
                    {formatPrice(hit.metaData?.priceWithTax, currentCurrency)}
                  </span>
                ) : (
                  <span
                    className={cn({
                      'text-[#585858]': !settings?.search?.results?.customColors?.enabled,
                    })}
                    style={{ color: settings?.search?.results?.customColors?.color ?? '' }}
                  >
                    {formatPrice(hit.price, currentCurrency)}
                  </span>
                )}
              </>
            )}

            {settings?.store?.woocommerceCalcTaxes &&
              settings.store.woocommercePricesIncludeTax && (
                <span className="text-[#585858]"> inc GST (AU only)</span>
              )}
          </p>
        )}
      </div>
    </div>
  );
};
