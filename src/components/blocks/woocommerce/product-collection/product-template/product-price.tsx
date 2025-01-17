import { ParsedBlock } from '@src/components/blocks';
import { useContentContext } from '@src/context/content-context';
import { useSiteContext } from '@src/context/site-context';
import { BlockAttributes } from '@src/lib/block/types';
import { cn, formatPrice } from '@src/lib/helpers/helper';
import { Product } from '@src/models/product';

type WooCommerceProductPriceTemplateProps = {
  block: ParsedBlock;
};

export const WooCommerceProductPriceTemplate = ({
  block,
}: WooCommerceProductPriceTemplateProps) => {
  const { type, data } = useContentContext();
  const { currentCurrency, settings } = useSiteContext();

  if (!data || 'product' !== type) {
    return null;
  }

  const product = data as Product;
  const attribute = block.attrs as BlockAttributes;
  const price = settings?.isTaxExclusive ? product.price : product.metaData?.priceWithTax;

  return (
    <span className={cn('price', attribute.className)}>{formatPrice(price, currentCurrency)}</span>
  );
};
