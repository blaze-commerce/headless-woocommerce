import { isEmpty } from 'lodash';

import { ProductSlides } from '@src/features/product/product-slides/v2';
import { useProductContext } from '@src/context/product-context';

export const YouMayAlsoLike = () => {
  const { linkedProducts } = useProductContext();

  const upsellProducts = linkedProducts?.upsellProducts ? linkedProducts?.upsellProducts : [];
  const relatedProducts = linkedProducts?.relatedProducts ? linkedProducts?.relatedProducts : [];

  const recommendedProducts = [...upsellProducts, ...relatedProducts].slice(0, 12);

  return (
    <>
      {!isEmpty(recommendedProducts) && (
        <ProductSlides
          id={'you-may-also-like'}
          title={'You May Also Like'}
          products={recommendedProducts}
        />
      )}
    </>
  );
};
