import { Meta, StoryFn } from '@storybook/react';

import { NavbarItem, NavbarItems, NavbarLink } from '@src/components/navbar';
import { NavbarWithOverlay } from '@src/components/navbar/navbar-with-overlay';
import { EmptyCartIcon } from '@src/components/svg/empty-cart';
import { HamburgerIcon } from '@src/components/svg/hamburger';
import { HeartIcon } from '@src/components/svg/heart';
import { PhoneIcon } from '@src/components/svg/phone';

export default {
  component: NavbarWithOverlay,
  tags: ['autodocs'],
  title: 'Components/Navbar/MobileNavbar',
  parameters: {
    viewport: {
      defaultViewport: 'xs',
    },
  },
} as Meta;

const HamburgerContent = (
  <NavbarItems isVertical>
    <NavbarLink href="/">
      Link 1
      <NavbarItems
        isSubmenu
        isVertical
      >
        <NavbarLink href="/">Link 1</NavbarLink>
        <NavbarLink href="/">Link 2</NavbarLink>
        <NavbarLink href="/">Link 3</NavbarLink>
        <NavbarLink href="/">Link 4</NavbarLink>
      </NavbarItems>
    </NavbarLink>
    <NavbarLink href="/">Link 2</NavbarLink>
    <NavbarLink href="/">Link 3</NavbarLink>
    <NavbarLink href="/">Link 4</NavbarLink>
  </NavbarItems>
);

const Template: StoryFn<typeof NavbarWithOverlay> = (args) => (
  <NavbarWithOverlay
    className="text-black"
    {...args}
  >
    {({ setIsShowing }) => (
      <>
        <NavbarItems>
          <NavbarItem onClick={() => setIsShowing(true)}>
            <HamburgerIcon />
          </NavbarItem>
        </NavbarItems>
        <NavbarItems>Logo</NavbarItems>
        <NavbarItems>
          <NavbarLink href="/">
            <HeartIcon />
          </NavbarLink>
          <NavbarLink href="/">
            <EmptyCartIcon />
          </NavbarLink>
        </NavbarItems>
      </>
    )}
  </NavbarWithOverlay>
);

export const Default = Template.bind({});
Default.args = { className: 'border-b' };

const WithPositionRightTemplate: StoryFn<typeof NavbarWithOverlay> = (args) => (
  <NavbarWithOverlay
    className="text-black"
    {...args}
  >
    {({ setIsShowing }) => (
      <>
        <NavbarItems>
          <NavbarItem onClick={() => setIsShowing(true)}>
            <HamburgerIcon />
          </NavbarItem>
        </NavbarItems>
        <NavbarItems>Logo</NavbarItems>
        <NavbarItems position="right">
          <NavbarLink href="/">
            <HeartIcon />
          </NavbarLink>
          <NavbarLink href="/">
            <EmptyCartIcon />
          </NavbarLink>
        </NavbarItems>
      </>
    )}
  </NavbarWithOverlay>
);

export const WithItemsRight = WithPositionRightTemplate.bind({});
WithItemsRight.args = { ...Default.args };

const WithPositionCenterTemplate: StoryFn<typeof NavbarWithOverlay> = (args) => (
  <NavbarWithOverlay
    className="text-black"
    {...args}
  >
    {({ setIsShowing }) => (
      <>
        <NavbarItems>
          <NavbarItem onClick={() => setIsShowing(true)}>
            <HamburgerIcon />
          </NavbarItem>
        </NavbarItems>
        <NavbarItems position="center">Logo</NavbarItems>
        <NavbarItems position="right">
          <NavbarLink href="/">
            <HeartIcon />
          </NavbarLink>
          <NavbarLink href="/">
            <EmptyCartIcon />
          </NavbarLink>
        </NavbarItems>
      </>
    )}
  </NavbarWithOverlay>
);

export const WithItemsCenter = WithPositionCenterTemplate.bind({});
WithItemsCenter.args = { ...Default.args };

const WithAllMenuPositionsTemplate: StoryFn<typeof NavbarWithOverlay> = (args) => (
  <NavbarWithOverlay
    className="text-black"
    {...args}
  >
    {({ setIsShowing }) => (
      <>
        <NavbarItems>
          <NavbarItem onClick={() => setIsShowing(true)}>
            <HamburgerIcon />
          </NavbarItem>
          <NavbarLink href="/">
            <PhoneIcon />
          </NavbarLink>
        </NavbarItems>
        <NavbarItems position="center">Logo</NavbarItems>
        <NavbarItems position="right">
          <NavbarLink href="/">
            <HeartIcon />
          </NavbarLink>
          <NavbarLink href="/">
            <EmptyCartIcon />
          </NavbarLink>
        </NavbarItems>
      </>
    )}
  </NavbarWithOverlay>
);

export const WithAllMenuPositions = WithAllMenuPositionsTemplate.bind({});
WithAllMenuPositions.args = { ...Default.args };

const WithHamburgerOverlayTemplate: StoryFn<typeof NavbarWithOverlay> = (args) => (
  <NavbarWithOverlay {...args}>
    {({ setIsShowing }) => (
      <>
        <NavbarItems>
          <NavbarItem onClick={() => setIsShowing(true)}>
            <HamburgerIcon />
          </NavbarItem>
          <NavbarLink href="/">
            <PhoneIcon />
          </NavbarLink>
        </NavbarItems>
        <NavbarItems position="center">Logo</NavbarItems>
        <NavbarItems position="right">
          <NavbarLink href="/">
            <HeartIcon />
          </NavbarLink>
          <NavbarLink href="/">
            <EmptyCartIcon />
          </NavbarLink>
        </NavbarItems>
      </>
    )}
  </NavbarWithOverlay>
);

export const WithHamburgerOverlay = WithHamburgerOverlayTemplate.bind({});
WithHamburgerOverlay.args = {
  content: HamburgerContent,
};
