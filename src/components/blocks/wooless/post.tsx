import { ParsedBlock } from '@src/components/blocks';
import { useBlogContext } from '@src/context/blog-context';
import { formatDate } from '@src/lib/block';
import { htmlParser } from '@src/lib/block/react-html-parser';
import { BlockAttributes } from '@src/lib/block/types';
import { capitalizeString } from '@src/lib/helpers';
import { cn } from '@src/lib/helpers/helper';
import { createExcerpt } from '@src/lib/typesense/post';
import { ITSPage } from '@src/lib/typesense/types';
import Image from 'next/image';
import Link from 'next/link';

type PostlistProps = {
  block: ParsedBlock;
};

export const PostItem = ({ post }: { post: ITSPage }) => {
  return (
    <Link
      href={post.permalink}
      className="block"
    >
      <div>
        {post.thumbnail && (
          <Image
            width={300}
            height={300}
            alt={post.name}
            src={post.thumbnail.src}
          />
        )}

        <div className="flex flex-col gap-3">
          <h2 className="font-secondary font-semibold text-primary text-2xl leading-normal">
            {post.name}
          </h2>

          <div className="text-[#777777] text-sm font-bold font-primary leading-normal">
            {formatDate(post.createdAt, 'M j, Y')}{' '}
            {post.author && `by ${capitalizeString(post.author.displayName)}`}
          </div>

          <p className="text-[#777777] text-base font-bold font-primary leading-normal">
            {htmlParser(createExcerpt(post.content))}
          </p>
          <p className="hover:bg-secondary rounded-md self-start capitalize font-primary bg-primary text-primary-foreground w-[203px] h-[45px] px-4 py-2  justify-center items-center gap-2.5 inline-flex">
            Read More
          </p>
        </div>
      </div>
    </Link>
  );
};

export const Pagination = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  return (
    <div className="flex gap-2 my-10 justify-center">
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        return (
          <Link
            key={page}
            href={`/blog/${page == 1 ? '' : `page/${page}`}`}
            className={cn(
              'px-3 py-1 rounded-md border border-primary',
              page === currentPage ? 'bg-primary text-primary-foreground' : ''
            )}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
};

export const Postlist = ({ block }: PostlistProps) => {
  const attribute = block.attrs as BlockAttributes;
  const { postList, currentPage, totalPages } = useBlogContext();

  const page = currentPage ? currentPage : 1;
  return (
    <div className={attribute.className}>
      <div className={'divide-y space-y-5'}>
        {postList &&
          postList.length > 0 &&
          postList.map((post) => (
            <PostItem
              key={post.id}
              post={post}
            />
          ))}
      </div>
      {totalPages && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
        />
      )}
    </div>
  );
};

export const RecentPost = ({ block }: PostlistProps) => {
  const attribute = block.attrs as BlockAttributes;
  const { recentPosts } = useBlogContext();

  return (
    <div className={cn('flex flex-col gap-3', attribute.className)}>
      {recentPosts &&
        recentPosts &&
        recentPosts.length &&
        recentPosts.map((post) => (
          <Link
            href={post.permalink}
            key={post.id}
            className="font-primary text-primary text-sm font-normal leading-normal"
          >
            {post.name}
          </Link>
        ))}
    </div>
  );
};
