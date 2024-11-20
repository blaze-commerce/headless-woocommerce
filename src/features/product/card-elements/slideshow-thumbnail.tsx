import Image from 'next/image';
import { Image as ImageType } from '@models/product/types';
import { useState, useEffect } from 'react';
import { Product } from '@src/models/product';
import { cn } from '@src/lib/helpers/helper';
import { v4 } from 'uuid';

type ICardGalleryThumbnail = {
  product: Product;
  detailsAlignment: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gliderRef: React.RefObject<any>;
};

export const CardGalleryThumbnail: React.FC<ICardGalleryThumbnail> = (props) => {
  const { product, detailsAlignment = 'left', gliderRef } = props;
  const [displayedImages, setDisplayedImages] = useState<ImageType[]>([]);
  const [displayMore, setDisplayMore] = useState(false);

  useEffect(() => {
    if (product?.galleryImages && product.galleryImages.length > 4) {
      setDisplayMore(true);
    }

    setDisplayedImages(product?.galleryImages ?? []);
  }, [product]);

  useEffect(() => {
    if (displayMore) {
      setDisplayedImages(product?.galleryImages ? product.galleryImages.slice(0, 4) : []);
    } else {
      setDisplayedImages(product?.galleryImages ?? []);
    }
  }, [displayMore, product.galleryImages]);

  if (!product?.galleryImages || product.galleryImages.length <= 1) return null;

  return (
    <div className={cn('product-variants', `justify-${detailsAlignment}`)}>
      {displayedImages.map(
        (image, key) =>
          image?.src && (
            <button
              key={`product-image-${image.id}-${key}`}
              type="button"
              onClick={() => {
                gliderRef?.current?.scrollItem(key);
              }}
            >
              <Image
                src={image?.src}
                alt={String(image?.altText)}
                title={image?.title}
                width={34}
                height={34}
                className="product-image-image"
              />
            </button>
          )
      )}
      {displayMore && (
        <span
          className="product-images-more"
          onClick={() => setDisplayMore(false)}
        >
          +{product.galleryImages.length - 4}
        </span>
      )}
    </div>
  );
};
