import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { CartItemsProductTemplate } from '@src/components/blocks/woocommerce/product-collection/product-template/cart-items-product-template';
import { useContentContext } from '@src/context/content-context';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { transformProductsForDisplay } from '@src/lib/helpers/product';
import { Product } from '@src/models/product';

type WooCommerceProductTemplateProps = {
  block: ParsedBlock;
};

export const WooCommerceProductTemplate = ({ block }: WooCommerceProductTemplateProps) => {
  const { type, data } = useContentContext();
  if ('woocommerce/product-template' !== block.blockName || !data) {
    return null;
  }

  if ('products' === type) {
    const products = data as Product[];
    const attributes = block.attrs as BlockAttributes;
    return transformProductsForDisplay(products)
      .slice(-2)
      .map((product, index: number) => (
        <div
          key={product.id}
          className={cn('product-card', `product-${product.id}`, attributes.className, {
            'is-variable': product.hasVariations,
            'is-simple': product.isSimple,
            'is-on-sale': product.isOnSale,
            'is-composite': product.isComposite,
            'is-bundle': product.hasBundle,
            'is-gift-card': product.isGiftCard,
            'is-out-of-stock': product.isOutOfStock,
          })}
        >
          <Content
            key={index}
            type="product"
            globalData={product}
            content={block.innerBlocks}
          />
        </div>
      ));
  }

  if ('product-cart-items' === type) {
    return <CartItemsProductTemplate block={block} />;
  }

  //@TODO Handle the default product collection
  return <div>product template not implemented</div>;
};
