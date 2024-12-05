import { useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@src/lib/helpers/helper';
import { TAddOnItem } from '@src/types/addToCart';
import { BlockComponentProps } from '@src/components/blocks';
import { AddToCartContextProvider } from '@src/context/add-to-cart-context';
import { useProductContext } from '@src/context/product-context';
import { Variant } from '@src/features/product/variant';
import { CompositeComponents } from '@src/features/product/composite';
import { GiftCardForm } from '@src/features/product/gift-card/gift-card-form';
import { AddToCartForm as AddToCartFormComponent } from '@src/features/product/add-to-cart-form';

const AddToCartBundle = dynamic(() =>
  import('@src/features/product/add-to-cart/bundle').then((mod) => mod.AddToCartBundle)
);

const AddToCartAddons = dynamic(() =>
  import('@src/features/product/add-to-cart/addons').then((mod) => mod.AddToCartAddons)
);

export const AddToCartForm = ({ block }: BlockComponentProps) => {
  const { className } = block.attrs;
  const { product } = useProductContext();
  const [items, setItems] = useState<TAddOnItem[]>([]);

  if (!product) return null;
  return (
    <AddToCartContextProvider addons={[items, setItems]}>
      <div className={cn('add-to-cart-form', block?.id, className, product.classes)}>
        <Variant />
        {product.hasBundle && <AddToCartBundle />}
        {product.hasAddons() && <AddToCartAddons />}
        <CompositeComponents />
        <GiftCardForm />
        <AddToCartFormComponent />
      </div>
    </AddToCartContextProvider>
  );
};
