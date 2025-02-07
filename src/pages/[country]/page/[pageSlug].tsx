import { ParsedBlock, processBlockData } from '@src/components/blocks';
import { Content } from '@src/components/blocks/content';
import { defaultLayout } from '@src/components/layouts/default';
import { PageSeo } from '@src/components/page-seo';
import { getAttributeValue, isBlockA } from '@src/lib/block';
import { BlockAttributes } from '@src/lib/block/types';
import { getAllBaseContries } from '@src/lib/helpers/country';
import { getPageBySlug, PageTypesenseResponse } from '@src/lib/typesense/page';
import { getTaxonomyItemPageProps } from '@src/pages/[country]/[taxonomyFrontendSlug]/[...taxonomyItemSlug]';

import type { NextPageWithLayout } from '@src/pages/_app';

import { ParsedUrlQuery } from 'querystring';
import { Page as TypesensePage } from '@src/lib/typesense/page';
import { find, isEmpty } from 'lodash';
import { PageContextProvider } from '@src/context/page-context';

import PAGE_TEMPLATE from '@public/page.json';
import pageSlugs from '@public/page-slugs.json';
import { ITSPage } from '@src/lib/typesense/types';
import { GetStaticProps, GetStaticPropsContext } from 'next/dist/types';
import { parse } from '@wordpress/block-serialization-default-parser';
import { addIds } from '@src/scripts/utils';
import cleanDeep from 'clean-deep';

interface Props {
  country: string;
  blocks: ParsedBlock[];
  page: ITSPage | null;
}

interface Params extends ParsedUrlQuery {
  country: string;
  pageSlug: string;
}

interface BlockAttrs {
  className?: string;
  uniqueId?: string;
  metadata?: Partial<{ name?: string }>;
  htmlAttributes?: Partial<{ attribute: string; value: string }>;
  [key: string]: unknown;
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

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  if (!context.params) {
    return { notFound: true };
  }

  const { country, pageSlug } = context.params;

  try {
    const pageData = await getPageBySlug(pageSlug);
    if (!pageData?.rawContent) {
      return { notFound: true };
    }

    const parsedBlocks = parse(pageData.rawContent);
    if (!Array.isArray(parsedBlocks)) {
      return { notFound: true };
    }

    const blocks = addIds(parsedBlocks as ParsedBlock[]);
    const processedBlocks = await Promise.all(
      blocks.map((block) =>
        processBlockData({
          ...block,
          attrs: (block.attrs as { [key: string]: unknown }) || {},
          innerBlocks: block.innerBlocks || [],
        })
      )
    );

    const cleanedProps = cleanDeep({
      blocks: processedBlocks.filter(Boolean),
      page: pageData || null,
      country: country || '',
    });

    // Ensure the props are JSON-serializable
    return {
      props: JSON.parse(JSON.stringify(cleanedProps)),
      revalidate: 43200,
    };
  } catch (error) {
    return { notFound: true };
  }
};

const Page: NextPageWithLayout<Props> = ({ page, blocks }) => {
  if (!page) {
    return null;
  }

  const content = page.template ? (PAGE_TEMPLATE as ParsedBlock[]) : (blocks as ParsedBlock[]);

  return (
    <div className="page">
      {page.seoFullHead && <PageSeo seoFullHead={page.seoFullHead} />}
      <PageContextProvider page={page}>
        <Content
          type="page"
          content={content}
        />
      </PageContextProvider>
    </div>
  );
};

Page.getLayout = defaultLayout;

export default Page;
