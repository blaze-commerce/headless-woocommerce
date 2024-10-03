import React, { createContext, useContext } from 'react';

type ContentContextProps = Partial<{
  type: 'page' | 'post';
  children: React.ReactNode;
}>;

export const ContentContext = createContext<ContentContextProps>({});

export const ContentContextProvider = ({ children, type }: ContentContextProps) => {
  return <ContentContext.Provider value={{ type }}>{children}</ContentContext.Provider>;
};

export const useContentContext = () => useContext(ContentContext);
