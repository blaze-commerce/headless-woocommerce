import { ParsedBlock } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { defaultLayout } from '@src/components/layouts/default';
import { PageSeo } from '@src/components/page-seo';
import { getAttributeValue, isBlockA } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { getAllBaseContries } from '@src/lib/helpers/country';
import { PageTypesenseResponse } from '@src/lib/typesense/page';
import { getTaxonomyItemPageProps } from '@src/pages/[country]/[taxonomyFrontendSlug]/[...taxonomyItemSlug]';

import type { NextPageWithLayout } from '@src/pages/_app';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Page as TypesensePage } from '@src/lib/typesense/page';
import { find, isEmpty } from 'lodash';
import { PageContextProvider } from '@src/context/page-context';

import PAGE_TEMPLATE from '@public/page.json';
import pageSlugs from '@public/page-slugs.json';
import { ITSPage } from '@src/lib/typesense/types';

interface Props {
  country: string;
  blocks: ParsedBlock[];
  blogs: PageTypesenseResponse[];
  page: ITSPage | null;
}

interface Params extends ParsedUrlQuery {
  country: string;
  pageSlug: string;
}

export const getStaticPaths = async () => {
  const countries = getAllBaseContries();

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
      page: JSON.parse(JSON.stringify(jsonData)) as ITSPage,
      country,
      blogs,
    },
    revalidate: 43200, // Refresh the generated page every 12 hours,
  };
};

const Page: NextPageWithLayout<Props> = (props) => {
  if (!props.page) {
    return null;
  }

  return (
    <div className="page">
      {props.page.seoFullHead && <PageSeo seoFullHead={props.page.seoFullHead} />}
      <PageContextProvider
        blogPosts={props.blogs}
        page={props.page}
      >
        <Content
          type="page"
          content={props.page.template ? PAGE_TEMPLATE : props.blocks}
        />
      </PageContextProvider>
    </div>
  );
};

Page.getLayout = defaultLayout;

export default Page;
