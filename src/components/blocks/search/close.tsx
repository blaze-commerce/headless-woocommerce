import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { BlockAttributes } from '@src/lib/block/types';
import { useSearchContext } from '@src/context/search-context';
import { cn } from '@src/lib/helpers/helper';
import { useContentContext } from '@src/context/content-context';
import { Content } from '@src/components/blocks/content';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';

type SearchCloseProps = {
  block: ParsedBlock;
};

export const SearchClose = ({ block }: SearchCloseProps) => {
  const { showResultState } = useSearchContext();

  if ('core/html' !== block.blockName) {
    return null;
  }

  const [, setShowResult] = showResultState;

  return (
    <button onClick={() => setShowResult((prev) => !prev)}>
      <ReactHTMLParser html={block.innerHTML} />
    </button>
  );
};
