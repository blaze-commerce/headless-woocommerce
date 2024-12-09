import React, { createContext, useContext, useRef, useState, ReactNode } from 'react';

type SearchContextProps = {
  showResultState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  searchTermState: [string, React.Dispatch<React.SetStateAction<string>>];
  categoryPermalink: string;
  setCategoryPermalink: React.Dispatch<React.SetStateAction<string>>;
  searchResultsLink: string;
  searchResultRef: React.MutableRefObject<null>;
  shouldRenderSearchResult: boolean;
};

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchContextProvider = ({ children }: { children: ReactNode }) => {
  const [showResult, setShowResult] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [categoryPermalink, setCategoryPermalink] = useState('');

  const searchResultsLink = `/search-results?s=${searchTerm}`;
  const searchResultRef = useRef(null);

  return (
    <SearchContext.Provider
      value={{
        showResultState: [showResult, setShowResult],
        searchTermState: [searchTerm, setSearchTerm],
        categoryPermalink,
        setCategoryPermalink,
        searchResultsLink,
        searchResultRef,
        shouldRenderSearchResult: searchTerm.length > 0 && showResult,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchContextProvider');
  }
  return context;
};
