import { addIds } from '@src/scripts/utils';
import { parse } from '@wordpress/block-serialization-default-parser';
import { ParsedBlock, processBlockData } from '@src/components/blocks';

export const categoryBlock = `<!-- wp:group {"layout":{"inherit":true,"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:woocommerce/breadcrumbs /-->

<!-- wp:query-title {"type":"archive","showPrefix":false,"align":"wide","className":"color-[#5a768e] uppercase"} /-->

<!-- wp:woocommerce/store-notices /-->

<!-- wp:group {"className":"w-full bg-white p-3 md:p-6","layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group w-full bg-white p-3 md:p-6"><!-- wp:group {"metadata":{"name":"ProductGrid"},"className":"w-full","layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group w-full"><!-- wp:group {"className":"alignwide w-full items-center py-3 my-3 border-y gap-6 md:flex","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"left"}} -->
<div class="wp-block-group alignwide w-full items-center py-3 my-3 border-y gap-6 md:flex"><!-- wp:woocommerce/filter-wrapper {"filterType":"attribute-filter","heading":"Filter by attribute"} -->
<div class="wp-block-woocommerce-filter-wrapper"><!-- wp:woocommerce/attribute-filter {"attributeId":13,"heading":"","lock":{"remove":true}} -->
<div class="wp-block-woocommerce-attribute-filter is-loading"></div>
<!-- /wp:woocommerce/attribute-filter --></div>
<!-- /wp:woocommerce/filter-wrapper -->

<!-- wp:woocommerce/filter-wrapper {"filterType":"active-filters","heading":"Active filters"} -->
<div class="wp-block-woocommerce-filter-wrapper"><!-- wp:woocommerce/active-filters {"heading":"","lock":{"remove":true}} -->
<div class="wp-block-woocommerce-active-filters is-loading"><span aria-hidden="true" class="wc-block-active-filters__placeholder"></span></div>
<!-- /wp:woocommerce/active-filters --></div>
<!-- /wp:woocommerce/filter-wrapper -->

<!-- wp:woocommerce/catalog-sorting {"className":"ml-auto"} /--></div>
<!-- /wp:group -->

<!-- wp:group {"className":"mb-6","layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group mb-6"><!-- wp:woocommerce/product-results-count /--></div>
<!-- /wp:group -->

<!-- wp:query {"queryId":0,"query":{"perPage":10,"pages":0,"offset":0,"postType":"product","order":"asc","orderBy":"title","author":"","search":"","exclude":[],"sticky":"","inherit":false,"__woocommerceAttributes":[],"__woocommerceStockStatus":["instock","outofstock","onbackorder"]},"namespace":"woocommerce/product-query","metadata":{"name":"ProductGridItems"},"align":"wide"} -->
<div class="wp-block-query alignwide"><!-- wp:template-part {"slug":"product-cards","theme":"blazecommerce-child-main"} /-->

<!-- wp:query-pagination {"layout":{"type":"flex","justifyContent":"center"}} -->
<!-- wp:query-pagination-previous /-->

<!-- wp:query-pagination-numbers /-->

<!-- wp:query-pagination-next /-->
<!-- /wp:query-pagination -->

<!-- wp:query-no-results -->
<!-- wp:paragraph -->
<p>
	No products were found matching your selection.</p>
<!-- /wp:paragraph -->
<!-- /wp:query-no-results --></div>
<!-- /wp:query --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->`;

const blocks = parse(categoryBlock) as ParsedBlock[];

export const categoryParsedBlocks = async () => {
  const parsedBlock = await Promise.all(blocks.map((block) => processBlockData(block)));
  if (parsedBlock.length > 0) {
    return parsedBlock;
  }
  return [];
};
