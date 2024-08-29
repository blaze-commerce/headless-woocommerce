import Menu from '@components/header/menu';
import { MenuItem, MenuItemType } from '@src/components/header/menu/menu-item';

export const NavigationMenu = ({ menuItems }: { menuItems: MenuItemType[] }) => (
  <header className="main-navigation-menu">
    <div className="container mx-auto flex items-stretch">
      <Menu
        className="text-brand-font justify-center gap-2.5 w-full"
        showIcon={true}
        showText={true}
      >
        {menuItems.map((item, index) => {
          const props = {
            showIcon: true,
            showText: true,
            ...item,
          };
          return (
            <MenuItem
              {...props}
              key={index}
              isLast={index === menuItems.length - 1}
              borderless
              className="text-sm"
            />
          );
        })}
      </Menu>
    </div>
  </header>
);
