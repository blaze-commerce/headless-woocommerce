import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import { useRouter } from 'next/router';
import { ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks-web';

import { track } from '@src/lib/track';
import { cn } from '@src/lib/helpers/helper';
import { useSearchContext } from '@src/context/search-context';
import { BlockAttributes } from '@src/lib/block/types';

type SearchInputProps = {
  block: ParsedBlock;
};

export const SearchInput = ({ block }: SearchInputProps) => {
  const { showResultState, searchTermState, categoryPermalink } = useSearchContext();
  const router = useRouter();
  const { s } = router.query;

  const [, setShowResult] = showResultState;
  const [searchTerm, setSearchTerm] = searchTermState;

  const { refine } = useSearchBox();
  const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(() => {
      refine(e.target.value);
      track.search(e.target.value);
      return e.target.value;
    });
  };

  useEffect(() => {
    if (s && typeof s === 'string') {
      setSearchTerm(s);
    }
  }, [s, setSearchTerm]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      /**
       * On enter redirect to search page
       */
      event.preventDefault();

      const destinationUrl =
        categoryPermalink || `/search-results?s=${encodeURIComponent(searchTerm)}`;
      if (router.asPath !== destinationUrl) {
        router.push(destinationUrl);
      }
    }
  };

  const attribute = block.attrs as BlockAttributes;

  return (
    <input
      onChange={onSearchTermChange}
      className={cn('w-full bg-transparent', attribute.className)}
      name="search"
      placeholder="Search for products"
      type="text"
      onFocus={() => setShowResult(true)}
      onKeyDown={handleKeyDown}
      value={searchTerm}
    />
  );
};
