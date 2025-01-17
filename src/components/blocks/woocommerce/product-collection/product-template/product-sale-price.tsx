import { ParsedBlock } from '@src/components/blocks';
import { useContentContext } from '@src/context/content-context';
import { useSiteContext } from '@src/context/site-context';
import { BlockAttributes } from '@src/lib/block/types';
import { cn, formatPrice } from '@src/lib/helpers/helper';
import { Product } from '@src/models/product';

type WooCommerceProductSalePriceTemplateProps = {
  block: ParsedBlock;
};

export const WooCommerceProductSalePriceTemplate = ({
  block,
}: WooCommerceProductSalePriceTemplateProps) => {
  const { type, data } = useContentContext();
  const { currentCurrency } = useSiteContext();

  if (!data || 'product' !== type) {
    return null;
  }

  const product = data as Product;
  const attribute = block.attrs as BlockAttributes;

  const isOnSale = product.onSale && (product.salePrice?.[currentCurrency] as number) > 0;

  if (!isOnSale || !product.salePrice) {
    return null;
  }

  return (
    <span className={cn('sale-price', attribute.className)}>
      {formatPrice(product.regularPrice, currentCurrency)}
    </span>
  );
};
