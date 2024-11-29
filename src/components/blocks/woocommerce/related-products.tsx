import { BlockComponentProps } from '@src/components/blocks';
import { YouMayAlsoLike } from '@src/features/product/you-may-also-like';
import { RecentlyViewed } from '@src/features/product/recently-viewed';

export const RelatedProducts = ({ block }: BlockComponentProps) => {
  return (
    <>
      <YouMayAlsoLike />
      <RecentlyViewed />
    </>
  );
};
