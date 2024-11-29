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
  const { id, title, products } = props;
  const { settings } = useSiteContext();
  const { layout } = settings?.shop as Shop;
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
        <section className="related-products product-slider">
          <div className="title-holder">
            <h2
              id={id}
              className={cn('title')}
            >
              {title}
            </h2>
            <hr />
            <div className="button-holder">
              <button
                type="button"
                ref={leftArrow}
                className={cn('', {
                  hidden: isLeftArrowMobileHidden && isMobile,
                  'md:hidden': isLeftArrowHidden && !isMobile,
                })}
                onClick={onLeftArrowClick}
              >
                <ArrowLeft2 />
              </button>
              <button
                type="button"
                ref={rightArrow}
                className={cn('', {
                  hidden: isRightArrowMobileHidden && isMobile,
                  'md:hidden': isRightArrowHidden && !isMobile,
                })}
                onClick={onRightArrowClick}
              >
                <ArrowRight2 />
              </button>
            </div>
          </div>
          <div className={cn('slide-holder', settings?.productCardShapeClasses)}>
            <Glider
              draggable
              hasArrows
              slidesToShow={2}
              slidesToScroll={2}
              responsive={[
                {
                  breakpoint: 1025,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
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
                    hasAddToCart={false}
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
