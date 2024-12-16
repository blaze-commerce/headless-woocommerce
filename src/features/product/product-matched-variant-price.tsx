import { CSSProperties, Fragment } from 'react';

import { Product } from '@src/models/product';
import { useSiteContext } from '@src/context/site-context';
import { cn, formatPrice } from '@src/lib/helpers/helper';

type Props = {
  currency: string;
  product: Product;
  style?: CSSProperties;
  className?: string;
  isTaxExclusive?: boolean;
};

export const ProductMatchedVariantPrice: React.FC<Props> = ({
  product,
  currency,
  isTaxExclusive = true,
  className,
}) => {
  const { settings } = useSiteContext();

  if (!product) return null;

  if (product.productType !== 'variation') return null;

  const priceDisplaySuffix = settings?.priceDisplaySuffix || '';

  const { price, regularPrice, salePrice } = product;
  const isOnSale = product.onSale && (product.salePrice?.[currency] as number) > 0;

  if (product.isFree(currency)) return null;

  const renderSimpleProductPrice = () => {
    const renderedResult = [];

    if (isOnSale && salePrice) {
      renderedResult.push(
        <span className="sale-price">{formatPrice(regularPrice, currency)}</span>
      );
    }

    if (isTaxExclusive) {
      renderedResult.push(<span className="price">{formatPrice(price, currency)}</span>);
    } else {
      renderedResult.push(
        <span className="price">{formatPrice(product.metaData?.priceWithTax, currency)}</span>
      );
    }

    return renderedResult.map((price, i) => {
      return <Fragment key={`simple-product-price-${i}`}>{price}</Fragment>;
    });
  };

  return (
    <div className={cn(className)}>
      {renderSimpleProductPrice()}
      {typeof product.stockQuantity !== 'undefined' && product.stockQuantity > 0 && (
        <div className="stock-status">
          <span className="instock">{product.stockQuantity} in stock</span>
        </div>
      )}
      {priceDisplaySuffix && <span className="price-suffix"> {priceDisplaySuffix}</span>}
    </div>
  );
};
