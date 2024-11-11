import { ParsedBlock } from '@src/components/blocks';
import { useProductsWidgetContext } from '@src/context/products-widget';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { ITSTaxonomyProductQueryVars } from '@src/lib/typesense/types';
import React from 'react';

type Props = {
  block: ParsedBlock;
};

export const NextPage = ({ block }: Props) => {
  const svgContent = block.innerHTML.match(/<svg[\s\S]*<\/svg>/)?.[0] || '';
  const attribute = block.attrs as BlockAttributes;
  const {
    data,
    queryVars: [, setQueryVars],
  } = useProductsWidgetContext();

  const hasNextpage = data?.pageInfo.hasNextPage;
  const nextPage = data?.pageInfo.nextPage;

  const handleNextPage = () => {
    if (!hasNextpage) {
      return;
    }

    setQueryVars((prev: ITSTaxonomyProductQueryVars) => {
      return {
        ...prev,
        page: nextPage,
      };
    });
  };

  return (
    <button
      className={cn(attribute.className, 'next-page')}
      onClick={handleNextPage}
      // disabled={hasNextpage}
    >
      <ReactHTMLParser html={svgContent} />
    </button>
  );
};
