import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { productCollectionPlaceHolderBlocks } from '@src/components/blocks/woocommerce/product-collection';
import { getBlockName } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { useFetchTsTaxonomyProducts } from '@src/lib/hooks';
import TSTaxonomy, { getProducts } from '@src/lib/typesense/taxonomy';
import { ITSProductQueryResponse, ITSTaxonomyProductQueryVars } from '@src/lib/typesense/types';
import { Product } from '@src/models/product';
import { useEffect, useMemo, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

export type RealWooCommerceProductCollectionQueryResponse = {
  block: ParsedBlock;
  loading: boolean;
  isFetched: boolean;
  products: Product[];
  queryState: [
    ITSTaxonomyProductQueryVars,
    React.Dispatch<React.SetStateAction<ITSTaxonomyProductQueryVars>>
  ];
  data?: ITSProductQueryResponse;
};

export const wooCommerceProductCollectionDataHandler = async (
  block: ParsedBlock
): Promise<ParsedBlock> => {
  const blockName = getBlockName(block);
  const placeHolderBlocks = Object.keys(productCollectionPlaceHolderBlocks);
  if (blockName && placeHolderBlocks.includes(blockName)) {
    // This is for server query and since we don't have server query for this block we will return the block as it is
    return block;
  }

  const { query } = block.attrs as BlockAttributes;
  if (!query) {
    // If query is undefined then return the block as it is
    return block;
  }

  const defaultSortBy = TSTaxonomy.sortOptions()[0];
  const perPage = query.perPage ?? 4;
  const onSale = query.woocommerceOnSale ? 'true' : undefined;
  const taxonomySlug = query.taxQuery.product_cat ? 'product_cat' : undefined;
  const isFeatured = query.featured ? 'true' : undefined;

  const defaultQueryVars: ITSTaxonomyProductQueryVars = TSTaxonomy.getDefaultTsQueryVars();
  const productQueryVars: ITSTaxonomyProductQueryVars = {
    ...defaultQueryVars,
    sortBy: defaultSortBy?.value as string,
    onSale: onSale,
    isFeatured: isFeatured,
    perPage: perPage,
    termIds: query.taxQuery.product_cat,
    taxonomySlug,
  };

  const productQueryResponse = await getProducts(productQueryVars);
  // We have to stringify the data base it might return undefined value and causes error on static props which doesn't like undefined value
  block.componentProps = JSON.stringify(productQueryResponse);

  return block;
};

export const RealWooCommerceProductCollection = ({ block }: { block: ParsedBlock }) => {
  const { width } = useWindowSize();
  const queryResponse = JSON.parse(block.componentProps) as ITSProductQueryResponse;

  const perPage = queryResponse.queryVars.perPage;
  const [tsQueryVars, setTsQueryVars] = useState(queryResponse.queryVars);
  const cachedTsQueryVars = useMemo(() => tsQueryVars, [tsQueryVars]);
  const [productsData, setProductsData] = useState<Product[]>(
    Product.buildFromResponseArray(queryResponse?.products) ?? []
  );

  useEffect(() => {
    let widthBasedPerPage = perPage;
    if (width < 768) {
      widthBasedPerPage = 2;
    } else if (width >= 768 && width <= 1024) {
      widthBasedPerPage = 3;
    }

    setTsQueryVars((prevProps) => {
      return {
        ...prevProps,
        perPage: widthBasedPerPage,
      };
    });
  }, [width, perPage]);

  const { loading, data, isFetched } = useFetchTsTaxonomyProducts(cachedTsQueryVars, true);

  useEffect(() => {
    if (typeof data !== 'undefined') {
      setProductsData(() => {
        // Return new data
        return Product.buildFromResponseArray(data?.products);
      });
    }
  }, [data]);

  if ('woocommerce/product-collection' !== block.blockName) {
    return null;
  }

  const attributes = block.attrs as BlockAttributes;

  const globalData: RealWooCommerceProductCollectionQueryResponse = {
    block: block,
    loading,
    products: productsData,
    isFetched,
    queryState: [tsQueryVars, setTsQueryVars],
    data,
  };

  return (
    <div className={attributes.className}>
      <Content
        type="products-query-response"
        globalData={globalData}
        content={block.innerBlocks}
      />
    </div>
  );
};
