import { ClassValue } from 'clsx';

export interface HtmlDataAttributes {
  attribute?: string;
  value?: string;
}

/**
 * We'll have to use this on attr.sizing and also in the main BlockAttribute because there are block settings for sizing
 */
export interface SizeAttributes {
  widthMobile?: string;
  widthTablet?: string;
  width?: string;

  heightMobile?: string;
  heightTablet?: string;
  height?: string;

  minWidthMobile?: string;
  minWidthTablet?: string;
  minWidth?: string;

  minHeightMobile?: string;
  minHeightTablet?: string;
  minHeight?: string;

  maxWidthMobile?: string;
  maxWidthTablet?: string;
  maxWidth?: string;

  maxHeightMobile?: string;
  maxHeightTablet?: string;
  maxHeight?: string;
}

export interface TypographyAttributes {
  textAlignMobile?: string;
  textAlignTablet?: string;
  textAlign?: string;

  fontSizeMobile?: string;
  fontSizeTablet?: string;
  fontSize?: string;
}

export interface GridBlockAttributes {
  horizontalGapMobile?: number;
  horizontalGapTablet?: number;
  horizontalGap?: number;

  verticalGapMobile?: number;
  verticalGapTablet?: number;
  verticalGap?: number;

  verticalAlignmentMobile?: string;
  verticalAlignmentTablet?: string;
  verticalAlignment?: string;

  horizontalAlignmentMobile?: string;
  horizontalAlignmentTablet?: string;
  horizontalAlignment?: string;
}

export interface ObjectFitAttributes {
  objectFitMobile?: string;
  objectFitTablet?: string;
  objectFit?: string;
}

export interface DisplayAttributes {
  display?: string;
  displayTablet?: string;
  displayMobile?: string;

  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export interface FlexDirectionAttributes {
  flexDirection?: string;
  flexDirectionTablet?: string;
  flexDirectionMobile?: string;
}

export interface FlexWrapAttributes {
  flexWrap?: string;
  flexWrapTablet?: string;
  flexWrapMobile?: string;
}

export interface AlignItemsAttributes {
  alignItems?: string;
  alignItemsTablet?: string;
  alignItemsMobile?: string;
}

export interface JustifyContentAttributes {
  justifyContent?: string;
  justifyContentTablet?: string;
  justifyContentMobile?: string;
}

export interface ColumnGapAttributes {
  columnGap?: string;
  columnGapTablet?: string;
  columnGapMobile?: string;
}

export interface RowGapAttributes {
  rowGap?: string;
  rowGapTablet?: string;
  rowGapMobile?: string;
}

export interface PositionAttributes {
  position?: string;
  positionTablet?: string;
  positionMobile?: string;
}

export interface OverFlowXAttributes {
  overflowXMobile?: string;
  overflowXTablet?: string;
  overflowX?: string;
}

export interface OverFlowYAttributes {
  overflowYMobile?: string;
  overflowYTablet?: string;
  overflowY?: string;
}

export interface ZIndexAttributes {
  zindexMobile?: number;
  zindexTablet?: number;
  zindex?: number;
}

export interface SpacingAttributes {
  paddingTopMobile?: string;
  paddingLeftMobile?: string;
  paddingRightMobile?: string;
  paddingBottomMobile?: string;
  marginTopMobile?: string;
  marginLeftMobile?: string;
  marginRightMobile?: string;
  marginBottomMobile?: string;
  paddingTopTablet?: string;
  paddingBottomTablet?: string;
  paddingLeftTablet?: string;
  paddingRightTablet?: string;
  marginTopTablet?: string;
  marginBottomTablet?: string;
  marginLeftTablet?: string;
  marginRightTablet?: string;
  paddingTop?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingBottom?: string;
  marginTop?: string;
  marginLeft?: string;
  marginRight?: string;
  marginBottom?: string;
}

export interface BordersAttributes {
  borderTopWidthMobile?: string;
  borderTopStyleMobile?: string;
  borderBottomWidthMobile?: string;
  borderBottomStyleMobile?: string;
  borderRightWidthMobile?: string;
  borderRightStyleMobile?: string;
  borderLeftWidthMobile?: string;
  borderLeftStyleMobile?: string;
  borderTopLeftRadiusMobile?: string;
  borderTopRightRadiusMobile?: string;
  borderBottomLeftRadiusMobile?: string;
  borderBottomRightRadiusMobile?: string;
  borderTopLeftRadiusTablet?: string;
  borderTopRightRadiusTablet?: string;
  borderBottomLeftRadiusTablet?: string;
  borderBottomRightRadiusTablet?: string;
  borderTopWidth?: string;
  borderTopStyle?: string;
  borderRightWidth?: string;
  borderRightStyle?: string;
  borderBottomWidth?: string;
  borderBottomStyle?: string;
  borderLeftWidth?: string;
  borderLeftStyle?: string;
  borderTopColor?: string;
  borderRightColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderTopColorHover?: string;
  borderRightColorHover?: string;
  borderBottomColorHover?: string;
  borderLeftColorHover?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
}

export interface GravityFormAttributes {
  formId?: string; // The gravity form id
  title?: boolean; // Wether to hide or show the title
  description?: boolean; // Wether hide or show the description
  ajax?: boolean; // wether to submit the form via ajax but we will do ajax via react for the moment
  inputPrimaryColor?: string; //'#204ce5';
  fieldValues?: string;
  metadata?: { name: string };
}

export interface GradientAttributes {
  gradient?: boolean;
  gradientDirection?: number;
  gradientColorOne?: string;
  gradientColorOneOpacity?: number;

