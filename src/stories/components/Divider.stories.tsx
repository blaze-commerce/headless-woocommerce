import { Meta, StoryFn } from '@storybook/react';

import { Divider } from '@src/components/common/divider';

export default {
  component: Divider,
  tags: ['autodocs'],
  title: 'Components/Divider',
  decorators: [
    (Story) => (
      <div className="p-10">
        <h1>Divider Below</h1>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<typeof Divider> = (args) => <Divider {...args} />;

export const Default = Template.bind({});
Default.args = {};
