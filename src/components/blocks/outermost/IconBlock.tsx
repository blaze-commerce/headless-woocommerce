import { ParsedBlock } from '@src/components/blocks';
import { Hamburger } from '@src/components/blocks/maxmegamenu/hamburger';
import { NextPage } from '@src/components/blocks/templates/products-widget/next-page';
import { PrevPage } from '@src/components/blocks/templates/products-widget/prev-page';
import { isBlockNameA } from '@src/lib/block';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type IconBlockProps = {
  block: ParsedBlock;
};

export const IconBlock = ({ block }: IconBlockProps) => {
  if ('outermost/icon-block' !== block.blockName && !block.innerBlocks[0]) {
    return null;
  }

  if (isBlockNameA(block, 'ProductsWidgetNextPage')) {
    return <NextPage block={block} />;
  }

  if (isBlockNameA(block, 'ProductsWidgetPrevPage')) {
    return <PrevPage block={block} />;
  }

  if (isBlockNameA(block, 'MenuHamburger')) {
    return <Hamburger block={block} />;
  }

  const svgContent = block.innerHTML.match(/<svg[\s\S]*<\/svg>/)?.[0] || '';
  return <ReactHTMLParser html={svgContent} />;
};
