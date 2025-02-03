import { MenuItemType } from '@src/components/header/menu/menu-item';
import { Cart } from '@models/settings/cart';
import { Footer } from '@models/settings/footer';
import { Homepage } from '@models/settings/homepage';
import { ProductSettings } from '@models/settings/product';
import { Search } from '@models/settings/search';
import { Shop } from '@models/settings/shop';
import { getMenuById } from '@src/lib/helpers/menu';
import { Header } from '@src/models/settings/header';
import { Store } from '@src/models/settings/store';
import { ContentBlock } from '@src/types';

type Colors = Partial<{
  background: Partial<{
    primary: string;
    secondary: string;
    tertiary: string;
    icons?: string;
  }>;
  button: Partial<{
    background: string;
    text: string;
    hoverBackground: string;
    hoverText: string;
  }>;
  wishlist: Partial<{
    background: string;
    iconFill: string;
    iconStroke: string;
    hoverBackground: string;
    hoverIconFill: string;
    hoverIconStroke: string;
  }>;
}>;

type FontProperties = Partial<{
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  fontColor: string;
  hoverFontColor: string;
}>;

type Fonts = Partial<{
  siteFont: FontProperties;
  link: FontProperties;
}>;

export type SettingProps = Partial<{
  store: Store;
  colors: Colors;
  fonts: Fonts;
  header: Header;
  product: ProductSettings;
  shop: Shop;
  cart: Cart;
  search: Search;
  footer: Footer;
  homepage: Homepage;
  siteMessageTopHeader: ContentBlock[];
  siteMessage: ContentBlock[];
  footerContentAfter: ContentBlock[];
  cookieDomain: string;
  showFreeShippingBanner: boolean;
  showFreeShippingMinicartComponent: boolean;
  showVariantAsSeparateProductCards: boolean;
}>;

export class Settings {
  readonly store?: Store;
  readonly colors?: Colors;
  readonly fonts?: Fonts;
  readonly header?: Header;
  readonly product?: ProductSettings;
  readonly shop?: Shop;
  readonly cart?: Cart;
  readonly search?: Search;
  readonly footer?: Footer;
  readonly homepage?: Homepage;
  readonly siteMessageTopHeader?: ContentBlock[];
  readonly siteMessage?: ContentBlock[];
  readonly footerContentAfter?: ContentBlock[];
  readonly cookieDomain?: string;
  readonly props?: SettingProps;

  constructor(props: SettingProps) {
    this.store = props.store;
    this.colors = props.colors;
    this.fonts = props.fonts;
    this.header = props.header;
    this.product = props.product;
    this.shop = props.shop;
    this.cart = props.cart;
    this.search = props.search;
    this.footer = props.footer;
    this.homepage = props.homepage;
    this.siteMessageTopHeader = props.siteMessageTopHeader;
    this.siteMessage = props.siteMessage;
    this.footerContentAfter = props.footerContentAfter;
    this.cookieDomain = props.cookieDomain;
    this.props = props;
  }

  get courtesyNavItems() {
    let items: MenuItemType[] = [];
    if (
      !this.header ||
      !this.header.options ||
      !this.header.options.courtesyNav ||
      !this.header.options.courtesyNav.enabled
    )
      return items;

    const mainMenu = getMenuById(parseInt(this.header.options.courtesyNav.menuId as string, 10));
    if (!mainMenu) return items;

    items = mainMenu.items.map((menu) => ({ href: menu.url, text: menu.title }));
    return items;
  }

  get navigationMenuItems() {
    let items: MenuItemType[] = [];
    if (!this.header) return items;

    const mainMenu = getMenuById(parseInt(this.header.mainMenu.menuId as string, 10));
    if (!mainMenu) return items;

    items = Object.values(mainMenu.items).map((menu) => {
      const childMenus = menu.children || [];
      const hasChildMenus = childMenus.length > 0 || false;
      const isMegaMenu = !!childMenus.find((menu) => menu.type === 'megamenu');
      const mappedChildMenus = childMenus.map((childMenu) => ({
        href: childMenu.url,
        label: childMenu.title,
      }));
      return {
        href: menu.url,
        label: menu.title,
        isSubmenu: hasChildMenus,
        isMegaMenu,
        subMenuItems: hasChildMenus && !isMegaMenu ? mappedChildMenus : undefined,
        megaMenuItems: isMegaMenu ? childMenus : undefined,
      };
    });

    return items;
  }

  get subMenuItems() {
    const items: MenuItemType[] = [
      { href: '/', label: 'Link 1' },
      { href: '/', label: 'Link 2' },
      { href: '/', label: 'Link 3' },
      { href: '/', label: 'Link 4' },
      { href: '/', label: 'Link 5' },
      { href: '/', label: 'Link 6' },
    ];

    return items;
  }

  get productCardShapeClasses() {
    switch (this.shop?.layout.productCards?.imageLayout) {
      case 'portrait':
        return 'product-card-portrait';
      case 'square':
      default:
        return 'product-card-square';
    }
  }

  get productCardAspectRatioClasses() {
    switch (this.shop?.layout.productCards?.imageLayout) {
      case 'portrait':
        return 'aspect-h-[1.45]';
      case 'square':
      default:
        return 'aspect-h-1';
    }
  }

  get productCardGapClasses() {
    switch (this.shop?.layout.productCards?.imageLayout) {
      case 'portrait':
        return 'gap-1.5';
      case 'square':
      default:
        return 'gap-3';
    }
  }

  get productGroupHeaderClasses() {
    switch (this.product?.layout?.recentlyViewedAndCrossSellAlignment) {
      case 'center':
        return 'text-center';
      case 'left':
      default:
        return 'text-left';
    }
  }

  get recentlyViewedAndCrossSellsHeaderStyle() {
    return {
      fontWeight: this?.product?.font?.tabs?.weight as string,
      fontSize: this?.product?.font?.tabs?.size as string,
    };
  }

  get isTaxExclusive() {
    return this?.store?.woocommerceCalcTaxes && !this.store?.woocommercePricesIncludeTax;
  }

  get isMobileBannerSquare() {
    return this?.homepage?.layout?.mobileBanner?.orientation === 'square';
  }

  get isAdditionalWarningMessageEnabled() {
    return this?.product?.features?.additionalWarningMessage?.enabled;
  }

  get isHeaderSticky() {
    return this?.header?.options?.isSticky;
  }

  get buttonColor() {
    return {
      background: this?.colors?.button?.background,
      text: this?.colors?.button?.text,
    };
  }

  get buttonHoverColor() {
    return {
      background: this?.colors?.button?.hoverBackground,
      text: this?.colors?.button?.hoverText,
    };
  }

  get wishlistColor() {
    return {
      background: this?.colors?.wishlist?.background,
      iconFill: this?.colors?.wishlist?.iconFill,
      iconStroke: this?.colors?.wishlist?.iconStroke,
      hoverBackground: this?.colors?.wishlist?.hoverBackground,
      hoverIconFill: this?.colors?.wishlist?.hoverIconFill,
      hoverIconStroke: this?.colors?.wishlist?.hoverIconStroke,
    };
  }

  get priceDisplaySuffix() {
    return this?.store?.woocommerceTaxSetup?.priceDisplaySuffix;
  }

  get reviewService() {
    return this.props?.store?.reviewService;
  }

  get reviewData() {
    if (!this.reviewService) return null;

    switch (this.reviewService) {
      case 'business-reviews-bundle':
        return this.props?.store?.review?.businessReviewsBundleSettings;
        break;
    }
  }

  static build(props: SettingProps) {
    return new Settings(props);
  }
}
