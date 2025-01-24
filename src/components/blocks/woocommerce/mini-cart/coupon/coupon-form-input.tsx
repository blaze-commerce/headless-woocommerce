import { ParsedBlock } from '@src/components/blocks';
import { CouponCodeFormGlobalProps } from '@src/components/blocks/woocommerce/mini-cart/coupon/coupon-code-form-container';
import { useContentContext } from '@src/context/content-context';
import { useSiteContext } from '@src/context/site-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
type CouponFormInputProps = {
  block: ParsedBlock;
};
export const CouponFormInput = ({ block }: CouponFormInputProps) => {
  const { type, data } = useContentContext();
  const { cartUpdating } = useSiteContext();

  const blockName = getBlockName(block);
  if ('CouponFormInput' !== blockName || !data || 'coupon-form' !== type) {
    return null;
  }

  const couponForm = data as CouponCodeFormGlobalProps;
  const [couponCode, setCouponCode] = couponForm.inputState;
  const attributes = block.attrs as BlockAttributes;
  if (cartUpdating) {
    return <div className="animate-pulse  w-full h-10 bg-gray-300"></div>;
  }
  return (
    <input
      className={cn('border border-black/10 rounded-md p-2 w-full', attributes.className)}
      name="coupon_code"
      value={couponCode}
      onChange={(e) => {
        setCouponCode(e.target.value);
      }}
      placeholder={'Enter Coupon Code'}
    />
  );
};
