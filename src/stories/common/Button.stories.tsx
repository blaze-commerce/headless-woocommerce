import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@components/button';

export default {
  component: Button,
  title: 'common/Button',
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Checkout now',
};

export const WithLoader = Template.bind({});
WithLoader.args = {
  children: 'Checkout now',
  loading: true,
};

{
  /* <Button loading={true} /> */
}
