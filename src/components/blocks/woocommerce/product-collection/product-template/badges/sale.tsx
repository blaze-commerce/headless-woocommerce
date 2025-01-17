import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { RecentlyViewedProductCollection } from '@src/components/blocks/woocommerce/product-collection/recently-viewed';
import { useContentContext } from '@src/context/content-context';
import { CardImage } from '@src/features/product/card-elements/image';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { transformProductsForDisplay } from '@src/lib/helpers/product';
import { Product } from '@src/models/product';

type WooCommerceProductTemplateCardSaleBadgeProps = {
  block: ParsedBlock;
};

export const WooCommerceProductTemplateCardSaleBadge = ({
  block,
}: WooCommerceProductTemplateCardSaleBadgeProps) => {
  const { type, data } = useContentContext();
  if (type !== 'product' || !data) {
    return null;
  }

  const blockName = getBlockName(block);
  if ('CardSaleBadge' !== blockName) {
    return null;
  }

  const product = data as Product;
  if (!product.isOnSale) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;
  return (
    <div className={attributes.className ? attributes.className : 'badge sale-badge'}>Sale</div>
  );
};
