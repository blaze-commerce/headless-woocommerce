import { ParsedBlock } from '@src/components/blocks';
import { useContentContext } from '@src/context/content-context';
import { getHeadingTag } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
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

  const { level, className } = attribute;
  const TagName = getHeadingTag(level as number);

  return <TagName className={cn('product-name', className)}>{product.name}</TagName>;
};
