import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { CartItemGlobalProps } from '@src/components/blocks/woocommerce/product-collection/product-template/cart-item';
import { RecentlyViewedProductCollection } from '@src/components/blocks/woocommerce/product-collection/recently-viewed';
import { useContentContext } from '@src/context/content-context';
import { CardImage } from '@src/features/product/card-elements/image';
import { getBlockName } from '@src/lib/block';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { transformProductsForDisplay } from '@src/lib/helpers/product';
import { ProductCartItem } from '@src/lib/hooks/cart';
import { Product } from '@src/models/product';
import { find } from 'lodash';
import Image from 'next/image';

type WooCommerceProductTemplateImageProps = {
  block: ParsedBlock;
};

export const WooCommerceProductTemplateImage = ({
  block,
}: WooCommerceProductTemplateImageProps) => {
  const { type, data } = useContentContext();
  if ('woocommerce/product-image' !== block.blockName || !data) {
    return null;
  }
  const attributes = block.attrs as BlockAttributes;

  if ('product' === type) {
    const product = data as Product;
    return (
      <CardImage
        product={product}
        imageClassNames={attributes.className}
      />
    );
  }

  if ('product-cart-item' === type) {
    const { cartItem, loading } = data as CartItemGlobalProps;

    if (loading) {
      return (
        <div
          className={cn(
            'w-[94px] h-[94px] flex-shrink-0 overflow-hidden bg-gray-300',
            attributes.className
          )}
        ></div>
      );
    }
    const isCartItemTypeComposite = cartItem.cartItemType === 'CompositeCartItem';
    const productType = cartItem.type.toLowerCase();
    const isSimple = productType === 'simple';

    const isCompositeChildren = isSimple && isCartItemTypeComposite;

    // This is renderComponentName() from mini-cart-item.tsx
    if (isCompositeChildren) {
      const componentId = find(cartItem.extraData, ['key', 'composite_item'])?.value || '';
      const components = JSON.parse(
        find(cartItem.extraData, ['key', 'composite_data'])?.value || ''
      );
      const componentName = components[componentId]?.title || '';
      return (
        <div className="w-full text-sm font-bold uppercase mb-2">
          <ReactHTMLParser html={componentName} />
        </div>
      );
    }

    return (
      <div className={cn('w-[94px] h-[94px] flex-shrink-0 overflow-hidden', attributes.className)}>
        <a href={'/product/' + cartItem.slug}>
          <Image
            src={cartItem.image.sourceUrl}
            alt={cartItem.image.altText}
            width={68}
            height={61}
            className="h-full w-full object-cover object-center"
          />
        </a>
      </div>
    );
  }

  //@TODO Handle the default
  return <div>product image template</div>;
};
