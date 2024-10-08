import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { BreadCrumbs as DefaultBreadcrumbs } from '@src/features/product/breadcrumbs';
import { useProductContext } from '@src/context/product-context';
import { useSiteContext } from '@src/context/site-context';
import { ProductTaxonomy } from '@src/models/product/types';

import { Settings } from '@src/models/settings';
import { Store } from '@src/models/settings/store';

import {
  generatePreviousBreadcrumbs,
  generateProductBreadcrumbs,
} from '@src/lib/helpers/breadcrumb';
import { BlockComponentProps } from '@src/components/blocks';

export const Breadcrumbs = ({ block }: BlockComponentProps) => {
  const { product } = useProductContext();
  const { settings } = useSiteContext();
  const { query } = useRouter();
  const { store } = settings as Settings;

  let taxonomyData: ProductTaxonomy | null = null;

  if (query?.category) {
    taxonomyData = generatePreviousBreadcrumbs(
      product?.taxonomies as ProductTaxonomy[],
      query?.category as string
    ) as ProductTaxonomy;
  }

  if (isEmpty(taxonomyData)) {
    taxonomyData = generateProductBreadcrumbs(
      product?.taxonomies as ProductTaxonomy[]
    ) as ProductTaxonomy;
  }

  const { breadcrumb = '&gt;' } = store as Store;

  return (
    <DefaultBreadcrumbs
      id={block?.id}
      separator={'>'}
      crumbs={(taxonomyData as ProductTaxonomy)?.breadcrumbs}
      productName={product?.name}
    />
  );
};
