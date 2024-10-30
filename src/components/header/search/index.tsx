import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Hits, HitsPerPage, Index, InstantSearch } from 'react-instantsearch-hooks-web';
import { useOnClickOutside } from 'usehooks-ts';

import { CategoryHit } from '@src/components/header/search/category-hit';
import { CustomSearchBox } from '@src/components/header/search/custom-search-box';
import { NoResults } from '@src/components/header/search/no-results';
import { NoResultsBoundary } from '@src/components/header/search/no-results-boundary';
import { PostHit } from '@src/components/header/search/post-hit';
import { ProductHit } from '@src/components/header/search/product-hit';
import { SearchResultsCount } from '@src/components/header/search/search-results-count';
import { useTypesenseContext } from '@src/context/typesense-context';
import { Search as SearchProps } from '@src/models/settings/search';
import { cn } from '@src/lib/helpers/helper';
import TS_CONFIG from '@src/lib/typesense/config';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useSearchContext } from '@src/context/search-context';
import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { BlockAttributes } from '@src/lib/block/types';

type Props = SearchProps & {
  className?: string;
  block?: ParsedBlock;
};

export const Search: React.FC<Props> = (props) => {
  const { searchClient } = useTypesenseContext();
  const { asPath } = useRouter();

  const { searchResultRef, showResultState } = useSearchContext();

  const [, setShowResult] = showResultState;
  useOnClickOutside(searchResultRef, () => {
    setShowResult(false);
  });

  // On router change hide result
  useEffect(() => {
    setShowResult(false);
  }, [asPath]);

  if (!props.block) {
    return null;
  }

  const attribute = props.block.attrs as BlockAttributes;

  return (
    <div
      className={attribute?.className}
      ref={searchResultRef}
    >
      <InstantSearch
        indexName={TS_CONFIG.collectionNames.product}
        searchClient={searchClient}
      >
        <Content content={props.block.innerBlocks} />
      </InstantSearch>
    </div>
  );
};
