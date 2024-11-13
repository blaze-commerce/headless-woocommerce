import React from 'react';
import createCtx from '@src/context/create-ctx';
import { ITSPage } from '@src/lib/typesense/types';
import { GetPostsResponse } from '@src/lib/typesense/post';

export type BlogContextValue = {
  postList: ITSPage[];
  found: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  recentPost: GetPostsResponse;
};

export type BlogContextProps = BlogContextValue & {
  children?: React.ReactNode;
};

export const [useBlogContext, BlogContext] = createCtx<BlogContextValue>();

export const BlogContextProvider = (props: BlogContextProps) => {
  const { children, postList, found, currentPage, perPage, totalPages, recentPost } = props;

  const providerValue: BlogContextValue = {
    postList,
    found,
    currentPage,
    perPage,
    totalPages,
    recentPost,
  };

  return <BlogContext value={providerValue}>{children}</BlogContext>;
};
