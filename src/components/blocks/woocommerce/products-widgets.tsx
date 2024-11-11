import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { ProductsWidgetContextProvider } from '@src/context/products-widget';
import { BlockAttributes } from '@src/lib/block/types';
import React from 'react';

type ProductsWidgetProps = {
  block: ParsedBlock;
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
