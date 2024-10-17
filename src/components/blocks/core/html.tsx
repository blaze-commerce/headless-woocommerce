import { isBlockNameA } from '@src/lib/block';
import parse from 'html-react-parser';
import { Hamburger } from '@src/components/blocks/maxmegamenu/hamburger';
import { ParsedBlock } from '@src/components/blocks';
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

  return <>{parse(block.innerHTML)}</>;
};
