import { ParsedBlock } from '@src/components/blocks';
import { useContentContext } from '@src/context/content-context';
import { getBlockName, getHeadingTag } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { Product } from '@src/models/product';
import { RawLink } from '@src/components/common/raw-link';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { seoUrlParser } from '@src/components/page-seo';
import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';
import { Store } from '@src/models/settings/store';
import { ProductMetaData } from '@src/models/product/types';
import { getProductRatingStats } from '@src/lib/helpers/product';
import { round } from 'lodash';
import { IconBlock } from '@src/components/blocks/outermost/IconBlock';

type WooCommerceProductReviewCountTemplateProps = {
  block: ParsedBlock;
};

export const WooCommerceProductReviewCountTemplate = ({
  block,
}: WooCommerceProductReviewCountTemplateProps) => {
  const { type, data } = useContentContext();
  if (!data || 'product' !== type) {
    return null;
  }

  const blockName = getBlockName(block);
  if ('ProductReviewsCount' !== blockName) {
    return null;
  }

  const product = data as Product;
  const attribute = block.attrs as BlockAttributes;

  const stats = getProductRatingStats(product);

  if (stats.totalReviews === 0) {
    return <p className={attribute.className}>No Reviews</p>;
  }

  return (
    <p className={attribute.className}>
      {stats.totalReviews} Review{stats.totalReviews > 1 ? 's' : ''}
    </p>
  );
};
