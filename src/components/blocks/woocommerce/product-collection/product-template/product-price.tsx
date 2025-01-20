import { ParsedBlock } from '@src/components/blocks';
import { CartItemGlobalProps } from '@src/components/blocks/woocommerce/product-collection/product-template/cart-item';
import { useContentContext } from '@src/context/content-context';
import { useSiteContext } from '@src/context/site-context';
import { BlockAttributes } from '@src/lib/block/types';
import { cn, formatPrice, getCurrencySymbol, removeCurrencySymbol } from '@src/lib/helpers/helper';
import { ProductCartItem } from '@src/lib/hooks/cart';
import { Product } from '@src/models/product';

type WooCommerceProductPriceTemplateProps = {
  block: ParsedBlock;
};

export const WooCommerceProductPriceTemplate = ({
  block,
}: WooCommerceProductPriceTemplateProps) => {
  const { type, data } = useContentContext();
  const { currentCurrency, settings } = useSiteContext();

  if (!data) {
    return null;
  }

  const attribute = block.attrs as BlockAttributes;

  if ('product-cart-item' === type) {
    const { cartItem, loading } = data as CartItemGlobalProps;
    if (loading) {
      return <div className="w-28 h-4 bg-gray-300"></div>;
    }
    return (
      <span
        className={cn(
          'minicart-item-price font-bold text-black/80 text-sm mb-2 block',
          attribute.className
        )}
      >
        {getCurrencySymbol(currentCurrency)}
        {removeCurrencySymbol(currentCurrency, `${cartItem.price}`)}
      </span>
    );
  }

  if ('product' !== type) {
    return null;
  }
  const product = data as Product;
  const price = settings?.isTaxExclusive ? product.price : product.metaData?.priceWithTax;

  return (
    <span className={cn('price', attribute.className)}>{formatPrice(price, currentCurrency)}</span>
  );
};
