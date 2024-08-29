import { Meta, StoryFn } from '@storybook/react';

import { Gallery } from '@src/features/product/gallery';
import { gridImages, imageWithVideos, images } from 'src/stories/json/gallery.json';

export default {
  component: Gallery,
  title: 'Components/Product/Gallery',
  decorators: [
    (Story) => (
      <div className="container flex items-center justify-center h-screen mb-10">
        <div className="w-full lg:basis-6/12 xl:basis-6/12 px-4 mb-20">
          <Story />
        </div>
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<typeof Gallery> = (args) => <Gallery {...args} />;

export const Default = Template.bind({});
Default.args = {
  images,
  onSale: false,
  isNew: false,
  isGrid: false,
};

export const WithZoomOnHover = Template.bind({});
WithZoomOnHover.args = {
  images,
  onSale: false,
  isNew: false,
  isGrid: false,
  zoomType: '1',
};

export const WithZoomOnClick = Template.bind({});
WithZoomOnClick.args = {
  images,
  onSale: false,
  isNew: false,
  isGrid: false,
  zoomType: '2',
};

export const WithOnSaleBadge = Template.bind({});
WithOnSaleBadge.args = {
  images,
  onSale: true,
  isNew: false,
  isGrid: false,
};

export const WithNewBadge = Template.bind({});
WithNewBadge.args = {
  images,
  onSale: false,
  isNew: true,
  isGrid: false,
};

export const WithGridLayout = Template.bind({});
WithGridLayout.args = {
  images: gridImages,
  onSale: false,
  isNew: false,
  isGrid: true,
};

export const WithVideo = Template.bind({});
WithVideo.args = {
  images: imageWithVideos,
  onSale: false,
  isNew: false,
  isGrid: false,
  zoomType: '2',
};
