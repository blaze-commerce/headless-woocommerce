import { ParsedBlock } from '@src/components/blocks';
import { getSvgContent } from '@src/components/blocks/outermost/IconBlock';
import { Spinner } from '@src/components/svg/spinner';
import { useProductsWidgetContext } from '@src/context/products-widget';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { ITSTaxonomyProductQueryVars } from '@src/lib/typesense/types';
import React, { useEffect, useState } from 'react';

type Props = {
  block: ParsedBlock;
};

export const NextPage = ({ block }: Props) => {
  const svgContent = getSvgContent(block.innerHTML);
  const attribute = block.attrs as BlockAttributes;
  const {
    data,
    loading,
    queryVars: [, setQueryVars],
  } = useProductsWidgetContext();

  const [isLoading, setIsloading] = useState(false);

  const hasNextpage = data?.pageInfo.hasNextPage;
  const nextPage = data?.pageInfo.nextPage;

  const handleNextPage = () => {
    if (!hasNextpage) {
      return;
    }
    setIsloading(true);
    setQueryVars((prev: ITSTaxonomyProductQueryVars) => {
      return {
        ...prev,
        page: nextPage,
      };
    });
  };

  useEffect(() => {
    if (!loading) {
      setIsloading(false);
    }
  }, [loading]);

  return (
    <button
      className={cn(attribute.className, 'next-page')}
      onClick={handleNextPage}
      disabled={!loading && !hasNextpage}
    >
      {isLoading ? <Spinner className="w-4 m-0" /> : <ReactHTMLParser html={svgContent} />}
    </button>
  );
};
