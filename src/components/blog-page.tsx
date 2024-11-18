import { Content } from '@src/components/blocks/content';
import { defaultLayout } from '@src/components/layouts/default';
import { PageSeo } from '@src/components/page-seo';
import { ITSPage } from '@src/lib/typesense/types';
import siteData from '@public/site.json';

import type { NextPageWithLayout } from '@src/pages/_app';
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getPageBySlug } from '@src/lib/typesense/page';
import { getPosts } from '@src/lib/typesense/post';
import { BlogContextProvider } from '@src/context/blog-context';
import { PageContextProvider } from '@src/context/page-context';

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
  return (
    <>
      {props.pageData && <PageSeo seoFullHead={props.pageData.seoFullHead} />}
      <BlogContextProvider
        postList={props.postList}
        found={props.found}
        currentPage={props.currentPage}
        totalPages={props.totalPages}
        perPage={props.perPage}
        recentPosts={props.recentPosts}
      >
        <PageContextProvider page={props.pageData}>
          <div className="blog font-primary">
            {props.pageData?.rawContent && (
              <Content
                type="page"
                content={props.pageData?.rawContent}
              />
            )}
          </div>
        </PageContextProvider>
      </BlogContextProvider>
    </>
  );
};

Blog.getLayout = defaultLayout;

export default Blog;
