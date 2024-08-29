import classNames from 'classnames';

import { SkeletonProductCard } from '@src/components/skeletons/product-card';
import { PRODUCT_PER_PAGE } from '@src/lib/constants/product';

type Props = {
  productColumns?: string;
  productCount?: string;
};

export const SkeletonCategory: React.FC<Props> = ({
  productColumns = '3',
  productCount = `${PRODUCT_PER_PAGE}`,
}) => {
  return (
    <div
      className={classNames('mt-10 grid gap-y-10 gap-x-6 grid-cols-2 sm:grid-cols-2 xl:gap-x-6', {
        'xl:grid-cols-3': productColumns === '3',
        'xl:grid-cols-4': productColumns === '4',
      })}
    >
      {[...new Array(+productCount)].map((_value, index) => (
        <SkeletonProductCard key={index} />
      ))}
    </div>
  );
};
