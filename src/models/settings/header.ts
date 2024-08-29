import { Image } from '@models/product/types';

type FontStyle = Partial<{
  weight: string | null;
  size: string | null;
}>;

type ColorOptions = Partial<{
  color: string | null;
  background: string | null;
  hoverColor: string | null;
  hoverBackground: string | null;
}>;

type Option = Partial<{
  enabled: boolean;
  label: string;
  displayType: string;
  hasIcon: boolean | null;
  hasChevronDownIcon: boolean | null;
}>;

export type CourtesyNav = Option & { enabled: boolean; menuId: string | null };

type Options = {
  isSticky: boolean;
  phoneNumber: Option & { enabled: boolean; value: string | null; valueDisplayText: string | null };
  email?: Option & Partial<{ enabled: boolean; value: string }>;
  courtesyNav: CourtesyNav;
  myAccount: Option;
  wishlist: Option;
  cart: Option;
};

type CustomColors = Partial<{
  enabled: boolean;
  background: Partial<{
    primary?: string | null;
    tertiary?: string | null;
    secondary?: string | null;
  }>;
  link: ColorOptions;
  mainMenu: ColorOptions;
}>;

type Layouts = {
  cartIcon?: string;
  cartIconFilledColor?: string;
  cartIconLayout?: string;
  desktop: string;
  mobile: string;
  navbarSeparator?: boolean;
  navIconSeparator?: boolean;
};

type TopNavOrder = {
  phoneNumber: string;
  courtesyNavigation: string;
  myAccount: string;
  wishlist: string;
  cart: string;
  contactUs: string;
};

export type Header = {
  layout: Layouts;
  logo: {
    desktop: Partial<Image>;
    mobile: Partial<Image>;
  };
  options: Options;
  mainMenu: Partial<{
    menuId: string | null;
    font: FontStyle;
    textTransform: string;
    backgroundColor: string;
    subMenuBackgroundColor: string;
  }>;
  customColors: CustomColors;
  topNavOrder: TopNavOrder;
};
