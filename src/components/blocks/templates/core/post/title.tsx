import { BlockComponentProps } from '@src/components/blocks';
import { useContentContext } from '@src/context/content-context';
import { usePageContext } from '@src/context/page-context';
import { usePostContext } from '@src/context/post-context';
import { BlockAttributes } from '@src/lib/block/types';

export const PostTitle = ({ block }: BlockComponentProps) => {
  const { post } = usePostContext();
  const { page } = usePageContext();
  const { type } = useContentContext();

  if (
    'core/post-title' !== block.blockName ||
    ('post' === type && !post) ||
    ('page' === type && !page)
  ) {
    return null;
  }

  const attribute = block.attrs as BlockAttributes;
  const { className } = attribute || {};

  return <h1 className={className}>{'page' === type && page ? page.name : post?.name} </h1>;
};
