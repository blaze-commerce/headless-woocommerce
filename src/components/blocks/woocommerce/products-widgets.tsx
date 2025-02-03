import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { ProductsWidgetContextProvider } from '@src/context/products-widget';
import { getAttributeValue } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import TSTaxonomy, { getProducts } from '@src/lib/typesense/taxonomy';
import { ITSTaxonomyProductQueryVars } from '@src/lib/typesense/types';
import React from 'react';

type ProductsWidgetProps = {
  block: ParsedBlock;
};

export const productsWidgetDataHandler = async (block: ParsedBlock): Promise<ParsedBlock> => {
  const attribute = block.attrs as BlockAttributes;
  const htmlAttributes = attribute.htmlAttributes ?? [];

  const defaultSortBy = TSTaxonomy.sortOptions()[0];
  const attributePerpage = getAttributeValue(htmlAttributes, 'data-per-page');
  const perPage = attributePerpage ? parseInt(attributePerpage) : 4;

  const attributeOnSale = getAttributeValue(htmlAttributes, 'data-on-sale');
  const onSale = attributeOnSale ? attributeOnSale : undefined;

  const attributeTermSlug = getAttributeValue(htmlAttributes, 'data-product-category-slug');
  const termSlug = attributeTermSlug ? attributeTermSlug : undefined;

  const taxonomySlug = termSlug ? 'product_cat' : undefined;

  const attribbuteFeaturedProducts = getAttributeValue(htmlAttributes, 'data-featured');
  const isFeatured = attribbuteFeaturedProducts ? attribbuteFeaturedProducts : undefined;

  const defaultQueryVars: ITSTaxonomyProductQueryVars = TSTaxonomy.getDefaultTsQueryVars();
  const productQueryVars: ITSTaxonomyProductQueryVars = {
    ...defaultQueryVars,
    sortBy: defaultSortBy?.value as string,
    onSale: onSale,
    isFeatured: isFeatured,
    perPage: perPage,
    termSlug,
    taxonomySlug,
  };

  const products = await getProducts(productQueryVars);
  // We have to stringify the data base it might return undefined value and causes error on static props which doesn't like undefined value
  block.componentProps = JSON.stringify(products);

  return block;
};

export const ProductsWidget = ({ block }: ProductsWidgetProps) => {
  const attribute = block.attrs as BlockAttributes;

  return (
    <ProductsWidgetContextProvider block={block}>
      <div className={attribute.className}>
        <Content content={block.innerBlocks} />
      </div>
    </ProductsWidgetContextProvider>
  );
};
