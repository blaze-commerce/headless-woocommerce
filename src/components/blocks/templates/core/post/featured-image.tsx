import { BlockComponentProps } from '@src/components/blocks';
import { usePostContext } from '@src/context/post-context';
import { BlockAttributes } from '@src/lib/block/types';
import Image from 'next/image';

export const PostFeaturedImage = ({ block }: BlockComponentProps) => {
  const { post } = usePostContext();

  if ('core/post-featured-image' !== block.blockName || !post || !post.thumbnail) {
    return null;
  }

  const attribute = block.attrs as BlockAttributes;
  const { width, height, className } = attribute || {};

  const finalWidth = width ? parseInt(width.replace('px', '')) : 1;
  const finalHeight = height ? parseInt(height.replace('px', '')) : 1;

  const altText = post.thumbnail.altText ? post.thumbnail.altText : post.thumbnail.title;
  if (!post.thumbnail.src) {
    return null;
  }
  return (
    <Image
      width={finalWidth}
      height={finalHeight}
      alt={altText}
      src={post.thumbnail.src}
      className={className}
    />
  );
};
