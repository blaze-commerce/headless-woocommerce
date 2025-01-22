import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { CouponCodeFormGlobalProps } from '@src/components/blocks/woocommerce/mini-cart/coupon/coupon-code-form-container';
import { useContentContext } from '@src/context/content-context';
import { useSiteContext } from '@src/context/site-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
type CouponFormAccordionProps = {
  block: ParsedBlock;
};
export const CouponFormAccordion = ({ block }: CouponFormAccordionProps) => {
  const { type, data } = useContentContext();
  const blockName = getBlockName(block);
  if ('CouponFormAccordion' !== blockName || !data || 'coupon-form' !== type) {
    return null;
  }

  const couponForm = data as CouponCodeFormGlobalProps;
  const [isCouponFormOpen, setIsCouponFormOpen] = couponForm.openState;
  const attributes = block.attrs as BlockAttributes;
  return (
    <div
      className={cn(
        'button-coupon-code border-y py-4 flex justify-between items-center cursor-pointer font-secondary text-lg font-bold text-black/80',
        attributes.className
      )}
      onClick={() => setIsCouponFormOpen(!isCouponFormOpen)}
    >
      <Content
        type="coupon-form"
        globalData={couponForm}
        content={block.innerBlocks}
      />
    </div>
  );
};
