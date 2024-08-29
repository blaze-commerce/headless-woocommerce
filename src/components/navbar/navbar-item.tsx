import cx from 'classnames';

import { useSiteContext } from '@src/context/site-context';
import { Settings } from '@src/models/settings';

type NavbarItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const defaultProps = {
  onClick: undefined,
};

export const NavbarItem: React.FC<NavbarItemProps> = ({ children, className, onClick }) => {
  const { settings } = useSiteContext();
  const { header } = settings as Settings;
  const classes = cx('navbar-item flex items-center', className, {
    'cursor-pointer': !!onClick,
    'after:content-["|"] last-of-type:after:content-[""] after:text-2xl after:font-thin after:text-[#EBEBEB]':
      header?.layout?.navIconSeparator,
  });
  return (
    <li className={classes}>
      <div
        className="py-4 lg:px-2 cursor-pointer w-full flex items-center space-x-2.5"
        onClick={onClick}
      >
        {children}
      </div>
    </li>
  );
};

NavbarItem.defaultProps = defaultProps;
