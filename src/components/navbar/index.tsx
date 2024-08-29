import cx from 'classnames';
import { CSSProperties } from 'react';

type NavbarProps = {
  children: React.ReactNode;
  paddingless?: boolean;
  className?: string;
  style?: CSSProperties;
};

const defaultProps = {
  paddingless: true,
};

export const Navbar: React.FC<NavbarProps> = ({ children, paddingless, className, style }) => {
  const classes = cx('container mx-auto flex items-center relative w-full space-x-2.5', {
    'py-4': !paddingless,
  });
  return (
    <div
      className={className}
      style={style}
    >
      <div className={classes}>{children}</div>
    </div>
  );
};

Navbar.defaultProps = defaultProps;

export { NavbarItem } from '@src/components/navbar/navbar-item';
export { NavbarItems } from '@src/components/navbar/navbar-items';
export { NavbarLink } from '@src/components/navbar/navbar-link';

{
  /* <Navbar>
  <Navbar.Items>
    <Navbar.Item></Navbar.Item>
    <Navbar.Item></Navbar.Item>
    <Navbar.Item></Navbar.Item>
  </Navbar.Items>
  <Navbar.Items position="center">
    <Navbar.Item></Navbar.Item>
    <Navbar.Item></Navbar.Item>
    <Navbar.Item></Navbar.Item>
  </Navbar.Items>
  <Navbar.Items position="right">
    <Navbar.Item></Navbar.Item>
    <Navbar.Item></Navbar.Item>
    <Navbar.Item></Navbar.Item>
  </Navbar.Items>
</Navbar>

<Navbar>
  <Navbar.Items>
    <Navbar.Item></Navbar.Item>
    <Navbar.Item></Navbar.Item>
    <Navbar.Item></Navbar.Item>
  </Navbar.Items>
</Navbar> */
}
