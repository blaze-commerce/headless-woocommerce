import Glider from 'react-glider';
import { Product } from '@src/models/product';
import Image from 'next/image';

type ICardVariantImages = {
  variants: Product[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gliderRef: React.RefObject<any>;
};

export const CardVariantImages: React.FC<ICardVariantImages> = (props) => {
  const { variants, gliderRef } = props;

  if (!variants || variants.length === 0) return null;

  return (
    <div className="product-variant-image-holder">
      <Glider
        draggable={false}
        slidesToShow={1}
        slidesToScroll={1}
        ref={gliderRef}
      >
        {variants.map((variant, key) => (
          <figure key={`product-variant-${variant.id}-${key}`}>
            {variant?.thumbnail && (
              <Image
                src={variant?.thumbnail?.src}
                alt={String(variant?.name)}
                title={variant?.name}
                width={398}
                height={616}
                className="product-image"
              />
            )}
          </figure>
        ))}
      </Glider>
    </div>
  );
};
