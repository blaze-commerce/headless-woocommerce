import { BlockComponentProps, ParsedBlock } from '@src/components/blocks';
import { WooCommerceProductPriceTemplate } from '@src/components/blocks/woocommerce/product-collection/product-template/product-price';
import { WooCommerceProductSalePriceTemplate } from '@src/components/blocks/woocommerce/product-collection/product-template/product-sale-price';
import { ProductPrice as BasicProductPrice } from '@src/features/product/product-price';
import { getBlockName } from '@src/lib/block';

const placeHolderBlocks = {
  SalePrice: WooCommerceProductSalePriceTemplate,
  Price: WooCommerceProductPriceTemplate,
};

export const ProductPrice = ({ block }: BlockComponentProps) => {
  const blockName = getBlockName(block);
  const { className } = block.attrs;
  const GutenbergBlock = placeHolderBlocks[blockName as keyof typeof placeHolderBlocks];
  if (GutenbergBlock || typeof GutenbergBlock !== 'undefined') {
    return <GutenbergBlock block={block as ParsedBlock} />;
  }

  return (
    <BasicProductPrice
      className={className}
      id={block?.id}
    />
  );
};
