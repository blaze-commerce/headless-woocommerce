import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { CouponCodeFormGlobalProps } from '@src/components/blocks/woocommerce/mini-cart/coupon/coupon-code-form-container';
import { Input } from '@src/components/form/Input';
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

  const blockName = getBlockName(block);
  if ('CouponFormInput' !== blockName || !data || 'coupon-form' !== type) {
    return null;
  }

  const couponForm = data as CouponCodeFormGlobalProps;
  const [couponCode, setCouponCode] = couponForm.inputState;
  const attributes = block.attrs as BlockAttributes;

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
