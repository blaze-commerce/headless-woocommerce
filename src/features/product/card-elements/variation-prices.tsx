import { Product } from '@src/models/product';
import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import { min, max, find } from 'lodash';
import { numberFormat } from '@src/lib/helpers/product';

interface ICardVariationPrices {
  detailsAlignment?: 'left' | 'center' | 'right';
  isOnSale?: boolean;
}

interface IVariationPriceRange {
  product: Product;
  isOnSale?: boolean;
  currentCurrency: string;
}

const getVariationPriceRange = (props: IVariationPriceRange) => {
  const { product, currentCurrency, isOnSale = false } = props;
  const pricesArray = product?.variations?.map(
    (variation) => variation.price && variation.price[currentCurrency]
  );
  const regularPrice = product?.variations?.map(
    (variation) => variation.regularPrice && variation.regularPrice[currentCurrency]
  );
  const evaluateOnSale = isOnSale || !!find(product?.variations, ['onSale', true]);

  return {
    min: min(pricesArray) ?? 0,
    max: max(pricesArray) ?? 0,
    minBefore: evaluateOnSale ? min(regularPrice) : undefined,
    maxBefore: evaluateOnSale ? max(regularPrice) : undefined,
  };
};

export const CardVariationPrices = (props: ICardVariationPrices) => {
  const { detailsAlignment, isOnSale = false } = props;
  const { product } = useProductContext();
  const { currentCurrency } = useSiteContext();

  if (!product) return null;

  const { min, max, minBefore } = getVariationPriceRange({ product, currentCurrency });
  let display;
  if (min == max) {
    display = numberFormat(min);
  } else {
    display = `${numberFormat(min)} - ${numberFormat(max)}`;
  }
  return (
    <p className={`relative text-${detailsAlignment} font-semibold text-base text-[#4A5468]`}>
      {isOnSale && minBefore && (
        <span className="text-[#717D96] font-normal line-through mr-1">
          {numberFormat(minBefore)}
        </span>
      )}
      {`${display} ${currentCurrency}`}
    </p>
  );
};
