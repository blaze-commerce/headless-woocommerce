import { ParsedBlock } from '@src/components/blocks';
import { useContentContext } from '@src/context/content-context';
import { usePageContext } from '@src/context/page-context';
import { usePostContext } from '@src/context/post-context';
import { Separator } from '@src/features/product/breadcrumbs';
import { BlockAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { decode } from 'html-entities';
import Link from 'next/link';
import React, { Fragment } from 'react';

type Props = {
  block: ParsedBlock;
};

export const Breadcrumbs = ({ block }: Props) => {
  const { post } = usePostContext();
  const { page } = usePageContext();
  const { type } = useContentContext();

  if (
    'yoast-seo/breadcrumbs' !== block.blockName ||
    ('post' === type && !post) ||
    ('page' === type && !page)
  ) {
    return null;
  }
  const attribute = block.attrs as BlockAttributes;

  const breadcrumbs =
    'post' === type ? post?.breadcrumbs : 'page' === type ? page?.breadcrumbs : [];

  return (
    <div className={cn('breadcrumbs', attribute.className)}>
      {breadcrumbs &&
        breadcrumbs?.length > 0 &&
        breadcrumbs?.map((breadcrumb, index) => {
          if (!breadcrumb.url) {
            return (
              <span
                className="text-black"
                key={index}
              >
                {decode(breadcrumb.title)}
              </span>
            );
          }
          return (
            <Fragment key={index}>
              <Link href={breadcrumb.url}>{breadcrumb.title}</Link>
              <Separator separator=">" />
            </Fragment>
          );
        })}
    </div>
  );
};
