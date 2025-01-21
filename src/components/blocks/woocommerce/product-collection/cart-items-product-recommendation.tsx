import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { useFetchTopRecommendedProductsForCartItems } from '@src/lib/hooks/top-recommendation';

type CartItemsProductRecommendationProps = {
  block: ParsedBlock;
};

export const CartItemsProductRecommendation = ({ block }: CartItemsProductRecommendationProps) => {
  const { data: recommendedProducts, loading: fetchingRecommendedProducts } =
    useFetchTopRecommendedProductsForCartItems();

  const blockName = getBlockName(block);
  if (
    'CartItemsProductRecommendation' !== blockName ||
    fetchingRecommendedProducts ||
    !recommendedProducts ||
    recommendedProducts.length === 0
  ) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;
  return (
    <div className={attributes.className}>
      <Content
        type="products"
        globalData={recommendedProducts}
        content={block.innerBlocks}
      />
    </div>
  );
};
