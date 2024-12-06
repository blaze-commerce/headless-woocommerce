import { useAddToCartContext } from '@src/context/add-to-cart-context';
import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import { useCallback, useEffect, useState } from 'react';

export const AddOnsPriceBreakdown = () => {
  const { currentCurrency: currency } = useSiteContext();
  const {
    product,
    state: { matchedVariant },
  } = useProductContext();
  const { addons } = useAddToCartContext();
  const [items] = addons;
  const [optionalFee, setOptionalFee] = useState<number>(0);
  let productPrice = 0.0;

  const calculateOptionalCost = useCallback(() => {
    if (!items) return 0;

    return items.reduce((total, item) => {
      if (item.isCalculated) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  }, [items]);

  useEffect(() => {
    setOptionalFee(calculateOptionalCost());
  }, [calculateOptionalCost]);

  if (product?.stockStatus === 'outofstock') return null;

  if (!product?.price) return null;

  if (product?.productType === 'simple') productPrice = product.price[currency];

  if (product?.productType === 'variable' && matchedVariant && matchedVariant.price) {
    productPrice = matchedVariant.price[currency];
  }

  return (
    <div className="addons-price-breakdown">
      <span>Options total: ${optionalFee.toFixed(2)}</span>
      <span>Grand Total: ${(productPrice + optionalFee).toFixed(2)}</span>
    </div>
  );
};
