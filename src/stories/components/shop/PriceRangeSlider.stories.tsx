import { Meta, StoryFn } from '@storybook/react';

import { PriceRangeSlider } from '@src/features/product/range/price-range-slider';

export default {
  component: PriceRangeSlider,
  tags: ['autodocs'],
  title: 'Components/Shop/RangeSlider',
  decorators: [
    (Story) => (
      <div className="m-[100px]">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<typeof PriceRangeSlider> = (args) => <PriceRangeSlider {...args} />;

export const Default = Template.bind({});
Default.args = {
  min: 0,
  max: 5000,
  color: '#4A5468',
  height: 4,
  thumbBorderColor: '#fff',
};
