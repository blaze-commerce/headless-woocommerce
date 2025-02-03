import { ParsedBlock } from '@src/components/blocks';
import { getBlockName } from '@src/lib/block';
import { Content } from '@src/components/blocks/content';
import { BlockAttributes } from '@src/lib/block/types';
import { useSiteContext } from '@src/context/site-context';
import { useContentContext } from '@src/context/content-context';

type AppliedCartDiscountContainerProps = {
  block: ParsedBlock;
};

export const AppliedCartDiscountContainer = ({ block }: AppliedCartDiscountContainerProps) => {
  const { cart } = useSiteContext();
  const { type, data } = useContentContext();
  const blockName = getBlockName(block);
  if ('AppliedCartDiscountContainer' !== blockName && block.innerBlocks) {
    return null;
  }

  const shouldShow = cart.appliedCoupons && cart.appliedCoupons.length > 0;
  if (!shouldShow) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;

  return (
    <>
      {cart.appliedCoupons?.map((appliedCoupon) => (
        <div
          className={attributes.className}
          key={appliedCoupon.code}
        >
          <Content
            type="coupon-code"
            globalData={appliedCoupon}
            content={block.innerBlocks}
          />
        </div>
      ))}
    </>
  );
};
