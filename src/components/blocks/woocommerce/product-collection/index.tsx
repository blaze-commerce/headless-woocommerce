import { ParsedBlock } from '@src/components/blocks';
import { RecentlyViewedProductCollection } from '@src/components/blocks/woocommerce/product-collection/recently-viewed';
import { getBlockName } from '@src/lib/block';

type WooCommerceProductCollectionProps = {
  block: ParsedBlock;
};

const placeHolderBlocks = {
  RecentlyViewedProducts: RecentlyViewedProductCollection,
};

export const WooCommerceProductCollection = ({ block }: WooCommerceProductCollectionProps) => {
  if ('woocommerce/product-collection' !== block.blockName) {
    return null;
  }

  const blockName = getBlockName(block);
  const GutenbergBlock = placeHolderBlocks[blockName as keyof typeof placeHolderBlocks];
  if (GutenbergBlock || typeof GutenbergBlock !== 'undefined') {
    return <GutenbergBlock block={block as ParsedBlock} />;
  }

  //@TODO Handle the default product collection
  return null;
};
