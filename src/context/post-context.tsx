import { ITSPage } from '@src/lib/typesense/types';
import React, { createContext, useContext } from 'react';

type PostContextProps = Partial<{
  post: ITSPage | null;
  children: React.ReactNode;
}>;

export const PostContext = createContext<PostContextProps>({});

export const PostContextProvider = ({ children, post }: PostContextProps) => {
  return <PostContext.Provider value={{ post }}>{children}</PostContext.Provider>;
};

export const usePostContext = () => useContext(PostContext);
