import { render, screen } from '@testing-library/react';
import * as nextRouter from 'next/router';

import { MegaMenu } from '@src/components/header/menu/mega-menu';
import { MegaMenu as MegaMenuType } from '@src/lib/helpers/menu';

// @ts-ignore
nextRouter.useRouter = jest.fn();
// @ts-ignore
nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));

const menuItem = {
  id: '1',
  type: 'item',
  title: 'Menu 1',
  url: '/test/url',
};
const megaMenuRow = {
  meta: {},
  columns: [
    { meta: {}, items: [menuItem, menuItem, menuItem] },
    { meta: {}, items: [menuItem, menuItem, menuItem] },
    { meta: {}, items: [menuItem, menuItem, menuItem] },
  ],
  type: 'megamenu',
};
const megaMenuItems: MegaMenuType[] = [megaMenuRow];

describe('<MegaMenu />', () => {
  describe('rows', () => {
    it('should render 1 row', () => {
      render(<MegaMenu megaMenuItems={megaMenuItems} />);
      expect(screen.getAllByRole('mega-menu-row')).toHaveLength(1);
    });

    it('should render 2 rows', () => {
      const newMegaMenuItems = [megaMenuRow, megaMenuRow];
      render(<MegaMenu megaMenuItems={newMegaMenuItems} />);
      expect(screen.getAllByRole('mega-menu-row')).toHaveLength(2);
    });
  });

  describe('rows', () => {
    it('should render 3 columns', () => {
      render(<MegaMenu megaMenuItems={megaMenuItems} />);
      expect(screen.getAllByRole('mega-menu-column')).toHaveLength(3);
    });
  });
});
