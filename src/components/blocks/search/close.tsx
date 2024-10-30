import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { useSearchContext } from '@src/context/search-context';
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
