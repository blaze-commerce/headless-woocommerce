import { ReactElement, Fragment } from 'react';
import { cn } from '@src/lib/helpers/helper';
import { useSiteContext } from '@src/context/site-context';
import { formatPrice } from '@src/lib/helpers/helper';
import { Product } from '@src/models/product';

type TSimplePrice = {
  product: Product;
  isTaxExclusive: boolean;
};

export const SimplePrice = ({ product, isTaxExclusive }: TSimplePrice) => {
  const { currentCurrency: currency } = useSiteContext();
  const { price, regularPrice, salePrice } = product;
  const isOnSale = product.onSale && (product.salePrice?.[currency] as number) > 0;

  const renderedResult: ReactElement[] = [];

  if (isOnSale && salePrice) {
    renderedResult.push(<span className="sale-price">{formatPrice(regularPrice, currency)}</span>);
  }

  if (isTaxExclusive) {
    renderedResult.push(<span className="price">{formatPrice(price, currency)}</span>);
  } else {
    renderedResult.push(
      <span className="price">{formatPrice(product.metaData?.priceWithTax, currency)}</span>
    );
  }

  return (
    <span className="simple-product-price">
      {renderedResult.map((price, i) => {
        return <Fragment key={`simple-product-price-${i}`}>{price}</Fragment>;
      })}
    </span>
  );
};
