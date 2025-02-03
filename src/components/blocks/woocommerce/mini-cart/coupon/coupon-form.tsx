import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { CouponCodeFormGlobalProps } from '@src/components/blocks/woocommerce/mini-cart/coupon/coupon-code-form-container';
import { useContentContext } from '@src/context/content-context';
import { useSiteContext } from '@src/context/site-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
type CouponFormProps = {
  block: ParsedBlock;
};
export const CouponForm = ({ block }: CouponFormProps) => {
  const { type, data } = useContentContext();
  const blockName = getBlockName(block);
  if ('CouponForm' !== blockName || !data || 'coupon-form' !== type) {
    return null;
  }

  const couponForm = data as CouponCodeFormGlobalProps;
  const [isCouponFormOpen] = couponForm.openState;
  if (!isCouponFormOpen) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;
  return (
    <div className={cn('border-t py-4 w-full space-y-2', attributes.className)}>
      <Content
        type="coupon-form"
        globalData={couponForm}
        content={block.innerBlocks}
      />
    </div>
  );
};
