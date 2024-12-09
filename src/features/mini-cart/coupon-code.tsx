import { useMutation } from '@apollo/client';
import cx from 'classnames';
import { useState } from 'react';
import { v4 } from 'uuid';

import { Input } from '@components/form/Input';
import { ChevronDown } from '@src/components/svg/chevron-down';
import { useSiteContext } from '@src/context/site-context';
import { APPLY_COUPON } from '@src/lib/graphql/queries';
import { parseApolloError } from '@src/lib/helpers';

export const CouponCode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  const { fetchCart } = useSiteContext();

  const [applyCoupon, { loading: applyCouponLoading, error: couponError }] = useMutation(
    APPLY_COUPON,
    {
      variables: {
        input: {
          clientMutationId: v4(),
          code: couponCode,
        },
      },
      onCompleted: () => {
        setCouponCode('');
        fetchCart();
      },
    }
  );

  const handleApplyCoupon = () => {
    if (applyCouponLoading) return;
    applyCoupon();
  };

  const onCouponTriggerClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pt-0 px-4 sm:px-6">
      <div
        className={cx(
          'button-coupon-code border-y py-4 flex justify-between items-center cursor-pointer font-secondary text-lg font-bold text-black/80 '
        )}
        onClick={onCouponTriggerClick}
      >
        Coupon Code <ChevronDown className={cx({ 'rotate-180 text-black/80': isOpen })} />
      </div>
      {isOpen && (
        <div className="border-t py-4 w-full">
          <Input
            label="Enter Coupon Code"
            name="coupon_code"
            value={couponCode}
            type="normal"
            inline
            onChange={(e) => {
              setCouponCode(e.target.value);
            }}
          />
          {couponError && <span className="text-red-500">{parseApolloError(couponError)}</span>}
          <button
            onClick={handleApplyCoupon}
            disabled={applyCouponLoading}
            className={cx(
              'button-apply-coupon-code border border-black/20 hover:border-secondary bg-background text-black/80 hover:bg-secondary hover:text-secondary-foreground  rounded-md w-full py-2 mt-2 text-center text-sm font-bold leading-normal h-10',
              {
                'opacity-50': applyCouponLoading,
              }
            )}
          >
            Apply Coupon
          </button>
        </div>
      )}
    </div>
  );
};
