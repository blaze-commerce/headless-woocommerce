/* eslint-disable no-unused-vars */
import { ApolloError, useMutation } from '@apollo/client';
import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { useSiteContext } from '@src/context/site-context';
import { getBlockName } from '@src/lib/block';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { BlockAttributes } from '@src/lib/block/types';
import { APPLY_COUPON } from '@src/lib/graphql/queries';
import { useState } from 'react';
import { v4 } from 'uuid';
type CouponCodeFormContainerProps = {
  block: ParsedBlock;
};

export type CouponCodeFormGlobalProps = {
  openState: [isOpen: boolean, setIsOpen: (isOpen: boolean) => void];
  inputState: [couponCode: string, setCouponCode: (couponCode: string) => void];
  loading: boolean;
  error?: ApolloError;
  applyCoupon: () => void;
};

export const CouponCodeFormContainer = ({ block }: CouponCodeFormContainerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>('');

  const { fetchCart } = useSiteContext();

  const [couponMutationFunc, { loading: applyCouponLoading, error: couponError }] = useMutation(
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

  const applyCoupon = () => {
    if (applyCouponLoading) return;
    couponMutationFunc();
  };

  const blockName = getBlockName(block);
  if ('CouponCodeFormContainer' !== blockName) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;
  return (
    <div className={attributes.className}>
      <Content
        type="coupon-form"
        globalData={
          {
            openState: [isOpen, setIsOpen],
            inputState: [couponCode, setCouponCode],
            loading: applyCouponLoading,
            error: couponError,
            applyCoupon,
          } as CouponCodeFormGlobalProps
        }
        content={block.innerBlocks}
      />
    </div>
  );
};
