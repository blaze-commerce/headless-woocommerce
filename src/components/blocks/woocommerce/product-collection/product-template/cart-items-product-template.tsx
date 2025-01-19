import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { RecentlyViewedProductCollection } from '@src/components/blocks/woocommerce/product-collection/recently-viewed';
import { useContentContext } from '@src/context/content-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { transformProductsForDisplay } from '@src/lib/helpers/product';
import { ProductCartItem } from '@src/lib/hooks/cart';
import { Product } from '@src/models/product';

type CartItemsProductTemplateProps = {
  block: ParsedBlock;
};

export const CartItemsProductTemplate = ({ block }: CartItemsProductTemplateProps) => {
  const { type, data } = useContentContext();
  if ('woocommerce/product-template' !== block.blockName || !data) {
    return null;
  }

  if ('product-cart-items' === type) {
    const cartItems = data as ProductCartItem[];
    const attributes = block.attrs as BlockAttributes;

    return cartItems.map((cartItem, index: number) => {
      const isCartItemTypeComposite = cartItem.cartItemType === 'CompositeCartItem';
      const productType = cartItem.type.toLowerCase();
      const isSimple = productType === 'simple';
      const isComposite = productType === 'composite';

      const isCompositeChildren = isSimple && isCartItemTypeComposite;
      const isCompositeParent = isComposite && isCartItemTypeComposite;

      return (
        <div
          key={cartItem.productId}
          className={cn(
            'flex w-full pb-4 items-start',
            {
              '-mt-5 flex-wrap': isCompositeChildren,
              'border-b': !isCompositeChildren && !isCompositeParent,
              'space-x-4': !isCompositeChildren,
            },
            attributes.className
          )}
        >
          <Content
            key={index}
            type="product-cart-item"
            globalData={cartItem}
            content={block.innerBlocks}
          />
        </div>
      );
    });
  }

  //@TODO Handle the default product collection
  return <div>cart items product template not implemented</div>;
};
