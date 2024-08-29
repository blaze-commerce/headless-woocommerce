import { isEmpty } from 'lodash';
import { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Glider from 'react-glider';
import dynamic from 'next/dynamic';

import { ArrowLeft2 } from '@src/components/svg/arrow-left-2';
import { ArrowRight2 } from '@src/components/svg/arrow-right-2';
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
          <div className="flex justify-between items-center gap-2 mb-4">
            <h2
              id={id}
              className={cn(
                'text-[#746A5F] text-xl sm:text-2xl shrink-0',
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
            <hr className="w-full  border-top border-[#E4E5E7] border-t-[1px]" />
            <div className="flex gap-2">
              <div
                ref={leftArrow}
                className={cn('cursor-pointer p-2 rounded-lg border-[1px] border-[#e7e7e7]', {
                  hidden: isLeftArrowMobileHidden && isMobile,
                  'md:hidden': isLeftArrowHidden && !isMobile,
                })}
                onClick={onLeftArrowClick}
              >
                <ArrowLeft2 />
              </div>
              <div
                ref={rightArrow}
                className={cn('cursor-pointer p-2 rounded-lg border-[1px] border-[#e7e7e7]', {
                  hidden: isRightArrowMobileHidden && isMobile,
                  'md:hidden': isRightArrowHidden && !isMobile,
                })}
                onClick={onRightArrowClick}
              >
                <ArrowRight2 />
              </div>
            </div>
          </div>
          <div className={cn('w-full h-auto block relative', settings?.productCardShapeClasses)}>
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
                    saleBadgeColor="#393939"
                    saleBadgeType={4}
                  />
                );
              })}
            </Glider>
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
