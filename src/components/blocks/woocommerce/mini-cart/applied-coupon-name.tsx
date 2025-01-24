import { ParsedBlock } from '@src/components/blocks';
import { useContentContext } from '@src/context/content-context';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { CouponCode } from '@src/lib/hooks/cart';
type AppliedCouponNameProps = {
  block: ParsedBlock;
};
export const AppliedCouponName = ({ block }: AppliedCouponNameProps) => {
  const { type, data } = useContentContext();
  const blockName = getBlockName(block);
  if ('AppliedCouponName' !== blockName || !data || 'coupon-code' !== type) {
    return null;
  }

  const coupon = data as CouponCode;
  const attributes = block.attrs as BlockAttributes;

  return <p className={attributes.className}>{coupon.code}</p>;
};
