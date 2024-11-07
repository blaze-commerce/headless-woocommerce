import Glider from 'react-glider';
import { Product } from '@src/models/product';
import Image from 'next/image';
import type { Image as ImageType } from '@models/product/types';

type ISlideshow = {
  product: Product;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gliderRef: React.RefObject<any>;
};

export const CardSlideshow: React.FC<ISlideshow> = (props) => {
  const { product, gliderRef } = props;

  if (!product) return null;

  return (
    <div className="product-variant-image-holder">
      <Glider
        draggable={false}
        slidesToShow={1}
        slidesToScroll={1}
        ref={gliderRef}
      >
        {product?.galleryImages &&
          product?.galleryImages.map((image: ImageType, key) => (
            <figure key={`gallery-image-${key}`}>
              <Image
                src={image.src}
                alt={String(image.altText)}
                title={image.title}
                width={398}
                height={616}
                className="product-image"
              />
            </figure>
          ))}
      </Glider>
    </div>
  );
};
