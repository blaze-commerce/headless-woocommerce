import { isEmpty } from 'lodash';
import { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Glider from 'react-glider';
import dynamic from 'next/dynamic';

import { ArrowRoundLeft } from '@components/svg/arrow-round-left';
import { ArrowRoundRight } from '@components/svg/arrow-round-right';
import { useSiteContext } from '@src/context/site-context';
import { Product } from '@src/models/product';
import { Shop } from '@src/models/settings/shop';
import { cn } from '@src/lib/helpers/helper';

const DynamicDefaultProductCard = dynamic(() =>
  import('@src/features/product/cards/default').then((mod) => mod.DefaultProductCard)
);

import { transformProductsForDisplay } from '@src/lib/helpers/product';

interface IProductGridProps {
  id: string;
  products: Product[];
  title?: string;
  style?: string;
}

export const ProductSlides = (props: IProductGridProps) => {
  const { id, title, products, style } = props;
  const { settings } = useSiteContext();
  const { layout, options } = settings?.shop as Shop;
  const leftArrow = useRef(null);
  const rightArrow = useRef(null);
  const [gliderPage, setGliderPage] = useState(1);

  const isLeftArrowHidden = gliderPage === 1;
  const isRightArrowHidden = (products.length as number) / 4 <= gliderPage;

  const isLeftArrowMobileHidden = gliderPage === 1;
  const isRightArrowMobileHidden = (products.length as number) / 2 <= gliderPage;

  const onRightArrowClick = () => {
    setGliderPage((prevState) => prevState + 1);
  };

  const onLeftArrowClick = () => {
    setGliderPage((prevState) => prevState - 1);
  };

  return (
    <>
      {!isEmpty(products) && (
        <section className="mt-7">
          <h2
            id={id}
            className={cn(
              'text-[#303030] text-xl sm:text-2xl text-abc mb-8',
              settings?.productGroupHeaderClasses
            )}
            style={
              !isEmpty(settings?.recentlyViewedAndCrossSellsHeaderStyle)
                ? settings?.recentlyViewedAndCrossSellsHeaderStyle
                : {}
            }
          >
            {title}
          </h2>
          <div className={cn('w-full h-auto block relative', settings?.productCardShapeClasses)}>
            <div
              ref={leftArrow}
              className={cn('absolute z-10 lg:z-[2] top-1/2 -translate-y-4 cursor-pointer', {
                hidden: isLeftArrowMobileHidden && isMobile,
                'md:hidden': isLeftArrowHidden && !isMobile,
              })}
              onClick={onLeftArrowClick}
            >
              <ArrowRoundLeft />
            </div>
            <Glider
              draggable
              hasArrows
              slidesToShow={2}
              slidesToScroll={2}
              responsive={[
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                  },
                },
              ]}
              arrows={{
                prev: leftArrow.current,
                next: rightArrow.current,
              }}
            >
              {transformProductsForDisplay(products).map((data, index: number) => {
                return (
                  <DynamicDefaultProductCard
                    key={index}
                    showRating={true}
                    product={data as Product}
                    {...layout?.productCards}
                    hasAddToCart={options.showAddToCartButton}
                    showWishlistButton={settings?.store?.wishlist?.enabled}
                  />
                );
              })}
            </Glider>
            <div
              ref={rightArrow}
              className={cn('absolute z-10 lg:z-0 top-1/2 -translate-y-4 right-0 cursor-pointer', {
                hidden: isRightArrowMobileHidden && isMobile,
                'md:hidden': isRightArrowHidden && !isMobile,
              })}
              onClick={onRightArrowClick}
            >
              <ArrowRoundRight />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

ProductSlides.defaultProps = {
  title: 'You may also like',
  style: 'default',
};
