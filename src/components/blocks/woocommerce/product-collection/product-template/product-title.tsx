import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { RecentlyViewedProductCollection } from '@src/components/blocks/woocommerce/product-collection/recently-viewed';
import { useContentContext } from '@src/context/content-context';
import { CardImage } from '@src/features/product/card-elements/image';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { transformProductsForDisplay } from '@src/lib/helpers/product';
import { Product } from '@src/models/product';

type WooCommerceProductNameTemplateProps = {
  block: ParsedBlock;
};

export const WooCommerceProductNameTemplate = ({ block }: WooCommerceProductNameTemplateProps) => {
  const { type, data } = useContentContext();
  if ('core/post-title' !== block.blockName || !data || 'product' !== type) {
    return null;
  }

  const product = data as Product;

  const attribute = block.attrs as BlockAttributes;
  if (attribute.__woocommerceNamespace !== 'woocommerce/product-collection/product-title') {
    return null;
  }

  let TagName: keyof JSX.IntrinsicElements;
  const { level, className } = attribute;
  switch (level) {
    case 1:
      TagName = 'h1';
      break;
    case 2:
      TagName = 'h2';
      break;
    case 3:
      TagName = 'h3';
      break;
    case 4:
      TagName = 'h4';
      break;
    case 5:
      TagName = 'h5';
      break;
    case 6:
      TagName = 'h6';
      break;
    default:
      TagName = 'h1'; //
  }

  return <TagName className={cn('product-name', className)}>{product.name}</TagName>;
};
