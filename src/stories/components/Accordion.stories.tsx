import { Meta, StoryFn } from '@storybook/react';

import { Accordion } from '@src/components/accordion';

export default {
  component: Accordion,
  tags: ['autodocs'],
  title: 'Components/Accordion',
} as Meta;

const Template: StoryFn<typeof Accordion> = (args) => <Accordion {...args} />;

const MockComponent = () => {
  return <div>This is from a mock component</div>;
};

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      title: 'Description',
      content:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque itaque eius vero numquam vel asperiores quis, non accusamus saepe atque dicta? Soluta et error minus voluptates, quia omnis voluptatibus eveniet.',
    },
    {
      title: 'With HTML',
      content: (
        <div>
          <strong>This is an html</strong>
        </div>
      ),
    },
    {
      title: 'With Component',
      content: <MockComponent />,
    },
  ],
};

export const WithDefaultOpen = Template.bind({});
WithDefaultOpen.args = {
  data: [
    {
      title: 'Description',
      content:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque itaque eius vero numquam vel asperiores quis, non accusamus saepe atque dicta? Soluta et error minus voluptates, quia omnis voluptatibus eveniet.',
    },
    {
      title: 'With HTML',
      content: (
        <div>
          <strong>This is an html</strong>
        </div>
      ),
      isOpen: true,
    },
    {
      title: 'With Component',
      content: <MockComponent />,
    },
  ],
};
