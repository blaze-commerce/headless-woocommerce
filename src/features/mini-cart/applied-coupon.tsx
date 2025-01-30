import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { v4 } from 'uuid';

import { useSiteContext } from '@src/context/site-context';
import { REMOVE_COUPONS } from '@src/lib/graphql/queries';
import { CouponCode, FormattedCart } from '@src/lib/hooks/cart';
import { numberFormat } from '@src/lib/helpers/product';
import { getCurrencySymbol } from '@src/lib/helpers/helper';

type Props = Pick<FormattedCart, 'appliedCoupons'>;

export const AppliedCoupon: React.FC<Props> = ({ appliedCoupons }: Props) => {
  const { fetchCart, currentCurrency, setCartUpdating } = useSiteContext();
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
    setCartUpdating(true);
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
    <>
      {appliedCoupons.map((appliedCoupon) => (
        <div
          key={appliedCoupon.code}
          className="flex justify-between text-base"
        >
          <p>{appliedCoupon.code}</p>
          <p>
            -{getCurrencySymbol(currentCurrency)}
            {getAppliedCouponAmount(appliedCoupon)}
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
    </>
  );
};
