import dynamic from 'next/dynamic';
import { Column } from '@src/components/blocks/core/column';
import { Columns } from '@src/components/blocks/core/columns';
import { Container } from '@src/components/blocks/generateblocks/container';
import { CustomerAccount } from '@src/components/blocks/woocommerce/customer-account';
import { Embed } from '@src/components/blocks/embed';
import { Form } from '@src/components/blocks/gravityforms';
import { Grid } from '@src/components/blocks/generateblocks/grid';
import { Heading } from '@src/components/blocks/core/heading';
import { Html } from '@src/components/blocks/core/html';
import { Image } from '@src/components/blocks/wooless/image';
import { List } from '@src/components/blocks/core/list';
import { ListItem } from '@src/components/blocks/core/list-item';
import { MaxMegaMenu } from '@src/components/blocks/maxmegamenu/block';
import { MiniCart } from '@src/components/blocks/woocommerce/mini-cart';
import { Navigation } from '@src/components/blocks/core/navigation';
import { Paragraph } from '@src/components/blocks/core/paragraph';
import { ParsedBlock as GutenbergParsedBlock } from '@wordpress/block-serialization-default-parser';
import { Search } from '@src/components/blocks/fibosearch/search';
import { SiteLogo } from '@src/components/blocks/core/site-logo';
import { Shortcode } from '@src/components/blocks/shortcode';
import { Separator } from '@src/components/blocks/separator';
import { Buttons } from '@src/components/blocks/core/buttons';
import { Button } from '@src/components/blocks/core/button';
import { GenerateBlocksButton } from '@src/components/blocks/generateblocks/button/block';
import { ITSPage, ITSProductQueryResponse } from '@src/lib/typesense/types';
import { PostFeaturedImage } from '@src/components/blocks/templates/core/post/featured-image';
import { PostContent } from '@src/components/blocks/templates/core/post/content';
import { PostTitle } from '@src/components/blocks/templates/core/post/title';
import { PostDate } from '@src/components/blocks/templates/core/post/date';
import { PostAuthorName } from '@src/components/blocks/templates/core/post/author-name';
import { IconBlock } from '@src/components/blocks/outermost/IconBlock';
import { Breadcrumbs } from '@src/components/blocks/templates/breadcrumbs';
import { Cover } from '@src/components/blocks/core/cover';
import { Group } from '@src/components/blocks/core/group';
import { productsWidgetDataHandler } from '@src/components/blocks/woocommerce/products-widgets';
import { getBlockName } from '@src/lib/block';
import { WooCommerceProductTemplate } from '@src/components/blocks/woocommerce/product-collection/product-template';
import { WooCommerceProductTemplateImage } from '@src/components/blocks/woocommerce/product-collection/product-template/product-image';
import { WooCommerceProductCollection } from '@src/components/blocks/woocommerce/product-collection';
import { wooCommerceProductCollectionDataHandler } from '@src/components/blocks/woocommerce/product-collection/real-product-collection';
import { TaxonomyFilterToggle } from '@src/components/blocks/woocommerce/taxonomy-filter-toggle';
import { TaxonomyCatalogSorting } from '@src/components/blocks/woocommerce/taxonomy-catalog-sorting';
import { TaxonomyResultsCount } from '@src/components/blocks/woocommerce/taxonomy-results-count';
import { ProductAddToCartButton } from '@src/components/blocks/woocommerce/product-collection/product-template/product-add-to-cart-button';
import { Table } from '@src/components/blocks/core/table';

const PostTerms = dynamic(() =>
  import('@src/components/blocks/core/post-terms').then((mod) => mod.PostTerms)
);

const WooCommerceBreadcrumbs = dynamic(() =>
  import('@src/components/blocks/woocommerce/breadcrumbs').then((mod) => mod.Breadcrumbs)
);
const WooCommerceProductImageGallery = dynamic(() =>
  import('@src/components/blocks/woocommerce/product-image-gallery').then((mod) => mod.Gallery)
);

const WooCommerceProductRating = dynamic(() =>
  import('@src/components/blocks/woocommerce/product-rating').then((mod) => mod.ProductRating)
);

const WooCommerceProductPrice = dynamic(() =>
  import('@src/components/blocks/woocommerce/product-price').then((mod) => mod.ProductPrice)
);

const PostExcerpt = dynamic(() =>
  import('@src/components/blocks/core/post-excerpt').then((mod) => mod.PostExcerpt)
);

const WooCommerceAddToCartForm = dynamic(() =>
  import('@src/components/blocks/woocommerce/add-to-cart-form').then((mod) => mod.AddToCartForm)
);

const WooCommerceProductMeta = dynamic(() =>
  import('@src/components/blocks/woocommerce/product-meta').then((mod) => mod.ProductMeta)
);

const WooCommerceProductSKU = dynamic(() =>
  import('@src/components/blocks/woocommerce/product-sku').then((mod) => mod.ProductSKU)
);

