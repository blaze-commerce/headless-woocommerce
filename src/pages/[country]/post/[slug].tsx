import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { defaultLayout } from '@src/components/layouts/default';
import { PageSeo } from '@src/components/page-seo';
import { getAllBaseContries } from '@src/lib/helpers/country';
import { getPostSlugs } from '@src/lib/typesense/post';

import type { NextPageWithLayout } from '@src/pages/_app';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface Props {
  country: string;
  fullHead: string;
  blocks: ParsedBlock[];
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

  console.log('paths', paths);

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

  return {
    props: {
      blocks: [],
      fullHead: '',
      country,
    },
    revalidate: 43200, // Refresh the generated page every 12 hours,
  };
};

const Page: NextPageWithLayout<Props> = (props) => {
  return (
    <div className="post">
      {props.fullHead && <PageSeo seoFullHead={props.fullHead} />}
      POST TEMPLATE
      {/* <Content content={props.blocks} /> */}
    </div>
  );
};

Page.getLayout = defaultLayout;

export default Page;
