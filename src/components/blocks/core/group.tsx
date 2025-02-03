import { BlockComponentProps, ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { MiniCartContainer } from '@src/components/blocks/woocommerce/mini-cart/mini-cart-container';
import { WishlistContainer } from '@src/components/blocks/wish-list/wishlist-container';
import { NoCartItemsContainer } from '@src/components/blocks/woocommerce/mini-cart/no-cart-items-container';
import { WooCommerceProductTemplateCardSaleBadge } from '@src/components/blocks/woocommerce/product-collection/product-template/badges/sale';
import { WooCommerceProductRatingIconsTemplate } from '@src/components/blocks/woocommerce/product-collection/product-template/product-rating-icons';
import { FreeShippingProgress } from '@src/components/free-shipping-progress';
import { useContentContext } from '@src/context/content-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { NoWishlistContainer } from '@src/components/blocks/wish-list/no-wishlist-container';
import { WishlistSignUp } from '@src/components/blocks/wish-list/wishlist-sign-up';
import { CartItemDecrementButton } from '@src/components/blocks/woocommerce/product-collection/product-template/cart-item-decrement-button';
import { CartItemIncrementButton } from '@src/components/blocks/woocommerce/product-collection/product-template/cart-item-increment-button';
import { CartItemInput } from '@src/components/blocks/woocommerce/product-collection/product-template/cart-item-input';
import { CouponCodeFormContainer } from '@src/components/blocks/woocommerce/mini-cart/coupon/coupon-code-form-container';
import { CouponFormAccordion } from '@src/components/blocks/woocommerce/mini-cart/coupon/coupon-form-accordion';
import { CouponFormAccordionIcons } from '@src/components/blocks/woocommerce/mini-cart/coupon/coupon-form-accordion-icons';
import { CouponForm } from '@src/components/blocks/woocommerce/mini-cart/coupon/coupon-form';
import { CouponFormInput } from '@src/components/blocks/woocommerce/mini-cart/coupon/coupon-form-input';
import { CouponFormApplyButton } from '@src/components/blocks/woocommerce/mini-cart/coupon/coupon-form-applly-button';
import { HasCartItemsContainer } from '@src/components/blocks/woocommerce/mini-cart/has-cart-items-container';
import { CouponFormError } from '@src/components/blocks/woocommerce/mini-cart/coupon/coupon-form-error';
import { CartDiscountContainer } from '@src/components/blocks/woocommerce/mini-cart/cart-discount-container';
import { ProductGrid } from '@src/components/blocks/woocommerce/product-collection/product-grid';
import { AppliedCartDiscountContainer } from '@src/components/blocks/woocommerce/mini-cart/applied-cart-discount-container';
import { ProductCollectionPaginationDots } from '@src/components/blocks/woocommerce/product-collection/pagination-dots';
import { SaveToPinterest } from '@src/components/blocks/woocommerce/product-collection/product-template/badges/save-to-pinterest';
import { TaxonomyLoadMore } from '@src/components/blocks/woocommerce/taxonomy-load-more';

const placeHolderBlocks = {
  MiniCartContainer: MiniCartContainer,
  WishlistContainer: WishlistContainer,
  FreeShippingProgress: FreeShippingProgress,
  NoCartItemsContainer: NoCartItemsContainer,
  HasCartItemsContainer: HasCartItemsContainer,
  NoWishlistContainer: NoWishlistContainer,
  CardSaleBadge: WooCommerceProductTemplateCardSaleBadge,
  SaveToPinterest,
  ProductCardsLoadMore: TaxonomyLoadMore,
  ProductRatingIcons: WooCommerceProductRatingIconsTemplate,
  WishlistSignUp: WishlistSignUp,
  WishlistSignUpButton: WishlistSignUp,
  CartItemDecrementButton: CartItemDecrementButton,
  CartItemIncrementButton: CartItemIncrementButton,
  CartItemInput: CartItemInput,
  CouponCodeFormContainer: CouponCodeFormContainer,
  CouponForm: CouponForm,
  CouponFormAccordion: CouponFormAccordion,
  CouponFormAccordionIcons: CouponFormAccordionIcons,
  CouponFormInput: CouponFormInput,
  CouponFormError: CouponFormError,
  CartDiscountContainer: CartDiscountContainer,
  AppliedCartDiscountContainer: AppliedCartDiscountContainer,
  ProductGrid: ProductGrid,
  PaginationDots: ProductCollectionPaginationDots,
};

export const getGroupClasses = (block: ParsedBlock) => {
  const attributes = block.attrs as BlockAttributes;
  const groupType = attributes.layout?.type;
  const justifyContent = attributes.layout?.justifyContent;
  const orientation = attributes.layout?.orientation;

  return cn(
    block?.id,
    'core-group',
    {
      flex: groupType == 'flex',
      grid: groupType == 'grid',
      'justify-center': justifyContent == 'center',
      'justify-start': justifyContent == 'left',
      'justify-end': justifyContent == 'right',
      'justify-between': justifyContent == 'space-between',
      'flex-col': orientation == 'vertical',
    },
    attributes.className
  );
};

export const Group = ({ block }: BlockComponentProps) => {
  const { type, data } = useContentContext();
  if ('core/group' !== block.blockName) {
    return null;
  }

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
