import { ParsedBlock } from '@src/components/blocks';
import { useProductsWidgetContext } from '@src/context/products-widget';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { BlockAttributes } from '@src/lib/block/types';
import { Spinner } from '@components/svg/spinner';
import { useEffect, useState } from 'react';
import { getSvgContent } from '@src/components/blocks/outermost/IconBlock';

type Props = {
  block: ParsedBlock;
};

export const PrevPage = ({ block }: Props) => {
  const svgContent = getSvgContent(block.innerHTML);
  const attribute = block.attrs as BlockAttributes;
  const {
    data,
    loading,
    queryVars: [, setQueryVars],
  } = useProductsWidgetContext();

  const [isLoading, setIsloading] = useState(false);

  const hasPreviousPage = data?.pageInfo.hasPreviousPage;
  const previusPage = data?.pageInfo.previousPage;

  const handlePrevPage = () => {
    if (!hasPreviousPage) {
      return;
    }
    setIsloading(true);
    setQueryVars((prev) => {
      return {
        ...prev,
        page: previusPage,
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
      className={attribute.className}
      onClick={handlePrevPage}
      disabled={!loading && !hasPreviousPage}
    >
      {isLoading ? <Spinner className="w-4 m-0" /> : <ReactHTMLParser html={svgContent} />}
    </button>
  );
};
