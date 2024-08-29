import { useState } from 'react';

export type QuantityHook = {
  value: number;
  decrement: () => void;
  increment: () => void;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onGiftCardChange: (_value: number) => void;
  reset: () => void;
};

type QuantityProps = {
  max?: number;
  initialValue?: number;
};

export const useQuantity = ({ max, initialValue = 1 }: QuantityProps = {}): QuantityHook => {
  const [quantity, setQuantity] = useState(initialValue);

  const decrement = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const increment = () => {
    if (max && quantity >= max) return;
    setQuantity(quantity + 1);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    // if (max && value >= max) {
    //   setQuantity(max);
    // }
    // if (!value) return;

    setQuantity(value);
  };

  const onBlur = () => {
    if (max && quantity >= max) {
      setQuantity(max);
      return;
    }
    setQuantity(quantity);
  };

  const onGiftCardChange = (count: number) => {
    setQuantity(count);
  };

  const reset = () => {
    setQuantity(initialValue);
  };

  return {
    value: quantity,
    decrement,
    increment,
    onChange,
    onBlur,
    onGiftCardChange,
    reset,
  };
};
