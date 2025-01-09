import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { getSvgContent } from '@src/components/blocks/outermost/IconBlock';
import { Spinner } from '@src/components/svg/spinner';
import { useContentContext } from '@src/context/content-context';
import { useProductsWidgetContext } from '@src/context/products-widget';
import { getBlockByName } from '@src/lib/block';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { BlockAttributes } from '@src/lib/block/types';
import { ITSProductQueryResponse, ITSTaxonomyProductQueryVars } from '@src/lib/typesense/types';
import React, { useEffect, useState } from 'react';

type ProductsWidgetPaginationDotsProps = {
  block: ParsedBlock;
};

export const ProductsWidgetPaginationDots = ({ block }: ProductsWidgetPaginationDotsProps) => {
  const MAX_DOTS = 4;
  const { type } = useContentContext();
  const attribute = block.attrs as BlockAttributes;

  const activeDot = getBlockByName(block.innerBlocks, 'ActiveDot');
  const inActiveDot = getBlockByName(block.innerBlocks, 'InactiveDot');

  const {
    block: productsWidgetBlock,
    data,
    loading,
    queryVars: [queryVars, setQueryVars],
  } = useProductsWidgetContext();

  // Since componentProps is JSON stringified objec we have to JSON.parse it
  const componentProps = JSON.parse(productsWidgetBlock.componentProps) as ITSProductQueryResponse;
  const dotsCount = Math.min(componentProps.pageInfo.totalPages, MAX_DOTS);

  const handlePagination = (page: number) => {
    setQueryVars((prev: ITSTaxonomyProductQueryVars) => {
      return {
        ...prev,
        page: page,
      };
    });
  };

  // Since there is no active and inactive dot then no need to show anything
  if (!activeDot || !inActiveDot) {
    return null;
  }

  return (
    <div className={attribute.className}>
      {loading && <Spinner className="w-4 m-0" />}

      {Array.from({ length: dotsCount }, (_, i) => {
        const pageNumber = i + 1;

        return (
          <button
            key={pageNumber}
            onClick={() => handlePagination(pageNumber)}
          >
            <ReactHTMLParser
              html={getSvgContent(
                pageNumber == queryVars.page ? activeDot.innerHTML : inActiveDot.innerHTML
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
