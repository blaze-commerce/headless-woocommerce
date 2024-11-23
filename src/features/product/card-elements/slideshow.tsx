import Glider from 'react-glider';
import { Product } from '@src/models/product';
import Image from 'next/image';
import type { Image as ImageType } from '@models/product/types';
import { RawLink } from '@src/components/common/raw-link';
import { seoUrlParser } from '@src/components/page-seo';

type ISlideshow = {
  product: Product;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gliderRef: React.RefObject<any>;
};

export const CardSlideshow: React.FC<ISlideshow> = (props) => {
  const { product, gliderRef } = props;

  if (!product) return null;

  if (!product.galleryImages) return null;

  //remove the first image from the gallery images
  const galleryImages = product.galleryImages.slice(1);

  const productLink = seoUrlParser(product?.permalink || '');

  return (
    <div className="product-variant-image-holder">
      <Glider
        draggable={false}
        slidesToShow={1}
        slidesToScroll={1}
        ref={gliderRef}
      >
        {galleryImages &&
          galleryImages.map((image: ImageType, key) => (
            <figure key={`gallery-image-${key}`}>
              <RawLink
                href={productLink}
                title={product.name}
              >
                <Image
                  src={image.src}
                  alt={String(image.altText)}
                  title={image.title}
                  width={400}
                  height={400}
                  className="product-image"
                />
              </RawLink>
            </figure>
          ))}
      </Glider>
    </div>
  );
};
