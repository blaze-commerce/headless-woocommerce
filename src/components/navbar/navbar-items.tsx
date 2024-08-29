import cx from 'classnames';

type NavbarItemsProps = {
  children: React.ReactNode;
  position: 'left' | 'center' | 'right';
  isSubmenu: boolean;
  isVertical: boolean;
  className?: string;
  style?: { [key: string]: string };
};

const defaultProps = {
  position: 'left',
  isSubmenu: false,
  isVertical: false,
};

export const NavbarItems = ({
  children,
  position,
  isSubmenu,
  isVertical,
  className,
  style,
}: NavbarItemsProps) => {
  const classes = cx(className, {
    'ml-auto': position === 'right',
    'mr-4 space-x-2.5': position === 'left' && !isVertical,
    'block text-center absolute inset-x-0 py-4': position === 'center',
    'z-[1]': position !== 'center',
    flex: position !== 'center',
    'navbar-submenu min-w-[240px]': isSubmenu,
    'vertical-submenu': isVertical,
  });
  return (
    <ul
      className={classes}
      style={style}
    >
      {children}
    </ul>
  );
};

NavbarItems.defaultProps = defaultProps;
