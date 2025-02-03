import React, { useEffect, useMemo, useState } from 'react';
import { ParsedBlock } from '@src/components/blocks';
import { BlockAttributes } from '@src/lib/block/types';
import createCtx from '@src/context/create-ctx';
import TSTaxonomy from '@src/lib/typesense/taxonomy';
import { ITSProductQueryResponse, ITSTaxonomyProductQueryVars } from '@src/lib/typesense/types';
import { useFetchTsTaxonomyProducts } from '@src/lib/hooks';
import { Product } from '@src/models/product';
import { getAttributeValue } from '@src/lib/block';
import { useWindowSize } from 'usehooks-ts';

export type ProductsWidgetContextValue = {
  block: ParsedBlock;
  loading: boolean;
  isFetched: boolean;
  products: Product[];
  queryVars: [
    ITSTaxonomyProductQueryVars,
    React.Dispatch<React.SetStateAction<ITSTaxonomyProductQueryVars>>
  ];
  data?: ITSProductQueryResponse;
};

export type ProductsWidgetContextProps = {
  children?: React.ReactNode;
  block: ParsedBlock;
};

export const [useProductsWidgetContext, ProductsWidgetContext] =
  createCtx<ProductsWidgetContextValue>();

export const ProductsWidgetContextProvider = (props: ProductsWidgetContextProps) => {
  const { block, children } = props;
  const { width } = useWindowSize();

  // Since componentProps is JSON stringified objec we have to JSON.parse it
  const componentProps = JSON.parse(block.componentProps) as ITSProductQueryResponse;

  const perPage = componentProps.queryVars.perPage;

  const [tsQueryVars, setTsQueryVars] = useState(componentProps.queryVars);
  const cachedTsQueryVars = useMemo(() => tsQueryVars, [tsQueryVars]);

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

  const [productsData, setProductsData] = useState<Product[]>(
    Product.buildFromResponseArray(componentProps?.products) ?? []
  );

  const { loading, data, isFetched } = useFetchTsTaxonomyProducts(cachedTsQueryVars, true);

  useEffect(() => {
    if (typeof data !== 'undefined') {
      setProductsData(() => {
        // Return new data
        return Product.buildFromResponseArray(data?.products);
      });
    }
  }, [data]);

  const providerValue: ProductsWidgetContextValue = {
    block: block,
    loading,
    products: productsData,
    isFetched,
    queryVars: [tsQueryVars, setTsQueryVars],
    data,
  };

  return <ProductsWidgetContext value={providerValue}>{children}</ProductsWidgetContext>;
};
