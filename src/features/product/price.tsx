import { CSSProperties, Fragment } from 'react';

import { Product } from '@src/models/product';
import { cn, formatPrice } from '@src/lib/helpers/helper';

type Props = {
  currency: string;
  product: Product;
  style?: CSSProperties;
  className?: string;
  isTaxExclusive?: boolean;
};

export const Price: React.FC<Props> = ({ product, currency, isTaxExclusive = true, className }) => {
  if (!product) return null;

  const { price, regularPrice, salePrice } = product;
  const isOnSale = product.onSale && (product.salePrice?.[currency] as number) > 0;

  const renderSimpleProductPrice = () => {
    if (product.isFree(currency)) return null;

    const renderedResult = [];

    if (isOnSale && salePrice) {
      renderedResult.push(
        <span className="sale-price">{formatPrice(regularPrice, currency)}</span>
      );
    }

    if (isTaxExclusive) {
      renderedResult.push(
        <span className="price">{formatPrice(product.metaData?.priceWithTax, currency)}</span>
      );
    } else {
      renderedResult.push(<span className="price">{formatPrice(price, currency)}</span>);
    }

    return renderedResult.map((price, i) => {
      return <Fragment key={`simple-product-price-${i}`}>{price}</Fragment>;
    });
  };

  const renderVariableProductPrice = () => {
    const renderedResult = [];

    // variable product with same min and max price
    if (product.hasSameMinMaxPrice(currency)) {
      // variable product with same min and max price on sale
      if (isOnSale && salePrice) {
        renderedResult.push(
          <span className="sale-price">{formatPrice(regularPrice, currency)}</span>
        );

        if (isTaxExclusive) {
          renderedResult.push(
            <span className="price">{formatPrice(product.metaData?.priceWithTax, currency)}</span>
          );
        } else {
          renderedResult.push(<span className="price">{formatPrice(salePrice, currency)}</span>);
        }
      } else {
        let price = product.variantMinPrice;
        if (isTaxExclusive) {
          price = product.variantMinPriceWithTax;
        }
        renderedResult.push(<span className="price">{formatPrice(price, currency)}</span>);
      }

      // variable product with different min and max price
    } else {
      let minPrice = product.variantMinPrice;
      let maxPrice = product.variantMaxPrice;

      if (isTaxExclusive) {
        minPrice = product.variantMinPriceWithTax;
        maxPrice = product.variantMaxPriceWithTax;
      }

      renderedResult.push(
        <span className="price">
          {formatPrice(minPrice, currency)} – {formatPrice(maxPrice, currency)}
        </span>
      );
    }

    return renderedResult.map((price, i) => {
      return <Fragment key={`variable-product-price-${i}`}>{price}</Fragment>;
    });
  };

  return (
    <div className={cn('price', className)}>
      <span>
        {product.hasVariations ? renderVariableProductPrice() : renderSimpleProductPrice()}
      </span>
      <span className="text-sm w-full md:w-auto text-brand-primary">inc GST (AU only)</span>
    </div>
  );
};
