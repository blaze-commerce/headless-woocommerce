import { useProductContext } from '@src/context/product-context';

export const ProductTitle = () => {
  const { product } = useProductContext();

  if (!product) {
    return null;
  }

  return <>{product.name}</>;
};
