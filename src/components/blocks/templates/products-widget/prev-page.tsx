import { ParsedBlock } from '@src/components/blocks';
import { useProductsWidgetContext } from '@src/context/products-widget';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { BlockAttributes } from '@src/lib/block/types';
import React from 'react';

type Props = {
  block: ParsedBlock;
};

export const PrevPage = ({ block }: Props) => {
  const svgContent = block.innerHTML.match(/<svg[\s\S]*<\/svg>/)?.[0] || '';
  const attribute = block.attrs as BlockAttributes;
  const {
    data,
    queryVars: [, setQueryVars],
  } = useProductsWidgetContext();

  const hasPreviousPage = data?.pageInfo.hasPreviousPage;
  const previusPage = data?.pageInfo.previousPage;

  const handlePrevPage = () => {
    if (!hasPreviousPage) {
      return;
    }

    setQueryVars((prev) => {
      return {
        ...prev,
        page: previusPage,
      };
    });
  };
  return (
    <button
      className={attribute.className}
      onClick={handlePrevPage}
    >
      <ReactHTMLParser html={svgContent} />
    </button>
  );
};
