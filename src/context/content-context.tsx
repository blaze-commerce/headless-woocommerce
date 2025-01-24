import { ContentGlobalDataType, ContentPropTypes } from '@src/components/blocks/content';
import React, { createContext, useContext } from 'react';

type ContentContextProps = Partial<{
  type: ContentPropTypes;
  data: ContentGlobalDataType;
  children: React.ReactNode;
}>;

export const ContentContext = createContext<ContentContextProps>({});

export const ContentContextProvider = ({ children, type, data }: ContentContextProps) => {
  return <ContentContext.Provider value={{ type, data }}>{children}</ContentContext.Provider>;
};

export const useContentContext = () => useContext(ContentContext);
