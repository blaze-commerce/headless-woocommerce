import { Meta, StoryFn } from '@storybook/react';

import { LoadingModal } from '@src/components/common/loading-modal';
import { ProductCard } from '@src/features/product/cards/product-card';
import { ProductGrid } from '@src/features/product/grids/product-grid';
import { Product } from '@src/models/product';

const product = Product.buildFromResponse({
  name: '[Sample Product]',
  permalink: '',
  price: {
    AUD: 0,
  },
  regularPrice: {
    AUD: 0,
  },
  salePrice: {
    AUD: 0,
  },
  stockStatus: 'instock',
  variations: [],
});

export default {
  component: LoadingModal,
  title: 'common/LoadingModal',
  decorators: [
    (Story) => (
      <>
        <Story />
        <ProductGrid>
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
        </ProductGrid>
      </>
    ),
  ],
} as Meta;

const Template: StoryFn<typeof LoadingModal> = (args) => <LoadingModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};
