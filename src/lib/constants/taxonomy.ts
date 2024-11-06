import { isEmpty } from 'lodash';

import { TAXONOMY_FIELDS } from '@src/lib/queries/taxonomy';

interface TaxonomyProps {
  [key: string]: string;
}

export const TAXONOMY_SLUG_ENUMS: TaxonomyProps = {
  'product-category': 'PRODUCTCATEGORY',
  'product-tag': 'PRODUCTTAG',
  'product-type': 'PRODUCTTAXONOMYTYPE',
  favourite: 'PRODUCTTAXONOMYFAVOURITE',
  occasion: 'PRODUCTTAXONOMYOCCASION',
  'shop-by': 'PRODUCTTAXONOMYSHOPBY',
};

export const TAXONOMY_SLUG_FUNC: TaxonomyProps = {
  'product-category': 'productCategory',
  'product-tag': 'productTag',
  'product-type': 'productTaxonomyType',
  favourite: 'productTaxonomyFavourite',
  occasion: 'productTaxonomyOccasion',
  'shop-by': 'productTaxonomyShopBy',
};

export const TAXONOMY_REAL_SLUG_FUNC: TaxonomyProps = {
  'product-category': 'product_cat',
  'product-tag': 'product_tag',
  'product-type': 'product-type',
  favourite: 'favourite',
  occasion: 'occasion',
  'shop-by': 'shop-by',
};

export const TAXONOMY_REAL_SLUG_NAME: TaxonomyProps = {
  'product-category': 'Category',
  'product-tag': 'Tag',
  'product-type': 'Type',
  favourite: 'Favourite',
  occasion: 'Occasion',
  'shop-by': 'Suitable For',
};

export const getFilterNameBySlug = (slug: string) => {
  return Object.prototype.hasOwnProperty.call(TAXONOMY_REAL_SLUG_NAME, slug)
    ? TAXONOMY_REAL_SLUG_NAME[slug]
    : null;
};

export const getRealWpTaxonomySlug = (slug: string) => {
  return Object.prototype.hasOwnProperty.call(TAXONOMY_REAL_SLUG_FUNC, slug)
    ? TAXONOMY_REAL_SLUG_FUNC[slug]
    : 'product_cat';
};

export const getTaxonomyEnumBySlug = (slug: string) => {
  return Object.prototype.hasOwnProperty.call(TAXONOMY_SLUG_ENUMS, slug)
    ? TAXONOMY_SLUG_ENUMS[slug]
    : 'PRODUCTTAXONOMYFAVOURITE';
};

export const getTaxonomyFuncBySlug = (slug: string) => {
  return Object.prototype.hasOwnProperty.call(TAXONOMY_SLUG_FUNC, slug)
    ? TAXONOMY_SLUG_FUNC[slug]
    : '';
};

export const DEFAULT_ORDERBY = ['TOTAL_SALES', 'DESC'] as const;

export const getTaxonomyOrderFieldAndSortOption = (slug: string) => {
  if ('popularity' === slug) {
    return DEFAULT_ORDERBY;
  } else if ('price' === slug) {
    return ['PRICE', 'ASC'] as const;
  } else if ('price-desc' === slug) {
    return ['PRICE', 'DESC'] as const;
  } else if ('on_sale' === slug) {
    return ['SALE_PRICE', 'ASC'] as const;
  } else if ('title' === slug) {
    return ['NAME', 'ASC'] as const;
  } else if ('title-desc' === slug) {
    return ['NAME', 'DESC'] as const;
  } else if ('date' === slug) {
    return ['DATE', 'DESC'] as const;
  }

  return DEFAULT_ORDERBY;
};

export const generateTaxonomyQuery = (slug: string) => {
  const taxonomyFunc = getTaxonomyFuncBySlug(slug);
  if (isEmpty(taxonomyFunc)) {
    return taxonomyFunc;
  }

  const query = `query TAXONOMY_DATA(
		$slug: ID!
	) {
		taxonomy: ${taxonomyFunc}(id: $slug, idType: SLUG) {
			${TAXONOMY_FIELDS}
		}
	}`;

  return query;
};
