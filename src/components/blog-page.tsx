import { Content } from '@src/components/blocks/content';
import { defaultLayout } from '@src/components/layouts/default';
import { PageSeo } from '@src/components/page-seo';
import { ITSPage } from '@src/lib/typesense/types';
import siteData from '@public/site.json';

import type { NextPageWithLayout } from '@src/pages/_app';
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getPageBySlug } from '@src/lib/typesense/page';
import { getPosts, GetPostsResponse } from '@src/lib/typesense/post';
import { BlogContextProvider } from '@src/context/blog-context';

interface Props {
  country: string;
  pageData: ITSPage | null;
  postList: ITSPage[];
  found: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
  recentPosts: ITSPage[];
}

interface Params extends ParsedUrlQuery {
  country: string;
  page?: string;
}

export const getBlogStaticProps = async (context: GetStaticPropsContext<Params>) => {
  const params = context.params;
  const country = params?.country;
  const page = params?.page;

  const pageData = await getPageBySlug(siteData.blogPageSlug);

  const getPostsResponse = await getPosts({
    page: page ? parseInt(page) : undefined,
  });

  const recentPosts = await getPosts({ page: 1 });

  return {
    props: {
      pageData,
      country,
      postList: getPostsResponse?.posts,
      found: getPostsResponse?.found,
      currentPage: page ? parseInt(page) : 1,
      perPage: getPostsResponse?.perPage,
      totalPages: getPostsResponse?.totalPages,
      recentPosts: recentPosts?.posts,
    },
    revalidate: 43200, // Refresh the generated page every 12 hours,
  };
};

const Blog: NextPageWithLayout<Props> = (props) => {
  console.log('props.postList', props.postList);
  console.log('props.found', props.found);
  console.log('props.currentPage', props.currentPage);
  console.log('props.totalPages', props.totalPages);
  console.log('props.perPage', props.perPage);
  console.log('props.recentPosts', props.recentPosts);
  return (
    <>
      {props.pageData && <PageSeo seoFullHead={props.pageData.seoFullHead} />}
      <BlogContextProvider
        postList={[]}
        found={0}
        currentPage={1}
        totalPages={1}
        perPage={10}
        recentPosts={[]}
      >
        <div className="blog font-primary">
          {props.pageData?.rawContent && <Content content={props.pageData?.rawContent} />}
        </div>
      </BlogContextProvider>
    </>
  );
};

Blog.getLayout = defaultLayout;

export default Blog;
