import React, { createContext, useContext } from 'react';

import { PageTypesenseResponse } from '@src/lib/typesense/page';
import { YotpoReviews } from '@src/lib/types/reviews';

type HomeContextType = Partial<{
  homepageReviews?: YotpoReviews[];
  blogPosts?: PageTypesenseResponse[];
}>;

export const HomeContext = createContext<HomeContextType>({});

export const HomeContextProvider: React.FC<{
  children: React.ReactNode;
  homepageReviews?: YotpoReviews[];
  blogPosts?: PageTypesenseResponse[];
}> = ({ children, homepageReviews, blogPosts }) => {
  return (
    <HomeContext.Provider
      value={{
        homepageReviews,
        blogPosts,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);
