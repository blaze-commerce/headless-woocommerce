import { Meta, StoryFn } from '@storybook/react';

import { BreadCrumbs } from '@src/features/product/breadcrumbs';

export default {
  component: BreadCrumbs,
  tags: ['autodocs'],
  title: 'Components/BreadCrumbs',
  decorators: [
    (Story) => (
      <div className="basis-full">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<typeof BreadCrumbs> = (args) => <BreadCrumbs {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: 'md:block mb-5',
};
