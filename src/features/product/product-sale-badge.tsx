import { useProductContext } from '@src/context/product-context';
import { Product } from '@src/models/product';

export const ProductSaleBadge = () => {
  const { product } = useProductContext();

  if (!product) return null;

  if (!product.onSale) return null;

  return (
    <div className="bg-[#c1b19e] uppercase text-white font-medium text-sm leading-4 p-2">Sale!</div>
  );
};
