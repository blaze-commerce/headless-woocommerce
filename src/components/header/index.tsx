import { DesktopLayout1 } from '@src/components/header/layout/desktop-layout-1';
import { DesktopLayout2 } from '@src/components/header/layout/desktop-layout-2';
import { MobileLayout1 } from '@src/components/header/layout/mobile-layout-1';
import { MobileLayout2 } from '@src/components/header/layout/mobile-layout-2';
import { MobileLayout3 } from '@src/components/header/layout/mobile-layout-3';
import { MobileLayout4 } from '@src/components/header/layout/mobile-layout-4';
import { MobileLayout5 } from '@src/components/header/layout/mobile-layout-5';
import { useSiteContext } from '@src/context/site-context';

export const Header = () => {
  const { settings } = useSiteContext();

  if (!settings) return null;

  let headerComponent;
  let headerMobileComponent;

  if (!settings?.header) return null;

  const { layout } = settings.header;

  switch (layout.desktop) {
    case '1':
      headerComponent = <DesktopLayout1 />;
      break;
    case '2':
      headerComponent = <DesktopLayout2 />;
      break;
    default:
      headerComponent = null;
      break;
  }
  switch (layout.mobile) {
    case '1':
      headerMobileComponent = <MobileLayout1 />;
      break;
    case '2':
      headerMobileComponent = <MobileLayout2 />;
      break;
    case '3':
      headerMobileComponent = <MobileLayout3 />;
      break;
    case '4':
      headerMobileComponent = <MobileLayout4 />;
      break;
    case '5':
      headerMobileComponent = <MobileLayout5 />;
      break;
    default:
      headerMobileComponent = null;
      break;
  }
  return (
    <>
      {headerComponent}
      {headerMobileComponent}
    </>
  );
};
