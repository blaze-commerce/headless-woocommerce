import { Content } from '@src/components/blocks/content';
import { defaultLayout } from '@src/components/layouts/default';
import { PageSeo } from '@src/components/page-seo';
import { getAllBaseContries } from '@src/lib/helpers/country';
import { getPostBySlug, getPosts, getPostSlugs } from '@src/lib/typesense/post';
import { ITSPage } from '@src/lib/typesense/types';

import SINGLE_POST_TEMPLATE from '@public/single-post.json';

import type { NextPageWithLayout } from '@src/pages/_app';
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { PostContextProvider } from '@src/context/post-context';
import { BlogContextProvider } from '@src/context/blog-context';

interface Props {
  country: string;
  post: ITSPage | null;
  recentPosts: ITSPage[];
}

interface Params extends ParsedUrlQuery {
  country: string;
  slug: string;
}

export const getStaticPaths = async () => {
  const countries = getAllBaseContries();
  const pageSlugs: string[] = await getPostSlugs();

  const paths = countries.flatMap((country) =>
    pageSlugs.map((slug) => ({
      params: { country, slug },
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext<Params>) => {
  const params = context.params;
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { country, slug } = params;
  const post = await getPostBySlug(slug);

  const recentPosts = await getPosts({ page: 1 });

  return {
    props: {
      post,
      country,
      recentPosts: recentPosts?.posts,
    },
    revalidate: 43200, // Refresh the generated page every 12 hours,
  };
};

const Page: NextPageWithLayout<Props> = (props) => {
  return (
    <>
      {props.post && <PageSeo seoFullHead={props.post.seoFullHead} />}
      <BlogContextProvider recentPosts={props.recentPosts}>
        <PostContextProvider post={props.post}>
          <div className="post">
            <Content
              type="post"
              content={SINGLE_POST_TEMPLATE}
            />
          </div>
        </PostContextProvider>
      </BlogContextProvider>
    </>
  );
};

Page.getLayout = defaultLayout;

export default Page;
