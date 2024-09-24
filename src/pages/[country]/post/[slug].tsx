import { Content } from '@src/components/blocks/content';
import { defaultLayout } from '@src/components/layouts/default';
import { PageSeo } from '@src/components/page-seo';
import { getAllBaseContries } from '@src/lib/helpers/country';
import { getPostBySlug, getPostSlugs } from '@src/lib/typesense/post';
import { ITSPage } from '@src/lib/typesense/types';

import SINGLE_POST_TEMPLATE from '@public/single-post.json';

import type { NextPageWithLayout } from '@src/pages/_app';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { PostContextProvider } from '@src/context/post-context';

interface Props {
  country: string;
  post: ITSPage | null;
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

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context: GetStaticPropsContext<Params>
) => {
  const params = context.params;
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { country, slug } = params;
  const post = await getPostBySlug(slug);

  return {
    props: {
      post,
      country,
    },
    revalidate: 43200, // Refresh the generated page every 12 hours,
  };
};

const Page: NextPageWithLayout<Props> = (props) => {
  return (
    <PostContextProvider post={props.post}>
      <div className="post">
        {props.post?.seoFullHead && <PageSeo seoFullHead={props.post?.seoFullHead} />}
        <Content content={SINGLE_POST_TEMPLATE} />
      </div>
    </PostContextProvider>
  );
};

Page.getLayout = defaultLayout;

export default Page;
