import { useIsClient } from 'usehooks-ts';

import { NavbarItem } from '@src/components/navbar/new/navbar-item';
import { PrefetchLink } from '@src/components/common/prefetch-link';
import { TypesenseMenu } from '@src/lib/helpers/menu';
import { cn, makeLinkRelative } from '@src/lib/helpers/helper';

type Props = {
  menu: TypesenseMenu;
  className?: string;
};
export const NavbarSubmenuItems: React.FC<Props> = ({ className, menu }) => {
  const isClient = useIsClient();
  if (!isClient) {
    return null; // or a loading spinner, etc.
  }

  return (
    <ul className={cn('navbar-submenu shadow', className)}>
      {menu.items.map(
        (item) =>
          item.url && (
            <NavbarItem key={item.url}>
              <PrefetchLink
                unstyled
                className="p-4 cursor-pointer w-full link flex items-center text-black"
                href={makeLinkRelative(item.url)}
              >
                {item.title}
              </PrefetchLink>
            </NavbarItem>
          )
      )}
    </ul>
  );
};
