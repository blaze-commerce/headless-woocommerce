import { BlockComponentProps, ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { MiniCartContainer } from '@src/components/blocks/woocommerce/mini-cart/mini-cart-container';
import { NoCartItemsContainer } from '@src/components/blocks/woocommerce/mini-cart/no-cart-items-container';
import { WooCommerceProductTemplateCardSaleBadge } from '@src/components/blocks/woocommerce/product-collection/product-template/badges/sale';
import { WooCommerceProductRatingIconsTemplate } from '@src/components/blocks/woocommerce/product-collection/product-template/product-rating-icons';
import { FreeShippingProgress } from '@src/components/free-shipping-progress';
import { useContentContext } from '@src/context/content-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';

const placeHolderBlocks = {
  MiniCartContainer: MiniCartContainer,
  FreeShippingProgress: FreeShippingProgress,
  NoCartItemsContainer: NoCartItemsContainer,
  CardSaleBadge: WooCommerceProductTemplateCardSaleBadge,
  ProductRatingIcons: WooCommerceProductRatingIconsTemplate,
};

export const getGroupClasses = (block: ParsedBlock) => {
  const attributes = block.attrs as BlockAttributes;
  const groupType = attributes.layout?.type;
  const justifyContent = attributes.layout?.justifyContent;
  const orientation = attributes.layout?.orientation;

  const justifyContentClasses = {
    center: 'justify-center',
    left: 'justify-start',
    right: 'justify-end',
    'space-between': 'justify-between',
  };

  return cn(
    block?.id,
    'core-group',
    groupType == 'flex' && 'flex',
    groupType == 'grid' && 'grid',
    justifyContent && justifyContentClasses[justifyContent],
    orientation == 'vertical' && 'flex-col',
    attributes.className
  );
};

export const Group = ({ block }: BlockComponentProps) => {
  const { type, data } = useContentContext();
  if ('core/group' !== block.blockName) {
    return null;
  }

  const { className } = block.attrs;
  const TagName = block.attrs?.tagName
    ? (block.attrs.tagName as keyof JSX.IntrinsicElements)
    : ('div' as keyof JSX.IntrinsicElements);

  const blockName = getBlockName(block);
  const GroupBlock = placeHolderBlocks[blockName as keyof typeof placeHolderBlocks];
  if (GroupBlock || typeof GroupBlock !== 'undefined') {
    return <GroupBlock block={block as ParsedBlock} />;
  }

  return (
    <TagName className={getGroupClasses(block)}>
      <Content
        type={type}
        content={block.innerBlocks}
        globalData={data}
      />
    </TagName>
  );
};
