import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { v4 } from 'uuid';

import { useSiteContext } from '@src/context/site-context';
import { REMOVE_COUPONS } from '@src/lib/graphql/queries';
import { CouponCode, FormattedCart } from '@src/lib/hooks/cart';
import { numberFormat } from '@src/lib/helpers/product';

type Props = Pick<FormattedCart, 'appliedCoupons'>;

export const AppliedCoupon: React.FC<Props> = ({ appliedCoupons }: Props) => {
  const { fetchCart, currentCurrency } = useSiteContext();
  const [, setError] = useState('');

  const [removeCoupon, { loading: removeCouponLoading }] = useMutation(REMOVE_COUPONS, {
    onCompleted: () => {
      fetchCart();
    },
    onError: (error) => {
      if (error) {
        setError(error?.graphQLErrors?.[0]?.message ?? '');
      }
    },
  });

  const handleRemoveCoupon = (code: string) => {
    if (removeCouponLoading) return;
    removeCoupon({
      variables: {
        input: {
          clientMutationId: v4(),
          codes: [code],
        },
      },
    });
  };

  if (!appliedCoupons || appliedCoupons.length === 0) return null;

  const getAppliedCouponAmount = ({ discountAmount, discountTax }: CouponCode) => {
    // const combinedCouponTotal = parseFloat(discountAmount || '') + parseFloat(discountTax || '');
    const combinedCouponTotal = parseFloat(discountAmount);
    return numberFormat(combinedCouponTotal);
  };

  return (
    <div className="border-t pt-6 pb-2">
      {appliedCoupons.map((appliedCoupon) => (
        <div
          key={appliedCoupon.code}
          className="flex justify-between text-base pb-2"
        >
          <p>{appliedCoupon.code}</p>
          <p>
            -{getAppliedCouponAmount(appliedCoupon)} {currentCurrency}
            <a
              className={`cursor-pointer block text-right text-xs text-black ${
                removeCouponLoading ? 'pointer-events-none' : ''
              }`}
              onClick={() => handleRemoveCoupon(appliedCoupon.code)}
            >
              [REMOVE]
            </a>
          </p>
        </div>
      ))}
    </div>
  );
};