  gradientColorTwo?: string;
  gradientColorTwoOpacity?: number;
}

export interface BackgroundAttributes {
  bgImage?: {
    image?: {
      url?: string;
      height?: number;
      width?: number;
      orientation?: string;
    };
  };

  bgOptions?: {
    opacity?: number;
    overlay?: boolean;
    position?: string;
    size?: string;
    repeat?: string;
  };

  backgroundColor?: string;
  backgroundColorHover?: string;
}

export interface BasicBlockAttributes {
  uniqueId?: string;
  blockLabel?: string;
  align?: string;
  className?: string;
  isDynamic?: boolean;
  blockVersion?: number;
}

export interface PostDateAttributes {
  format?: string;
}

export interface GroupAttributes {
  layout?: {
    flexWrap?: string;
    type: 'constrained' | 'flex' | 'grid';
    verticalAlignment?: string;
    justifyContent?: 'center' | 'left' | 'right' | 'space-between';
    orientation?: 'horizontal' | 'vertical';
  };
}

export interface CoverAttributes {
  alt?: string;
  contentPosition?: string;
  customOverlayColor?: string;
  overlayColor?: string;
  dimRatio?: number;
  id?: number;
  isDark?: boolean;
  isUserOverlayColor?: boolean;
  sizeSlug?: string;
  url?: string;
}

export interface ListItemsAttributes {
  ordered?: boolean;
}

export type WoocommerceStockStatus = 'instock' | 'outofstock' | 'onbackorder';
export interface WooCommerceProductCollectionAttributes {
  query?: {
    taxQuery: {
      product_cat: number[];
    };
    woocommerceOnSale: boolean;
    perPage: number;
    woocommerceStockStatus: WoocommerceStockStatus[];
    search: string;
    order: 'asc' | 'desc';
    orderBy: 'title' | 'date' | 'price' | 'sales' | 'rating' | 'menu_order' | 'random';
    featured?: boolean;
  };
}

export interface BlockAttributes
  extends BasicBlockAttributes,
    GridBlockAttributes,
    SizeAttributes,
    ObjectFitAttributes,
    DisplayAttributes,
    FlexDirectionAttributes,
    FlexWrapAttributes,
    AlignItemsAttributes,
    ColumnGapAttributes,
    OverFlowXAttributes,
    OverFlowYAttributes,
    ZIndexAttributes,
    GravityFormAttributes,
    JustifyContentAttributes,
    RowGapAttributes,
    GradientAttributes,
    BackgroundAttributes,
    PostDateAttributes,
    GroupAttributes,
    CoverAttributes,
    ListItemsAttributes,
    WooCommerceProductCollectionAttributes {
  variantRole?: string;

  textColor?: string;
  typography?: TypographyAttributes;

  sizing?: SizeAttributes;
  htmlAttributes?: HtmlDataAttributes[];
  spacing?: SpacingAttributes;
  borders?: BordersAttributes;

  backgroundColor?: string;
  advBackgrounds?: {
    target: string;
    device: string;
    state: string;
  }[];
  menuTextPadding?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  submenuTextPadding?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  menuCentered?: boolean;
  menuFullWidth?: boolean;
  [key: string]: ClassValue | { target: string; device: string; state: string }[] | string;
}

export interface WooCommerceBlockAttributes extends BasicBlockAttributes {
  textColor?: string;
  fontSize?: string;
  style?: { [key: string]: string };
}
