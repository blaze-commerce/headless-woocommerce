import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { defaultLayout } from '@src/components/layouts/default';
import { PageSeo } from '@src/components/page-seo';
import { getAttributeValue, isBlockA } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { getAllBaseContries } from '@src/lib/helpers/country';
import { getPageSlugs, PageTypesenseResponse } from '@src/lib/typesense/page';
import { getTaxonomyItemPageProps } from '@src/pages/[country]/[taxonomyFrontendSlug]/[...taxonomyItemSlug]';

import type { NextPageWithLayout } from '@src/pages/_app';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Page as TypesensePage } from '@src/lib/typesense/page';
import { find, isEmpty } from 'lodash';
import { HomeContextProvider } from '@src/context/home-context';

interface Props {
  country: string;
  fullHead: string;
  blocks: ParsedBlock[];
  blogs: PageTypesenseResponse[];
}

interface Params extends ParsedUrlQuery {
  country: string;
  pageSlug: string;
}

export const getStaticPaths = async () => {
  const countries = getAllBaseContries();
  const pageSlugs: string[] = await getPageSlugs();

  const paths = countries.flatMap((country) =>
    pageSlugs.map((pageSlug) => ({
      params: { country, pageSlug },
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

  const { country, pageSlug } = params;
  const jsonData = await import(`public/page/${pageSlug}.json`);
  let blogs: PageTypesenseResponse[] = [];

  const blocks = jsonData.blocks.map(async (block: ParsedBlock) => {
    const attribute = block.attrs as BlockAttributes;
    const htmlAttributes = attribute.htmlAttributes ?? [];

    if (isBlockA(block, 'categoryProducts')) {
      const categorySlug = getAttributeValue(htmlAttributes, 'data-category-slug');
      if (categorySlug) {
        const taxonomyItemProps = await getTaxonomyItemPageProps(
          'product-category',
          categorySlug,
          country
        );

        return {
          ...block,
          componentProps: taxonomyItemProps.props,
        };
      }
    }

    const hasBlogPostBlock =
      isBlockA(block, 'BlogPosts') ||
      !isEmpty(find(block?.innerBlocks, (innerBlock) => isBlockA(innerBlock, 'BlogPosts')));

    if (hasBlogPostBlock) {
      const blogPosts = await TypesensePage.findByThumbnail();
      if (!isEmpty(blogPosts)) {
        blogs = blogPosts;
      }
    }

    return block;
  });

  return {
    props: {
      blocks: await Promise.all(blocks),
      fullHead: jsonData.seoFullHead || '',
      country,
      blogs,
    },
    revalidate: 43200, // Refresh the generated page every 12 hours,
  };
};

const Page: NextPageWithLayout<Props> = (props) => {
  return (
    <div className="page">
      {props.fullHead && <PageSeo seoFullHead={props.fullHead} />}
      <HomeContextProvider blogPosts={props.blogs}>
        <Content content={props.blocks} />
      </HomeContextProvider>
    </div>
  );
};

Page.getLayout = defaultLayout;

export default Page;
