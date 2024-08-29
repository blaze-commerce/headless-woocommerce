import { Meta, StoryFn } from '@storybook/react';

import { CollapsableReadMore } from '@src/components/collapsable-read-more';

export default {
  component: CollapsableReadMore,
  tags: ['autodocs'],
  title: 'Components/CollapsableReadMore',
  decorators: [
    (Story) => (
      <div className="p-4 w-80">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<typeof CollapsableReadMore> = (args) => (
  <CollapsableReadMore {...args}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ratione animi possimus, ex
    eos consequatur. Possimus adipisci pariatur placeat explicabo labore nihil sunt ipsa eveniet
    nam. Possimus nobis vel adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Excepturi ratione animi possimus, ex eos consequatur. Possimus adipisci pariatur placeat
    explicabo labore nihil sunt ipsa eveniet nam. Possimus nobis vel adipisci?
  </CollapsableReadMore>
);

export const Default = Template.bind({});
Default.args = {};

export const CustomHeight = Template.bind({});
CustomHeight.args = {
  maxHeight: 50,
};

export const CustomTexts = Template.bind({});
CustomTexts.args = {
  readMoreText: 'Expand',
  readLessText: 'Condense',
};

export const WithElementsAfter = Template.bind({});
WithElementsAfter.args = {};
WithElementsAfter.decorators = [
  (Story) => (
    <div>
      <Story />
      <h1>Header 1</h1>
    </div>
  ),
];

const OneLLineContent: StoryFn<typeof CollapsableReadMore> = (args) => (
  <CollapsableReadMore {...args}>Lorem ipsum dolor</CollapsableReadMore>
);
export const WithOneLineContent = OneLLineContent.bind({});
WithOneLineContent.args = {};
