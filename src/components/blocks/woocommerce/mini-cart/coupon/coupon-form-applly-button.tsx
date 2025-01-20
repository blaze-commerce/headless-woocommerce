import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { CouponCodeFormGlobalProps } from '@src/components/blocks/woocommerce/mini-cart/coupon/coupon-code-form-container';
import { Input } from '@src/components/form/Input';
import { useContentContext } from '@src/context/content-context';
import { useSiteContext } from '@src/context/site-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
type CouponFormApplyButtonProps = {
  block: ParsedBlock;
};
export const CouponFormApplyButton = ({ block }: CouponFormApplyButtonProps) => {
  const { type, data } = useContentContext();

  const blockName = getBlockName(block);
  if ('CouponFormApplyButton' !== blockName || !data || 'coupon-form' !== type) {
    return null;
  }

  const couponForm = data as CouponCodeFormGlobalProps;
  const { applyCoupon, loading } = couponForm;
  const attributes = block.attrs as BlockAttributes;

  return (
    <button
      onClick={applyCoupon}
      disabled={loading}
      className={cn(
        'border border-black/20 hover:border-secondary bg-background text-black/80 hover:bg-secondary hover:text-secondary-foreground  rounded-md w-full py-2 mt-2 text-center text-sm font-bold leading-normal h-10',
        {
          'opacity-50': loading,
        },
        attributes.className
      )}
    >
      Apply Coupon
    </button>
  );
};
