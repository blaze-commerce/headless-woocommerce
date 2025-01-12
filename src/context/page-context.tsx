import React, { createContext, useContext } from 'react';
import { ITSPage } from '@src/lib/typesense/types';

type PageContextType = Partial<{
  page: ITSPage | null;
}>;

type ExtendedPageContextType = PageContextType & {
  children: React.ReactNode;
};

export const PageContext = createContext<PageContextType>({});

export const PageContextProvider: React.FC<ExtendedPageContextType> = ({ children, page }) => {
  return <PageContext.Provider value={{ page }}>{children}</PageContext.Provider>;
};

export const usePageContext = () => useContext(PageContext);
