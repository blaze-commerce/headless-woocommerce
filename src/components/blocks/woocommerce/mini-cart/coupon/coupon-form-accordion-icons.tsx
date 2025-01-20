import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { IconBlock } from '@src/components/blocks/outermost/IconBlock';
import { CouponCodeFormGlobalProps } from '@src/components/blocks/woocommerce/mini-cart/coupon/coupon-code-form-container';
import { useContentContext } from '@src/context/content-context';
import { useSiteContext } from '@src/context/site-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
type CouponFormAccordionIconsProps = {
  block: ParsedBlock;
};
export const CouponFormAccordionIcons = ({ block }: CouponFormAccordionIconsProps) => {
  const { type, data } = useContentContext();
  const blockName = getBlockName(block);
  if (
    'CouponFormAccordionIcons' !== blockName ||
    !data ||
    'coupon-form' !== type ||
    block.innerBlocks.length < 2
  ) {
    return null;
  }

  const couponForm = data as CouponCodeFormGlobalProps;
  const [isCouponFormOpen] = couponForm.openState;

  const [open, close] = block.innerBlocks;
  if (isCouponFormOpen) {
    return <IconBlock block={close} />;
  }

  return <IconBlock block={open} />;
};
