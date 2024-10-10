import { includes } from 'lodash';
import { ACCORDION_TYPE, TABS } from '@src/lib/helpers/constants';
import { BlockComponentProps } from '@src/components/blocks';
import { ProductTabs } from '@src/features/product/product-tabs';

export const ProductDetails = ({ block }: BlockComponentProps) => {
  const { className } = block.attrs;

  const style = includes(className, 'is-style-classic') ? TABS : ACCORDION_TYPE;

  return (
    <ProductTabs
      className={className}
      style={style}
    />
  );
};
