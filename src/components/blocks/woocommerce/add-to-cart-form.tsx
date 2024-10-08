import { BlockComponentProps } from '@src/components/blocks';

import { Variant } from '@src/features/product/variant';
import { CompositeComponents } from '@src/features/product/composite';
import { GiftCardForm } from '@src/features/product/gift-card/gift-card-form';
import { AddToCartForm as AddToCartFormComponent } from '@src/features/product/add-to-cart-form';
import { cn } from '@src/lib/helpers/helper';

export const AddToCartForm = ({ block }: BlockComponentProps) => {
  const { className } = block.attrs;
  return (
    <div className={cn('add-to-cart-form', block?.id, className)}>
      <Variant />
      <CompositeComponents />
      <GiftCardForm />
      <AddToCartFormComponent />
    </div>
  );
};
