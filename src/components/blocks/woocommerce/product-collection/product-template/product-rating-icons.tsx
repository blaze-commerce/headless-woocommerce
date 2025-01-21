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
import { getGroupClasses } from '@src/components/blocks/core/group';

type WooCommerceProductRatingIconsTemplateProps = {
  block: ParsedBlock;
};

export const WooCommerceProductRatingIconsTemplate = ({
  block,
}: WooCommerceProductRatingIconsTemplateProps) => {
  const { type, data } = useContentContext();
  if (!data || 'product' !== type) {
    return null;
  }

  const blockName = getBlockName(block);
  if ('ProductRatingIcons' !== blockName) {
    return null;
  }

  const product = data as Product;
  // ProductRatingIcons inner blocks MUST have the 3 icons in the following order:
  const [emptyStar, halfStar, fullStar] = block.innerBlocks;

  const stats = getProductRatingStats(product);

  const rating = stats.rating;
  const steps = round(stats.rating, 0);
  const remainingStars = 5 - steps;

  const groupClasses = getGroupClasses(block);

  return (
    <div className={groupClasses}>
      {steps >= 0 &&
        [...new Array(steps)].map((_rate, index) => {
          const star = rating - index;

          return star < 1 ? (
            <IconBlock
              block={halfStar}
              key={index}
            />
          ) : (
            <IconBlock
              key={index}
              block={fullStar}
            />
          );
        })}

      {remainingStars >= 0 &&
        [...new Array(remainingStars)].map((_rate, index) => {
          return (
            <IconBlock
              key={index}
              block={emptyStar}
            />
          );
        })}
    </div>
  );
};
