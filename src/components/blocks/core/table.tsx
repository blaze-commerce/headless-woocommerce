import { BlockComponentProps } from '@src/components/blocks';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

export const Table = ({ block }: BlockComponentProps) => {
  if ('core/table' !== block.blockName) {
    return null;
  }

  return <ReactHTMLParser html={block.innerHTML} />;
};
