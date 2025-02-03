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
      className="flex gap-4 lg:flex-col justify-start group cursor-pointer mb-2.5 hover:bg-[#F2F2F2]"
    >
      <div>
        <div className="w-[63px] h-[55px] lg:w-[173px] lg:h-[173px]  overflow-hidden  group-hover:opacity-75 ml-1">
          {thumbnail?.src ? (
            <Image
              src={thumbnail.src}
              alt={decode(thumbnail.altText)}
              className="w-full h-full object-center object-cover border rounded-lg"
              width={253}
              height={280}
            />
          ) : (
            <Image
              src={emptyImagePlaceholder}
              alt="Thumbnail"
              width={253}
              height={280}
              className="h-full w-full p-2.5 bg-gray-200 object-contain object-center border rounded-lg"
            />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p className={cn('mb-1 mt-0.5 text-[#000180] text-sm font-bold leading-[21px]')}>
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
                >
                  {formatPrice(hit.salePrice, currentCurrency)}
                </span>
              </>
            ) : (
              <>
                <span className="text-[#333333] text-sm font-bold  leading-none">
                  {formatPrice(
                    settings?.isTaxExclusive ? hit.price : hit.metaData?.priceWithTax,
                    currentCurrency
                  )}
                </span>
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
