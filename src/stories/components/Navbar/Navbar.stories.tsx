import { Meta, StoryFn } from '@storybook/react';

import { Navbar, NavbarItem, NavbarItems, NavbarLink } from '@src/components/navbar';

export default {
  component: Navbar,
  tags: ['autodocs'],
  title: 'Components/Navbar/Navbar',
} as Meta;

const Template: StoryFn<typeof Navbar> = (args) => (
  <Navbar {...args}>
    <NavbarItems>Logo</NavbarItems>
    <NavbarItems>
      <NavbarLink href="/">Link 1</NavbarLink>
      <NavbarLink href="/">Link 2</NavbarLink>
      <NavbarLink href="/">Link 3</NavbarLink>
      <NavbarLink href="/">Link 4</NavbarLink>
    </NavbarItems>
  </Navbar>
);

export const Default = Template.bind({});
Default.args = { className: 'border-b' };

const WithPositionRightTemplate: StoryFn<typeof Navbar> = (args) => (
  <Navbar {...args}>
    <NavbarItems>Logo</NavbarItems>
    <NavbarItems position="right">
      <NavbarLink href="/">Link 1</NavbarLink>
      <NavbarLink href="/">Link 2</NavbarLink>
      <NavbarLink href="/">Link 3</NavbarLink>
      <NavbarLink href="/">My Account</NavbarLink>
    </NavbarItems>
  </Navbar>
);

export const WithItemsRight = WithPositionRightTemplate.bind({});
WithItemsRight.args = { ...Default.args };

const WithPositionCenterTemplate: StoryFn<typeof Navbar> = (args) => (
  <Navbar {...args}>
    <NavbarItems position="center">Logo</NavbarItems>
    <NavbarItems position="right">
      <NavbarLink href="/">Link 1</NavbarLink>
      <NavbarLink href="/">Link 2</NavbarLink>
      <NavbarLink href="/">Link 3</NavbarLink>
      <NavbarLink href="/">My Account</NavbarLink>
    </NavbarItems>
  </Navbar>
);

export const WithItemsCenter = WithPositionCenterTemplate.bind({});
WithItemsCenter.args = { ...Default.args };

const WithAllMenuPositionsTemplate: StoryFn<typeof Navbar> = (args) => (
  <Navbar {...args}>
    <NavbarItems position="center">Logo</NavbarItems>
    <NavbarItems>
      <NavbarLink href="/">1300 155 435</NavbarLink>
      <NavbarLink href="/">hello@blaze.onoline</NavbarLink>
    </NavbarItems>
    <NavbarItems position="right">
      <NavbarLink href="/">Link 1</NavbarLink>
      <NavbarLink href="/">Link 2</NavbarLink>
      <NavbarLink href="/">Link 3</NavbarLink>
      <NavbarLink href="/">My Account</NavbarLink>
    </NavbarItems>
  </Navbar>
);

export const WithAllMenuPositions = WithAllMenuPositionsTemplate.bind({});
WithAllMenuPositions.args = { ...Default.args };

const WithHtmlNavbarItemsTemplate: StoryFn<typeof Navbar> = (args) => (
  <Navbar {...args}>
    <NavbarItems position="center">Logo</NavbarItems>
    <NavbarItems>
      <NavbarItem>
        1300 155 435 <strong>CALL US NOW!</strong>
      </NavbarItem>
      <NavbarItem>
        <label htmlFor="">Search:</label>{' '}
        <input
          type="text"
          className="border rounded w-32"
        />
      </NavbarItem>
    </NavbarItems>
    <NavbarItems position="right">
      <NavbarItem>Not a Link 1</NavbarItem>
      <NavbarItem>Not a Link 2</NavbarItem>
    </NavbarItems>
  </Navbar>
);

export const WithHtmlNavbarItems = WithHtmlNavbarItemsTemplate.bind({});
WithHtmlNavbarItems.args = { ...Default.args };

const WithIconsTemplate: StoryFn<typeof Navbar> = (args) => (
  <Navbar {...args}>
    <NavbarItems>Logo</NavbarItems>
    <NavbarItems position="right">
      <NavbarLink href="/">Link 1</NavbarLink>
      <NavbarLink href="/">Link 2</NavbarLink>
      <NavbarLink href="/">Link 3</NavbarLink>
      <NavbarLink href="/">My Account</NavbarLink>
    </NavbarItems>
  </Navbar>
);

export const WithIcons = WithIconsTemplate.bind({});
WithIcons.args = { ...Default.args };

const WithSubMenusTemplate: StoryFn<typeof Navbar> = (args) => (
  <Navbar {...args}>
    <NavbarItems position="center">Logo</NavbarItems>
    <NavbarItems>
      <NavbarLink href="/">1300 155 435</NavbarLink>
      <NavbarLink href="/">hello@blaze.onoline</NavbarLink>
    </NavbarItems>
    <NavbarItems position="right">
      <NavbarLink href="/">Link 1</NavbarLink>
      <NavbarLink href="/">
        Link 2 with Submenu
        <NavbarItems isSubmenu>
          <NavbarLink href="/">Link 1</NavbarLink>
          <NavbarLink href="/">Link 2</NavbarLink>
          <NavbarLink href="/">Link 3</NavbarLink>
          <NavbarLink href="/">My Account</NavbarLink>
        </NavbarItems>
      </NavbarLink>
      <NavbarLink href="/">Link 3</NavbarLink>
      <NavbarLink href="/">My Account</NavbarLink>
    </NavbarItems>
  </Navbar>
);

export const WithSubMenus = WithSubMenusTemplate.bind({});
WithSubMenus.args = { ...Default.args };
