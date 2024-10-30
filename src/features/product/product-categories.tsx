import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import { ProductTaxonomy } from '@src/models/product/types';
import { filter } from 'lodash';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

export const ProductCategories = () => {
  const { product } = useProductContext();
  const { settings } = useSiteContext();

  if (!product) return null;

  let categories: ProductTaxonomy[] = product.taxonomies || [];

  if (!settings?.product?.productDetails.showCategories) return null;

  if (settings?.product?.productDetails.showBrand) {
    categories = filter(
      product.taxonomies,
      (tax) => tax.type !== settings?.product?.productDetails.brandTaxonomyIdentifier
    );
  }
  return (
    <p className="mb-4 text-xs font-normal leading-none">
      Categories:{' '}
      {categories
        .map((tax, key) => (
          <ReactHTMLParser
            key={key}
            html={tax.name}
          />
        ))
        .join(', ')}
    </p>
  );
};
