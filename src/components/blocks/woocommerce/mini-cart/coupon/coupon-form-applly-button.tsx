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
  const { cartUpdating } = useSiteContext();

  const blockName = getBlockName(block);
  if ('CouponFormApplyButton' !== blockName || !data || 'coupon-form' !== type) {
    return null;
  }

  const plainText = block.innerHTML.replace(/<[^>]+>/g, '').trim();

  const couponForm = data as CouponCodeFormGlobalProps;
  const { applyCoupon, loading } = couponForm;
  const attributes = block.attrs as BlockAttributes;
  if (cartUpdating) {
    return <div className="animate-pulse  w-full h-10 bg-gray-300"></div>;
  }
  return (
    <button
      onClick={applyCoupon}
      disabled={loading}
      className={cn(
        'border border-black/20 hover:border-secondary bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground w-full py-2 text-center text-sm font-bold leading-normal ',
        {
          'opacity-50': loading,
        },
        attributes.className
      )}
    >
      {plainText}
    </button>
  );
};
