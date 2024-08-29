import PRODUCT_DATA from '@public/product.json';

import { Content } from '@src/components/blocks/content';

export const ProductBlock = () => {
  return <Content content={PRODUCT_DATA} />;
};
