import { ReactElement, Fragment } from 'react';
import { useSiteContext } from '@src/context/site-context';
import { formatPrice } from '@src/lib/helpers/helper';
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
        renderedResult.push(<span className="price">{formatPrice(salePrice, currency)}</span>);
      } else {
        renderedResult.push(
          <span className="price">{formatPrice(product.metaData?.priceWithTax, currency)}</span>
        );
      }
    } else {
      let price = product.variantMinPriceWithTax;
      if (isTaxExclusive) {
        price = product.variantMinPrice;
      }
      renderedResult.push(<span className="price">{formatPrice(price, currency)}</span>);
    }

    // variable product with different min and max price
  } else {
    let minPrice = product.variantMinPriceWithTax;
    let maxPrice = product.variantMaxPriceWithTax;

    if (isTaxExclusive) {
      minPrice = product.variantMinPrice;
      maxPrice = product.variantMaxPrice;
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
