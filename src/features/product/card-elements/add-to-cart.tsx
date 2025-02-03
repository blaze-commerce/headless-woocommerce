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
  const { product, hasAddToCart } = props;
  const { currentCurrency } = useSiteContext();

  if (product.isFree(currentCurrency)) return null;

  return (
    <>
      {hasAddToCart &&
        product.productType &&
        ['simple', 'variation', 'variable', 'bundle'].includes(product.productType) && (
          <AddToCartButton product={product} />
        )}
    </>
  );
};
