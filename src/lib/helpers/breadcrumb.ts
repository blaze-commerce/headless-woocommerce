import { compact, find, isEmpty, reduce } from 'lodash';

import type { ProductTaxonomy } from '@src/models/product/types';
import { taxonomyUrlSlugToWpTaxonomySlug } from '../typesense/taxonomy';

export const generatePreviousBreadcrumbs = (taxonomies: ProductTaxonomy[], slug: string) => {
  const categories = compact(slug?.split('/'));

  return find(taxonomies, (taxonomy) => {
    if (
      taxonomy?.type === taxonomyUrlSlugToWpTaxonomySlug(categories?.[0]) &&
      taxonomy?.slug === categories?.[categories.length - 1]
    ) {
      return true;
    }
  });
};

const restructureTaxonomies = (taxonomies: ProductTaxonomy[]) => {
  return reduce(
    taxonomies,
    (result: ProductTaxonomy[], item) => {
      if (item?.type === 'product_cat' && item?.parentTerm) {
        result.push(item);
      }

      return result;
    },
    []
  );
};

export const generateProductBreadcrumbs = (taxonomies: ProductTaxonomy[]) => {
  // Initially Remove Taxonomies with 1 Breadcrumb only
  const newTaxonomies = restructureTaxonomies(taxonomies);

  if (!isEmpty(newTaxonomies)) {
    return find(newTaxonomies, (taxonomy) => {
      if (
        taxonomy?.type === 'product_cat' &&
        (taxonomy?.breadcrumbs?.length as number) > 1 &&
        taxonomy?.parentTerm
      ) {
        return true;
      }
    });
  } else {
    return find(taxonomies, (taxonomy) => {
      if (
        taxonomy?.type === 'product_cat' &&
        taxonomy?.breadcrumbs?.length === 1 &&
        !taxonomy?.parentTerm
      ) {
        return true;
      } else if (taxonomy?.type === 'product_brand' && !taxonomy?.parentTerm) {
        return true;
      }
    });
  }
};
