import { Dictionary } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Glider from 'react-glider';

import { ArrowRoundLeft } from '@components/svg/arrow-round-left';
import { ArrowRoundRight } from '@components/svg/arrow-round-right';
import { DefaultProductCard as ProductCard } from '@src/features/product/cards/default';
import { useSiteContext } from '@src/context/site-context';
import { Product } from '@src/models/product';
import { transformProductsForDisplay } from '@src/lib/helpers/product';
import { cn } from '@src/lib/helpers/helper';

type Props = {
  products: Required<Product>[];
  config?: Dictionary<string>;
  classes?: string;
};

export const FeaturedProducts = ({ products, config, classes }: Props) => {
  const { settings } = useSiteContext();
  const { layout, options } = settings?.shop || {};
  const leftArrow = useRef(null);
  const rightArrow = useRef(null);
  // const { settings } = useSiteContext();
  const cardCount = products?.length;
  const [gliderPage, setGliderPage] = useState(1);

  const isLeftArrowHidden = gliderPage === 1;
  const isRightArrowHidden = products.length / 4 <= gliderPage;

  const isLeftArrowMobileHidden = gliderPage === 1;
  const isRightArrowMobileHidden = products.length / 2 <= gliderPage;

  const mobileSlidesToShow =
    parseInt(settings?.homepage?.layout?.featuredProducts?.mobileSlidesToShow as string, 10) ?? 2;

  let slidesToShow = cardCount > 4 ? 5 : 4;

  if (settings?.homepage?.layout?.featuredProducts?.slidesToShow) {
    slidesToShow =
      parseInt(settings?.homepage?.layout?.featuredProducts?.slidesToShow as string, 10) ?? 4;
  }

  if (!isEmpty(config?.slidesToShow)) {
    slidesToShow = parseInt(config?.slidesToShow as string, 10);
  }

  const containerClass = cn(config?.containerClass);

  const onRightArrowClick = () => {
    setGliderPage((prevState) => prevState + 1);
  };

  const onLeftArrowClick = () => {
    setGliderPage((prevState) => prevState - 1);
  };

  const renderProductCards = () => {
    return (
      <>
        {transformProductsForDisplay(products).map((product) => {
          return (
            <ProductCard
              product={product}
              key={product.id}
              {...layout?.productCards}
              hasAddToCart={options?.showAddToCartButton}
              showWishlistButton={settings?.store?.wishlist?.enabled}
            />
          );
        })}
      </>
    );
  };

  return (
    <div className={containerClass}>
      <div
        className={cn(
          classes,
          'featured-products-slider w-full h-auto block relative',
          settings?.productCardShapeClasses
        )}
      >
        <div
          ref={leftArrow}
          className={cn(
            'absolute z-10 lg:z-[2] top-1/2 -translate-y-4 cursor-pointer ml-2 md:ml-4 opacity-70 hover:opacity-100',
            {
              hidden: isLeftArrowMobileHidden && isMobile,
              'md:hidden': isLeftArrowHidden && !isMobile,
            }
          )}
          onClick={onLeftArrowClick}
        >
          <ArrowRoundLeft />
        </div>

        <Glider
          draggable
          hasArrows
          hasDots={settings?.homepage?.layout?.featuredProducts?.hasDots}
          slidesToShow={mobileSlidesToShow}
          slidesToScroll={mobileSlidesToShow}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: slidesToShow,
                slidesToScroll: slidesToShow,
              },
            },
          ]}
          arrows={{
            prev: leftArrow.current,
            next: rightArrow.current,
          }}
        >
          {renderProductCards()}
        </Glider>
        <div
          ref={rightArrow}
          className={cn(
            'absolute z-10 lg:z-0 top-1/2 -translate-y-4 right-0 cursor-pointer mr-2 md:mr-4 opacity-70 hover:opacity-100',
            {
              hidden: isRightArrowMobileHidden && isMobile,
              'md:hidden': isRightArrowHidden && !isMobile,
            }
          )}
          onClick={onRightArrowClick}
        >
          <ArrowRoundRight />
        </div>
      </div>
    </div>
  );
};
