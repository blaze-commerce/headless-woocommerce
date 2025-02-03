import React from 'react';
import createCtx from '@src/context/create-ctx';
import { ITSPage } from '@src/lib/typesense/types';

export type BlogContextValue = {
  postList?: ITSPage[];
  found?: number;
  currentPage?: number;
  perPage?: number;
  totalPages?: number;
  recentPosts?: ITSPage[];
};

export type BlogContextProps = BlogContextValue & {
  children?: React.ReactNode;
};

export const [useBlogContext, BlogContext] = createCtx<BlogContextValue>();

export const BlogContextProvider = (props: BlogContextProps) => {
  const { children, postList, found, currentPage, perPage, totalPages, recentPosts } = props;

  const providerValue: BlogContextValue = {
    postList,
    found,
    currentPage,
    perPage,
    totalPages,
    recentPosts,
  };

  return <BlogContext value={providerValue}>{children}</BlogContext>;
};
