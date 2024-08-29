import { PRODUCT_FRAGMENTS } from '@src/lib/queries/product';
export const TAXONOMY_FIELDS = `
id
name
description
seo {
	fullHead
}
`;

export const TAXONOMY_PRODUCT_FIELDS = `
nodes {
	${PRODUCT_FRAGMENTS}
}
`;

export const POPULAR_PRODUCT_FIEDLS = `
nodes {
	${PRODUCT_FRAGMENTS}
}
`;

export const getProductTaxonomyEnum = (slug: string) => {
  if (slug == 'product-category') {
    return 'PRODUCTCATEGORY';
  } else if (slug == 'product-tag') {
    return 'PRODUCTTAG';
  } else if (slug == 'gift_box_size') {
    return 'GIFTBOXSIZE';
  } else if (slug == 'product-type') {
    return 'PRODUCTTAXONOMYTYPE';
  } else if (slug == 'favourite') {
    return 'PRODUCTTAXONOMYFAVOURITE';
  } else if (slug == 'occasion') {
    return 'PRODUCTTAXONOMYOCCASION';
  } else if (slug == 'shop-by') {
    return 'PRODUCTTAXONOMYSHOPBY';
  } else {
    return null;
  }
};
