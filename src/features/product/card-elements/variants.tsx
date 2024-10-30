import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Product } from '@src/models/product';
import { cn } from '@src/lib/helpers/helper';

type ICardVariants = {
  variants: Product[];
  detailsAlignment: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gliderRef: React.RefObject<any>;
};

export const CardVariants: React.FC<ICardVariants> = (props) => {
  const { variants, detailsAlignment = 'left', gliderRef } = props;
  const [displayedVariants, setDisplayedVariants] = useState<Product[]>(variants);
  const [displayMore, setDisplayMore] = useState(variants.length > 4);

  useEffect(() => {
    if (variants.length > 4) {
      setDisplayMore(true);
    }
  }, [variants]);

  useEffect(() => {
    if (displayMore) {
      setDisplayedVariants(variants.slice(0, 4));
    } else {
      setDisplayedVariants(variants);
    }
  }, [displayMore, variants]);

  if (variants.length === 0) return null;

  return (
    <div className={cn('product-variants', `justify-${detailsAlignment}`)}>
      {displayedVariants.map(
        (variant, key) =>
          variant?.thumbnail && (
            <button
              key={`product-variant-${variant.id}-${key}`}
              type="button"
              className="z-10"
              onClick={() => {
                gliderRef?.current?.scrollItem(key);
              }}
            >
              <Image
                src={variant?.thumbnail?.src}
                alt={String(variant?.name)}
                title={variant?.name}
                width={34}
                height={34}
                className="product-variant-image"
              />
            </button>
          )
      )}
      {displayMore && (
        <span
          className="product-variants-more"
          onClick={() => setDisplayMore(false)}
        >
          +{variants.length - 4}
        </span>
      )}
    </div>
  );
};
