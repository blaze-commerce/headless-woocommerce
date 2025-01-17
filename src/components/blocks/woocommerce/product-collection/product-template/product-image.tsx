import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { RecentlyViewedProductCollection } from '@src/components/blocks/woocommerce/product-collection/recently-viewed';
import { useContentContext } from '@src/context/content-context';
import { CardImage } from '@src/features/product/card-elements/image';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { transformProductsForDisplay } from '@src/lib/helpers/product';
import { Product } from '@src/models/product';

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

  if ('product' === type) {
    const product = data as Product;
    const attributes = block.attrs as BlockAttributes;
    return (
      <CardImage
        product={product}
        imageClassNames={attributes.className}
      />
    );
  }

  //@TODO Handle the default
  return <div>product image template</div>;
};
