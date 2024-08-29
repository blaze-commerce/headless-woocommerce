import { find } from 'lodash';
import { PrefetchLink } from '@src/components/common/prefetch-link';

import { useSiteContext } from '@src/context/site-context';
import { useProductContext } from '@src/context/product-context';

export const ProductBrand = () => {
  const { product } = useProductContext();
  const { settings } = useSiteContext();

  if (!product) return null;

  const category = find(
    product.taxonomies,
    (tax) => tax.type === settings?.product?.productDetails.brandTaxonomyIdentifier
  );
  if (!category) return null;
  return (
    <PrefetchLink
      unstyled
      href={category.url}
      className="text-slate-600 text-sm font-normal leading-tight mb-2 mt-1"
    >
      {category?.name}
    </PrefetchLink>
  );
};
