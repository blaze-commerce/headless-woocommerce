import { ReactElement, Fragment } from 'react';
import { useSiteContext } from '@src/context/site-context';
import { cn, formatPrice } from '@src/lib/helpers/helper';
import { Product } from '@src/models/product';

type TVariablePrice = {
  product: Product;
  isTaxExclusive: boolean;
};

export const VariablePrice = ({ product, isTaxExclusive }: TVariablePrice) => {
  const { currentCurrency: currency } = useSiteContext();
  const renderedResult: ReactElement[] = [];
  const { regularPrice, salePrice } = product;
  const isOnSale = product.onSale && (product.salePrice?.[currency] as number) > 0;

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

  return (
    <span className="variable-product-price-container">
      {renderedResult.map((price, i) => {
        return <Fragment key={`variable-product-price-${i}`}>{price}</Fragment>;
      })}
    </span>
  );
};
