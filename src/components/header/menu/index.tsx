import cx from 'classnames';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useUpdateEffect } from 'usehooks-ts';

type Props = {
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
  isSubmenu?: boolean;
  children: React.ReactNode;
};

const Menu: FC<Props> = ({ className, isSubmenu, children }) => {
  const { asPath } = useRouter();
  const [isShowing, setIsShowing] = useState(true);

  useUpdateEffect(() => {
    setIsShowing(false);
  }, [asPath]);

  useEffect(() => {
    if (!isShowing) {
      setIsShowing(true);
    }
  }, [isShowing]);

  const classes = cx(className, {
    'flex relative': !isSubmenu,
    'lg:hidden lg:absolute lg:top submenu lg:top-full lg:z-[100] -left-2/3': isSubmenu,
    'lg:group-hover:grid shadow p-4 auto-rows-max': isSubmenu && isShowing,
    // @ts-ignore
    'lg:grid-cols-4 lg:h-[420px] -left-0 w-full': isSubmenu && children?.length > 12,
    // @ts-ignore
    'lg:-ml-4 w-full lg:w-auto': isSubmenu && children?.length < 6,
  });
  return <ul className={classes}>{children}</ul>;
};

Menu.defaultProps = {
  showIcon: false,
  showText: true,
  isSubmenu: false,
};

export default Menu;
