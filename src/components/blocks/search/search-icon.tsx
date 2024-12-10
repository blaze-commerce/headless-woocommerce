import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { useSearchContext } from '@src/context/search-context';
import { ReactHTMLParser } from '@src/lib/block/react-html-parser';
import { useRouter } from 'next/router';

type SearchIconProps = {
  block: ParsedBlock;
};

export const SearchIcon = ({ block }: SearchIconProps) => {
  const { searchTermState, categoryPermalink } = useSearchContext();
  const router = useRouter();

  const [searchTerm] = searchTermState;

  if ('core/html' !== block.blockName) {
    return null;
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (searchTerm) {
      const destinationUrl =
        categoryPermalink || `/search-results?s=${encodeURIComponent(searchTerm)}`;
      if (router.asPath !== destinationUrl) {
        router.push(destinationUrl);
      }
    }
  };

  return (
    <button onClick={handleClick}>
      <ReactHTMLParser html={block.innerHTML} />
    </button>
  );
};
