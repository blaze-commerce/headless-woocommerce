import React, { createContext, useContext } from 'react';
import { ITSPage } from '@src/lib/typesense/types';
import { PageTypesenseResponse } from '@src/lib/typesense/page';
import { YotpoReviews } from '@src/lib/types/reviews';

type PageContextType = Partial<{
  homepageReviews?: YotpoReviews[];
  blogPosts?: PageTypesenseResponse[];
  page: ITSPage | null;
}>;

type ExtendedPageContextType = PageContextType & {
  children: React.ReactNode;
};

export const PageContext = createContext<PageContextType>({});

export const PageContextProvider: React.FC<ExtendedPageContextType> = ({
  children,
  homepageReviews,
  blogPosts,
  page,
}) => {
  return (
    <PageContext.Provider value={{ homepageReviews, blogPosts, page }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => useContext(PageContext);
