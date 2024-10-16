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

type Props = SearchProps & {
  className?: string;
  block: ParsedBlock;
};

export const Search: React.FC<Props> = (props) => {
  const { className, input, results } = props;

  const { searchClient } = useTypesenseContext();
  const { asPath } = useRouter();
  const {
    searchResultRef,
    showResultState,
    searchTermState,
    searchResultsLink,
    shouldRenderSearchResult,
  } = useSearchContext();
  const [, setShowResult] = showResultState;
  const [searchTerm, setSearchTerm] = searchTermState;

  useOnClickOutside(searchResultRef, () => {
    setShowResult(false);
  });

  // On router change hide result
  useEffect(() => {
    setShowResult(false);
  }, [asPath]);

  const renderBlog = () => {
    const { enabled = false } = results.customColors || {};
    return (
      <Index indexName={TS_CONFIG.collectionNames.page}>
        <h3
          className={cn('uppercase mb-2.5 py-2.5', {
            'text-[#303030]': !enabled,
            'text-sm': !results?.header?.font?.size,
            'font-bold': !results?.header?.font?.weight,
          })}
          style={{
            color: results?.header?.font?.color ?? '',
            fontSize: results?.header?.font?.size ?? '',
            fontWeight: results?.header?.font?.weight ?? '',
          }}
        >
          BLOG
        </h3>
        <HitsPerPage
          className="hidden"
          items={[
            {
              label: '5 hits per page',
              value: 5,
              default: true,
            },
          ]}
        />
        <div>
          <Hits hitComponent={PostHit} />
        </div>
        <div className="my-2.5" />
      </Index>
    );
  };

  const renderProducts = () => {
    const productCount = '10';
    const { enabled = false } = results.customColors || {};
    return (
      <Index indexName={TS_CONFIG.collectionNames.product}>
        <h3
          className={cn('uppercase mb-2.5 py-2.5', {
            'text-[#303030]': !enabled,
            'text-sm': !results?.header?.font?.size,
            'font-bold': !results?.header?.font?.weight,
          })}
          style={{
            color: results?.header?.font?.color ?? '',
            fontSize: results?.header?.font?.size ?? '',
            fontWeight: results?.header?.font?.weight ?? '',
          }}
        >
          PRODUCTS
        </h3>
        <HitsPerPage
          className="hidden"
          items={[
            {
              label: `${productCount} hits per page`,
              value: +(productCount as string),
              default: true,
            },
          ]}
        />
        <div className="">
          <Hits
            hitComponent={ProductHit}
            className="product-hits"
          />
        </div>
        <SearchResultsCount searchResultsLink={searchResultsLink} />
        <div className="my-2.5" />
      </Index>
    );
  };

  const renderCategory = () => {
    const { enabled = false } = results.customColors || {};
    const { categoryCount } = results;
    return (
      <Index indexName={TS_CONFIG.collectionNames.taxonomy}>
        <h3
          className={cn('uppercase mb-2.5 py-2.5', {
            'text-[#303030]': !enabled,
            'text-sm': !results?.header?.font?.size,
            'font-bold': !results?.header?.font?.weight,
          })}
          style={{
            color: results?.header?.font?.color ?? '',
            fontSize: results?.header?.font?.size ?? '',
            fontWeight: results?.header?.font?.weight ?? '',
          }}
        >
          CATEGORIES
        </h3>
        <HitsPerPage
          className="hidden"
          items={[
            {
              label: `${categoryCount} hits per page`,
              value: +(categoryCount as string),
              default: true,
            },
          ]}
        />
        <div>
          <Hits hitComponent={CategoryHit} />
        </div>
      </Index>
    );
  };

  const renderSearchResults = () => {
    const {
      enabled = false,
      backgroundColor = '#FFFFFF',
      borderColor,
      color,
    } = results.customColors || {};
    const resultStyles = {
      backgroundColor,
      borderColor,
      color,
    };
    return (
      <div
        className={cn(
          ' rounded-xl mt-2 w-full  md:max-w-[810px] xl:max-w-[1465px] absolute md:-right-1 z-20 shadow-lg border left-0  bg-white',
          {
            'bg-white': !enabled,
          }
        )}
        style={enabled ? resultStyles : undefined}
      >
        <div className="py-2.5 px-6 flex justify-between items-center  border-b border-b-[#E1E3E5]">
          <p className="text-[#888888] text-[10px] md:text-xs lg:text-sm leading-3">
            Showing results for &quot;{searchTerm}&quot;
          </p>
          <XMarkIcon
            onClick={() => setShowResult((prev) => !prev)}
            className="cursor-pointer text-[#B0B0B0] w-6 h-6 border border-[#B0B0B0] rounded-full p-0.5"
          />
        </div>
        <div className="flex flex-col overflow-auto h-[calc(100vh-500px)] xl:h-[calc(100vh-200px)] px-6 ">
          <NoResultsBoundary fallback={<NoResults />}>
            {renderCategory()}
            {renderProducts()}
            {renderBlog()}
          </NoResultsBoundary>
        </div>
      </div>
    );
  };

  return (
    <div
      className=""
      ref={searchResultRef}
    >
      <InstantSearch
        indexName={TS_CONFIG.collectionNames.product}
        searchClient={searchClient}
      >
        <Content content={props.block.innerBlocks} />

        {shouldRenderSearchResult && renderSearchResults()}
      </InstantSearch>
    </div>
  );
};
