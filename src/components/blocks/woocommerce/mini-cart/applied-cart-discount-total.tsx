import { ParsedBlock } from '@src/components/blocks';
import { getBlockName } from '@src/lib/block';
import { Content } from '@src/components/blocks/content';
import { BlockAttributes } from '@src/lib/block/types';
import { useSiteContext } from '@src/context/site-context';
import { useContentContext } from '@src/context/content-context';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { getCurrencySymbol } from '@src/lib/helpers/helper';
import { numberFormat } from '@src/lib/helpers/product';
import { CouponCode } from '@src/lib/hooks/cart';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_COUPONS } from '@src/lib/graphql/queries';
import { v4 } from 'uuid';

type AppliedCartDiscountTotalProps = {
  block: ParsedBlock;
};

export const AppliedCartDiscountTotal = ({ block }: AppliedCartDiscountTotalProps) => {
  const { fetchCart, currentCurrency, setCartUpdating } = useSiteContext();

  const { type, data } = useContentContext();

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

  const blockName = getBlockName(block);
  if ('AppliedCartDiscountTotal' !== blockName || !data || 'coupon-code' !== type) {
    return null;
  }

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

  const getAppliedCouponAmount = ({ discountAmount }: CouponCode) => {
    // const combinedCouponTotal = parseFloat(discountAmount || '') + parseFloat(discountTax || '');
    const combinedCouponTotal = parseFloat(discountAmount);
    return numberFormat(combinedCouponTotal);
  };

  const coupon = data as CouponCode;
  const attributes = block.attrs as BlockAttributes;

  return (
    <p className={attributes.className}>
      -{getCurrencySymbol(currentCurrency)}
      {getAppliedCouponAmount(coupon)}
      <a
        className={`cursor-pointer block text-right text-xs text-black ${
          removeCouponLoading ? 'pointer-events-none' : ''
        }`}
        onClick={() => handleRemoveCoupon(coupon.code)}
      >
        [REMOVE]
      </a>
    </p>
  );
};
