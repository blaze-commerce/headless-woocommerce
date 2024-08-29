import { Meta, StoryFn } from '@storybook/react';

import { Input } from '@components/form/Input';

export default {
  component: Input,
  title: 'form/Input',
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Name',
  name: 'input-1',
};

export const Inline = Template.bind({});
Inline.args = {
  label: 'Name',
  name: 'input-1',
  inline: true,
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: 'Name',
  name: 'input-1',
  inline: true,
  value: 'test',
};
