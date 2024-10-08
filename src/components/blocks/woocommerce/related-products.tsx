import { BlockComponentProps } from '@src/components/blocks';
import { FrequentlyBoughtTogether } from '@src/features/product/frequently-bougth-together';
import { YouMayAlsoLike } from '@src/features/product/you-may-also-like';
import { RecentlyViewed } from '@src/features/product/recently-viewed';

export const RelatedProducts = ({ block }: BlockComponentProps) => {
  return (
    <>
      <YouMayAlsoLike />
      <FrequentlyBoughtTogether />
      <RecentlyViewed />
    </>
  );
};
