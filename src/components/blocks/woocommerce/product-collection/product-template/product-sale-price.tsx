import { ParsedBlock } from '@src/components/blocks';
import { CartItemGlobalProps } from '@src/components/blocks/woocommerce/product-collection/product-template/cart-item';
import { useContentContext } from '@src/context/content-context';
import { useSiteContext } from '@src/context/site-context';
import { BlockAttributes } from '@src/lib/block/types';
import { cn, formatPrice, getCurrencySymbol, removeCurrencySymbol } from '@src/lib/helpers/helper';
import { ProductCartItem } from '@src/lib/hooks/cart';
import { Product } from '@src/models/product';

type WooCommerceProductSalePriceTemplateProps = {
  block: ParsedBlock;
};

export const WooCommerceProductSalePriceTemplate = ({
  block,
}: WooCommerceProductSalePriceTemplateProps) => {
  const { type, data } = useContentContext();
  const { currentCurrency } = useSiteContext();

  if (!data) {
    return null;
  }

  const attribute = block.attrs as BlockAttributes;

  if ('product-cart-item' === type) {
    const { cartItem } = data as CartItemGlobalProps;
    if (!cartItem.onSale) {
      return null;
    }

    return (
      <span
        className={cn(
          'minicart-item-price font-bold text-black/80 text-sm mb-2 block',
          attribute.className
        )}
      >
        {getCurrencySymbol(currentCurrency)}
        {removeCurrencySymbol(currentCurrency, `${cartItem.regularPrice}`)}
      </span>
    );
  }

  if ('product' !== type) {
    return null;
  }
  const product = data as Product;

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
