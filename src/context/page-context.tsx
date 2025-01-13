import React, { createContext, useContext } from 'react';
import { ITSPage } from '@src/lib/typesense/types';
import { PageTypesenseResponse } from '@src/lib/typesense/page';

type PageContextType = Partial<{
  blogPosts?: PageTypesenseResponse[];
  page: ITSPage | null;
}>;

type ExtendedPageContextType = PageContextType & {
  children: React.ReactNode;
};

export const PageContext = createContext<PageContextType>({});

export const PageContextProvider: React.FC<ExtendedPageContextType> = ({
  children,
  blogPosts,
  page,
}) => {
  return <PageContext.Provider value={{ blogPosts, page }}>{children}</PageContext.Provider>;
};

export const usePageContext = () => useContext(PageContext);
