import { cn } from '@src/lib/helpers/helper';
import { useSiteContext } from '@src/context/site-context';
import { AddToCartButton } from '@src/components/button/add-to-cart-button';
import { Product } from '@src/models/product';

type ICardAddToCart = {
  product: Product;
  hasAddToCart: boolean;
  detailsAlignment: string;
  layout: string;
};

export const CardAddToCart = (props: ICardAddToCart) => {
  const { product, hasAddToCart, detailsAlignment, layout } = props;
  const { currentCurrency } = useSiteContext();

  if (product.isFree(currentCurrency)) return null;

  return (
    <>
      {hasAddToCart && (
        <div
          className={cn('mt-2 mx-auto mb-2', {
            'mx-auto': detailsAlignment === 'center',
            'z-[7]': product.stockStatus === 'instock' && product.productType !== 'variable',
            'z-0': product.stockStatus === 'outofstock' || product.productType === 'variable',
          })}
        >
          {product.productType &&
            ['simple', 'variation', 'variable', 'bundle'].includes(product.productType) && (
              <AddToCartButton
                product={product}
                className={layout === 'secondary' ? 'text-[14px]' : ''}
              />
            )}
        </div>
      )}
    </>
  );
};
