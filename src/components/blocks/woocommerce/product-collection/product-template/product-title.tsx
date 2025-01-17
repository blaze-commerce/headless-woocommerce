import { ParsedBlock } from '@src/components/blocks';
import { useContentContext } from '@src/context/content-context';
import { getHeadingTag } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { Product } from '@src/models/product';
import { RawLink } from '@src/components/common/raw-link';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { seoUrlParser } from '@src/components/page-seo';

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
  const productLink = seoUrlParser(product?.permalink || '');

  return (
    <TagName className={cn('product-name', className)}>
      <RawLink href={productLink}>
        <span
          aria-hidden="true"
          className=" absolute inset-x-auto inset-y-5 z-[8] cursor-pointer"
        />
        <ReactHTMLParser html={product.name as string} />
      </RawLink>
    </TagName>
  );
};
