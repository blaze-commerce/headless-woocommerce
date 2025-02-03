import { ReactElement, Fragment } from 'react';
import { cn } from '@src/lib/helpers/helper';
import { useSiteContext } from '@src/context/site-context';
import { formatPrice } from '@src/lib/helpers/helper';
import { Product } from '@src/models/product';

type TBundlePrice = {
  product: Product;
  isTaxExclusive: boolean;
};

export const BundlePrice = ({ product, isTaxExclusive }: TBundlePrice) => {
  const { currentCurrency: currency } = useSiteContext();
  const { regularPrice, salePrice } = product;
  const isOnSale = product.onSale && (product.salePrice?.[currency] as number) > 0;

  const renderedResult: ReactElement[] = [];

  if (isOnSale && salePrice) {
    renderedResult.push(<span className="sale-price">{formatPrice(regularPrice, currency)}</span>);
  }

  if (isTaxExclusive) {
    renderedResult.push(
      <span className="price">{formatPrice(product.metaData?.priceWithTax, currency)}</span>
    );
  } else if (product.bundleHasSameMinMaxPrice(currency)) {
    renderedResult.push(
      <span className="price">{formatPrice(product.bundle?.minPrice, currency)}</span>
    );
  } else {
    renderedResult.push(
      <span className="price">From {formatPrice(product.bundle?.minPrice, currency)}</span>
    );
  }

  return (
    <span className="bundle-product-price">
      {renderedResult.map((price, i) => {
        return <Fragment key={`bundle-product-price-${i}`}>{price}</Fragment>;
      })}
    </span>
  );
};
