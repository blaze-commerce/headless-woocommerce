import { NavbarItem } from '@src/components/navbar/new/navbar-item';
import { NavbarLink } from '@src/components/navbar/new/navbar-link';
import { NavbarSubmenuItems } from '@src/components/navbar/new/navbar-submenu-items';
import { InfoIcon } from '@src/components/svg/info';
import { getDisplayTypeValues, getMenuById } from '@src/lib/helpers/menu';
import { CourtesyNav as CourtesyNavType } from '@src/models/settings/header';

type Props = CourtesyNavType;

export const CourtesyNav: React.FC<Props> = ({ enabled, displayType, label, menuId, hasIcon }) => {
  if (!enabled) return null;

  const { showText, showIcon } = getDisplayTypeValues(displayType);

  const mainMenu = getMenuById(parseInt(menuId as string, 10));

  if (!mainMenu) return null;

  return (
    <NavbarItem>
      <NavbarLink
        href="#"
        className="has-divider-right inline-flex items-center gap-2 h-full navbar-submenu-hover"
      >
        {showIcon && hasIcon && <InfoIcon className="header-link-fill" />}
        {showText && <span className="hidden lg:inline-block">{label}</span>}

        <NavbarSubmenuItems
          menu={mainMenu}
          className="z-[30] uppercase"
        />
      </NavbarLink>
    </NavbarItem>
  );
};
