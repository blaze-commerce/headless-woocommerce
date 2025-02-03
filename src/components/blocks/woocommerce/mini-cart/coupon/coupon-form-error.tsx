import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { CouponCodeFormGlobalProps } from '@src/components/blocks/woocommerce/mini-cart/coupon/coupon-code-form-container';
import { Input } from '@src/components/form/Input';
import { useContentContext } from '@src/context/content-context';
import { useSiteContext } from '@src/context/site-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { parseApolloError } from '@src/lib/helpers';
import { cn } from '@src/lib/helpers/helper';
type CouponFormErrorProps = {
  block: ParsedBlock;
};
export const CouponFormError = ({ block }: CouponFormErrorProps) => {
  const { type, data } = useContentContext();

  const blockName = getBlockName(block);
  if ('CouponFormError' !== blockName || !data || 'coupon-form' !== type) {
    return null;
  }

  const couponForm = data as CouponCodeFormGlobalProps;
  const { error } = couponForm;
  if (!error) {
    return null;
  }
  const attributes = block.attrs as BlockAttributes;

  return (
    <span className={cn('text-red-500', attributes.className)}>{parseApolloError(error)}</span>
  );
};
