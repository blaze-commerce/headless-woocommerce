export const categoryTemplate =
  () => `<!-- wp:group {"layout":{"inherit":true,"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:woocommerce/breadcrumbs /-->

<!-- wp:query-title {"type":"archive","showPrefix":false,"align":"wide","style":{"elements":{"link":{"color":{"text":"var:preset|color|custom-primary"}}}},"textColor":"custom-primary"} /-->

<!-- wp:woocommerce/store-notices /-->

<!-- wp:group {"className":"w-full bg-white","layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group w-full bg-white"><!-- wp:group {"metadata":{"name":"ProductGrid"},"className":"w-full","layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group w-full"><!-- wp:group {"className":"alignwide w-full flex items-center py-3 my-3 border-y gap-6","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"left"}} -->
<div class="wp-block-group alignwide w-full flex items-center py-3 my-3 border-y gap-6"><!-- wp:woocommerce/filter-wrapper {"filterType":"attribute-filter","heading":"Filter by attribute"} -->
<div class="wp-block-woocommerce-filter-wrapper"><!-- wp:woocommerce/attribute-filter {"heading":"","lock":{"remove":true}} -->
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

<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group"><!-- wp:woocommerce/product-results-count /--></div>
<!-- /wp:group -->

<!-- wp:query {"queryId":0,"query":{"perPage":10,"pages":0,"offset":0,"postType":"product","order":"asc","orderBy":"title","author":"","search":"","exclude":[],"sticky":"","inherit":true,"__woocommerceAttributes":[],"__woocommerceStockStatus":["instock","outofstock","onbackorder"]},"namespace":"woocommerce/product-query","metadata":{"name":"ProductGridItems"},"align":"wide"} -->
<div class="wp-block-query alignwide"><!-- wp:post-template {"className":"products-block-post-template","layout":{"type":"grid","columnCount":4},"__woocommerceNamespace":"woocommerce/product-query/product-template"} -->
<!-- wp:woocommerce/product-image {"isDescendentOfQueryLoop":true} /-->

<!-- wp:post-title {"textAlign":"center","level":3,"isLink":true,"fontSize":"medium","__woocommerceNamespace":"woocommerce/product-query/product-title"} /-->

<!-- wp:woocommerce/product-rating {"isDescendentOfQueryLoop":true} /-->

<!-- wp:woocommerce/product-price {"isDescendentOfQueryLoop":true,"textAlign":"center","style":{"spacing":{"margin":{"bottom":"1rem"}}}} /-->
<!-- /wp:post-template -->

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
