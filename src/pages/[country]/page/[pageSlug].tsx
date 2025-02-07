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

export const getStaticPaths = async () => {
  const countries = getAllBaseContries();

  // Filter out trashed pages
  const validSlugs = pageSlugs.filter(
    (slug) => !slug.includes('__trashed') && !slug.match(/__trashed-\d+$/)
  );

  const paths = countries.flatMap((country) =>
    validSlugs.map((pageSlug) => ({
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
      blocks.map((block) => {
        let safeAttrs = {};
        try {
          safeAttrs = typeof block.attrs === 'string' ? JSON.parse(block.attrs) : block.attrs || {};
        } catch (e) {
          // console.error('Error parsing block attrs:', e);
        }

        return processBlockData({
          ...block,
          attrs: safeAttrs as { [key: string]: unknown },
          innerBlocks: Array.isArray(block.innerBlocks) ? block.innerBlocks : [],
        });
      })
    );

    const filteredBlocks = processedBlocks.filter(Boolean);
    const safeProps = {
      blocks: filteredBlocks,
      page: pageData || null,
      country: country || '',
    };

    return {
      props: safeProps,
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
