import { BlockComponentProps } from '@src/components/blocks';
import { useProductContext } from '@src/context/product-context';
import { cn } from '@src/lib/helpers/helper';
import Link from 'next/link';

const PostTermNames = {
  product_cat: 'Categories',
  product_tag: 'Tags',
};

export const PostTerms = ({ block }: BlockComponentProps) => {
  const { product } = useProductContext();
  const { className } = block.attrs;

  if (!product || !block.attrs?.term) return null;

  const terms = product?.taxonomies?.filter((term) => term.type === block.attrs.term);

  if (!terms || terms.length === 0) return null;

  return (
    <div className={cn('post-term', block?.id, className)}>
      <span className="post-term__label">
        {PostTermNames[block.attrs.term as keyof typeof PostTermNames]} :
      </span>
      {terms.map((term, index) => (
        <Link
          key={`term-${term.type}-${index}`}
          href={term.url}
          title={term.name}
        >
          {term.name}
        </Link>
      ))}
    </div>
  );
};