const WooCommerceProductDetails = dynamic(() =>
  import('@src/components/blocks/woocommerce/product-details').then((mod) => mod.ProductDetails)
);

const WooCommerceRelatedProducts = dynamic(() =>
  import('@src/components/blocks/woocommerce/related-products').then((mod) => mod.RelatedProducts)
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentProps = any | ITSProductQueryResponse;

export interface ParsedBlock extends GutenbergParsedBlock {
  id?: string;
  innerBlocks: ParsedBlock[];
  attrs: {
    className?: string;
    uniqueId?: string;
    [key: string]: unknown;
    metadata?: Partial<{
      name?: string;
    }>;
    htmlAttributes?: Partial<{
      attribute: string;
      value: string;
    }>;
  };
  componentProps?: ComponentProps;
}

export type BlockComponentProps = {
  className?: string;
  data?: ITSPage | null;
  block: ParsedBlock;
};

/**
 * Below are the blocks we currently support that is parseable by our codebase
 */
export const blocks = {
  'core/table': Table,
  'core/column': Column,
  'core/columns': Columns,
  'core/embed': Embed,
  'core/heading': Heading,
  'core/html': Html,
  'core/image': Image,
  'core/buttons': Buttons,
  'core/button': Button,
  'core/list-item': ListItem,
  'core/list': List,
  'core/navigation': Navigation,
  'core/paragraph': Paragraph,
  'core/site-logo': SiteLogo,
  'fibosearch/search': Search,
  'core/search': Search,
  'generateblocks/container': Container,
  'generateblocks/grid': Grid,
  'generateblocks/image': Image,
  'generateblocks/button': GenerateBlocksButton,
  'maxmegamenu/location': MaxMegaMenu,
  'uagb/gf-styler': Form,
  'gravityforms/form': Form,
  'woocommerce/customer-account': CustomerAccount,
  'woocommerce/mini-cart': MiniCart,
  'core/shortcode': Shortcode,
  'core/separator': Separator,
  'core/group': Group,
  'woocommerce/breadcrumbs': WooCommerceBreadcrumbs,
  'woocommerce/product-image-gallery': WooCommerceProductImageGallery,
  'woocommerce/product-rating': WooCommerceProductRating,
  'woocommerce/product-price': WooCommerceProductPrice,
  'woocommerce/add-to-cart-form': WooCommerceAddToCartForm,
  'woocommerce/product-meta': WooCommerceProductMeta,
  'woocommerce/product-sku': WooCommerceProductSKU,
  'woocommerce/product-details': WooCommerceProductDetails,
  'woocommerce/related-products': WooCommerceRelatedProducts,
  'woocommerce/product-collection': WooCommerceProductCollection,
  'woocommerce/product-template': WooCommerceProductTemplate,
  'woocommerce/product-image': WooCommerceProductTemplateImage,
  'core/post-featured-image': PostFeaturedImage,
  'core/post-excerpt': PostExcerpt,
  'core/post-content': PostContent,
  'core/post-title': PostTitle,
  'core/post-date': PostDate,
  'core/post-author-name': PostAuthorName,
  'core/post-terms': PostTerms,
  'outermost/icon-block': IconBlock,
  'yoast-seo/breadcrumbs': Breadcrumbs,
  'core/cover': Cover,
  'woocommerce/filter-wrapper': TaxonomyFilterToggle,
  'woocommerce/catalog-sorting': TaxonomyCatalogSorting,
  'woocommerce/product-results-count': TaxonomyResultsCount,
  'woocommerce/product-button': ProductAddToCartButton,
};

// Define type alias for block names
export type BlockName = keyof typeof blocks;

export const innerBlocksDataHandler = async (block: ParsedBlock): Promise<ParsedBlock> => {
  // Process each inner block recursively
  block.innerBlocks = await Promise.all(
    block.innerBlocks.map(async (innerBlock) => await processBlockData(innerBlock))
  );

  return block;
};

/**
 * Below are the block names that will fetch data serverside. You can add more if a block needs initial data from the server before client renders
 */
export const blockDataHandler = {
  ProductsWidget: productsWidgetDataHandler,
  'generateblocks/container': innerBlocksDataHandler,
  'core/group': innerBlocksDataHandler,
  'woocommerce/product-collection': wooCommerceProductCollectionDataHandler,
};

export type BlockDataHandler = keyof typeof blockDataHandler;

/**
 * This function is meant to get the block data on the server so that block data is initially processed server-side.
 * @param block
 */
export const processBlockData = async (block: ParsedBlock): Promise<ParsedBlock> => {
  const blockName = getBlockName(block);
  const fetcher = blockDataHandler[blockName as BlockDataHandler];
  if (!fetcher) {
    if (block.innerBlocks) {
      // Try processing the inner blocks as those innerblocks might need to fetch data
      return innerBlocksDataHandler(block);
    }

    // No handler found, return the block as-is
    return block;
  }

  // Process the block using the appropriate fetcher/data handler
  return await fetcher(block);
};
