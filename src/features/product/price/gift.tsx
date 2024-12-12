import { useSiteContext } from '@src/context/site-context';
import { formatPrice } from '@src/lib/helpers/helper';
import { Product } from '@src/models/product';

type TVariablePrice = {
  product: Product;
  isTaxExclusive: boolean;
};

export const GiftCardPrice = ({ product, isTaxExclusive }: TVariablePrice) => {
  const { currentCurrency: currency } = useSiteContext();
  const { regularPrice, salePrice } = product;
  const isOnSale = product.onSale && (product.salePrice?.[currency] as number) > 0;
  // Product or currency is undefined. Ensure both are properly provided.
  if (!product || !currency) {
    return null;
  }

  const thePrice = product.giftCardPrice;

  if (!thePrice) return null;

  const [minPrice, maxPrice] = thePrice;

  if (minPrice !== maxPrice) {
    return (
      <span className="variable-product-price-container">
        <span className="price">
          {formatPrice(minPrice, currency)} – {formatPrice(maxPrice, currency)}
        </span>
      </span>
    );
  }

  // variable product with same min and max price on sale
  const sameMinMaxPrice = isOnSale && salePrice;
  if (!sameMinMaxPrice) {
    const price = isTaxExclusive ? product.variantMinPrice : product.variantMinPriceWithTax;

    return (
      <span className="variable-product-price-container">
        <span className="price">{formatPrice(price, currency)}</span>
      </span>
    );
  }

  return (
    <span className="gift-card-price-container flex items-center gap-2.5">
      <span className="sale-price">{formatPrice(regularPrice, currency)}</span>
      <span className="price">
        {isTaxExclusive
          ? formatPrice(salePrice, currency)
          : formatPrice(product.metaData?.priceWithTax, currency)}
      </span>
    </span>
  );
};
