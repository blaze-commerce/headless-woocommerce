import { isBlockNameA } from '@src/lib/block';
import { Hamburger } from '@src/components/blocks/maxmegamenu/hamburger';
import { ParsedBlock } from '@src/components/blocks';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { SearchClose } from '@src/components/blocks/search/close';
type Props = {
  block: ParsedBlock;
};

export const Html = ({ block }: Props) => {
  if ('core/html' !== block.blockName) {
    return null;
  }

  if (isBlockNameA(block, 'MenuHamburger')) {
    return <Hamburger block={block} />;
  }

  if (isBlockNameA(block, 'SearchClose')) {
    return <SearchClose block={block} />;
  }

  return <ReactHTMLParser html={block.innerHTML} />;
};
