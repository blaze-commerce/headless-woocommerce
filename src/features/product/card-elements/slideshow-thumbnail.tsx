import Image from 'next/image';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Product } from '@src/models/product';
import { cn } from '@src/lib/helpers/helper';

type ICardGalleryThumbnail = {
  product: Product;
  detailsAlignment: string;
  setShowImageVariant: Dispatch<SetStateAction<string>>;
};

export const CardGalleryThumbnail: React.FC<ICardGalleryThumbnail> = (props) => {
  const { product, detailsAlignment = 'left', setShowImageVariant } = props;
  const [displayMore, setDisplayMore] = useState(true);
  const images = product?.variableImages;

  useEffect(() => {
    if (images && Object.keys(images).length <= 4) {
      setDisplayMore(false);
    }
  }, [images]);

  if (!images || Object.keys(images).length <= 1) return null;

  return (
    <div
      className={cn('product-variants', `justify-${detailsAlignment}`, {
        'display-more': displayMore,
        'hide-more': !displayMore,
      })}
    >
      {Object.keys(images).map((key) => {
        const image = images[key];
        return (
          <button
            key={`product-button-image-${image.id}-${key}`}
            type="button"
            onClick={() => setShowImageVariant(key)}
          >
            <Image
              src={image?.src}
              alt={String(image?.altText)}
              title={image?.title}
              width={34}
              height={34}
              priority={true}
              className="product-thumb-image"
            />
          </button>
        );
      })}
      {displayMore && (
        <span
          className="product-images-more"
          onClick={() => setDisplayMore(false)}
        >
          +{Object.keys(images).length - 4}
        </span>
      )}
    </div>
  );
};
