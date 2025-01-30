import { ParsedBlock } from '@wordpress/block-serialization-default-parser';

import {
  ALIGN_ITEMS,
  FLEX_DIRECTION,
  FLEX_WRAP,
  GRID_H_ALIGNMENT,
  GRID_V_ALIGNMENT,
  JUSTIFY,
  TEXT_ALIGN,
  BACKGROUND_POSITION,
  BACKGROUND_REPEAT,
  BACKGROUND_SIZE,
} from '@src/lib/block/class-mappings';
import { BlockAttributes, HtmlDataAttributes } from '@src/lib/block/types';
import { cn } from '@src/lib/helpers/helper';
import { get } from 'lodash';

const tailwindBreakPoints = ['', 'md', 'xl'];

export const getAttributeScreenClasses = (values: (number | string | undefined)[]) => {
  const defaultValueIndex = values.findIndex((value) => !!value);
  if (defaultValueIndex === -1) {
    return [];
  }

  const classes = [];
  const baseClass = values[defaultValueIndex];
  classes.push(baseClass);

  for (let i = defaultValueIndex + 1; i < tailwindBreakPoints.length; i++) {
    const breakpoint = tailwindBreakPoints[i];
    const displayValue = values[i];
    if (displayValue) {
      const breakpointClass = `${breakpoint}:${displayValue}`;
      classes.push(breakpointClass);
    }
  }

  return classes;
};

export const getDisplayClasses = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;

  const {
    displayMobile,
    displayTablet,
    display,

    hideOnMobile,
    hideOnTablet,
    hideOnDesktop,
  } = attribute;

  // set default value to desktop display value if undefined or not set
  const updatedDisplayMobile = displayMobile || display;
  const updatedDisplayTablet = displayTablet || display;

  const dMobile = typeof hideOnMobile !== 'undefined' ? 'hidden' : updatedDisplayMobile;
  const dTablet = typeof hideOnTablet !== 'undefined' ? 'hidden' : updatedDisplayTablet;
  const dDesktop = typeof hideOnDesktop !== 'undefined' ? 'hidden' : display;

  const displayValues = [dMobile, dTablet, dDesktop];

  const classes = getAttributeScreenClasses(displayValues);
  return classes;
};

export const getSizingClasses = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;

  const {
    widthMobile,
    widthTablet,
    width,

    heightMobile,
    heightTablet,
    height,

    minWidthMobile,
    minWidthTablet,
    minWidth,

    minHeightMobile,
    minHeightTablet,
    minHeight,

    maxWidthMobile,
    maxWidthTablet,
    maxWidth,

    maxHeightMobile,
    maxHeightTablet,
    maxHeight,
  } = attribute.sizing || {};

  const widthValues = [
    widthMobile && `w-[${widthMobile}]`,
    widthTablet && `w-[${widthTablet}]`,
    width && `w-[${width}]`,
  ].filter(Boolean);

  const heightValues = [
    heightMobile && `h-[${heightMobile}]`,
    heightTablet && `h-[${heightTablet}]`,
    height && `h-[${height}]`,
  ].filter(Boolean);

  const minWidthValues = [
    minWidthMobile && `min-w-[${minWidthMobile}]`,
    minWidthTablet && `min-w-[${minWidthTablet}]`,
    minWidth && `min-w-[${minWidth}]`,
  ].filter(Boolean);

  const minHeightValues = [
    minHeightMobile && `min-h-[${minHeightMobile}]`,
    minHeightTablet && `min-h-[${minHeightTablet}]`,
    minHeight && `min-h-[${minHeight}]`,
  ].filter(Boolean);

  const maxWidthValues = [
    maxWidthMobile && `max-w-[${maxWidthMobile}]`,
    maxWidthTablet && `max-w-[${maxWidthTablet}]`,
    maxWidth && `max-w-[${maxWidth}]`,
  ].filter(Boolean);

  const maxHeightValues = [
    maxHeightMobile && `max-h-[${maxHeightMobile}]`,
    maxHeightTablet && `max-h-[${maxHeightTablet}]`,
    maxHeight && `max-h-[${maxHeight}]`,
  ].filter(Boolean);

  const classes = [
    ...getAttributeScreenClasses(widthValues),
    ...getAttributeScreenClasses(heightValues),
    ...getAttributeScreenClasses(minWidthValues),
    ...getAttributeScreenClasses(minHeightValues),
    ...getAttributeScreenClasses(maxWidthValues),
    ...getAttributeScreenClasses(maxHeightValues),
  ];

  return classes;
};

export const getSpacingClasses = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;
  const {
    paddingTopMobile,
    paddingTopTablet,
    paddingTop,

    paddingLeftMobile,
    paddingLeftTablet,
    paddingLeft,

    paddingRightMobile,
    paddingRightTablet,
    paddingRight,

    paddingBottomMobile,
    paddingBottomTablet,
    paddingBottom,

    marginTopMobile,
    marginTopTablet,
    marginTop,

    marginLeftMobile,
    marginLeftTablet,
    marginLeft,

    marginRightMobile,
    marginRightTablet,
    marginRight,

    marginBottomMobile,
    marginBottomTablet,
    marginBottom,
  } = attribute.spacing || {};

  const pTop = [
    paddingTopMobile && `pt-[${paddingTopMobile}]`,
    paddingTopTablet && `pt-[${paddingTopTablet}]`,
    paddingTop && `pt-[${paddingTop}]`,
  ].filter(Boolean);

  const pLeft = [
    paddingLeftMobile && `pl-[${paddingLeftMobile}]`,
    paddingLeftTablet && `pl-[${paddingLeftTablet}]`,
    paddingLeft && `pl-[${paddingLeft}]`,
  ].filter(Boolean);

  const pRight = [
    paddingRightMobile && `pr-[${paddingRightMobile}]`,
    paddingRightTablet && `pr-[${paddingRightTablet}]`,
    paddingRight && `pr-[${paddingRight}]`,
  ].filter(Boolean);

  const pBottom = [
    paddingBottomMobile && `pb-[${paddingBottomMobile}]`,
    paddingBottomTablet && `pb-[${paddingBottomTablet}]`,
    paddingBottom && `pb-[${paddingBottom}]`,
  ].filter(Boolean);

  const mTop = [
    marginTopMobile && `mt-[${marginTopMobile}]`,
    marginTopTablet && `mt-[${marginTopTablet}]`,
    marginTop && `mt-[${marginTop}]`,
  ].filter(Boolean);

  const mLeft = [
    marginLeftMobile && `ml-[${marginLeftMobile}]`,
    marginLeftTablet && `ml-[${marginLeftTablet}]`,
    marginLeft && `ml-[${marginLeft}]`,
  ].filter(Boolean);

  const mRight = [
    marginRightMobile && `mr-[${marginRightMobile}]`,
    marginRightTablet && `mr-[${marginRightTablet}]`,
    marginRight && `mr-[${marginRight}]`,
  ].filter(Boolean);

  const mBottom = [
    marginBottomMobile && `mb-[${marginBottomMobile}]`,
    marginBottomTablet && `mb-[${marginBottomTablet}]`,
    marginBottom && `mb-[${marginBottom}]`,
  ].filter(Boolean);

  return [
    ...getAttributeScreenClasses(pTop),
    ...getAttributeScreenClasses(pLeft),
    ...getAttributeScreenClasses(pRight),
    ...getAttributeScreenClasses(pBottom),

    ...getAttributeScreenClasses(mTop),
    ...getAttributeScreenClasses(mLeft),
    ...getAttributeScreenClasses(mRight),
    ...getAttributeScreenClasses(mBottom),
  ];
};

const fontSizeClasses = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
  'x-large': 'text-xl',
  'xx-large': 'text-2xl',
};

export const getTypographyClasses = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;
  const {
    textAlignMobile,
    textAlignTablet,
    textAlign,

    fontSizeMobile,
    fontSizeTablet,
    fontSize,
  } = attribute.typography || {};
  const tAlign = [
    textAlignMobile && TEXT_ALIGN[textAlignMobile],
    textAlignTablet && TEXT_ALIGN[textAlignTablet],
    textAlign && TEXT_ALIGN[textAlign],
  ].filter(Boolean);

  const fSize = [
    fontSizeMobile && `text-[${fontSizeMobile}]`,
    fontSizeTablet && `text-[${fontSizeTablet}]`,
    fontSize && `text-[${fontSize}]`,
  ].filter(Boolean);

  return [...getAttributeScreenClasses(tAlign), ...getAttributeScreenClasses(fSize)];
};

const getJustifyContentClasses = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;
  const { justifyContentMobile, justifyContentTablet, justifyContent } = attribute || {};

  const twJustifyClasses = [
    justifyContentMobile && JUSTIFY[justifyContentMobile],
    justifyContentTablet && JUSTIFY[justifyContentTablet],
    justifyContent && JUSTIFY[justifyContent],
  ].filter(Boolean);

  const justifyContentClasses = getAttributeScreenClasses(twJustifyClasses);

  return [...justifyContentClasses];
};

const getColorClasses = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;
  const { backgroundColor, customTextColor, textColor, submenuTextColor, menuTextColor } =
    attribute;
  const classes = [];

  if (backgroundColor) {
    classes.push(`bg-[${backgroundColor}]`);
  }

  if (customTextColor) {
    classes.push(`text-[${customTextColor}]`);
  }

  if (textColor) {
    classes.push(`text-[${textColor}]`);
  }

  if (submenuTextColor) {
    classes.push(`text-[${submenuTextColor}]`);
  }

  if (menuTextColor) {
    classes.push(`text-[${menuTextColor}]`);
  }

  return classes;
};

const getFlexDirectionClasses = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;
  const { flexDirectionMobile, flexDirectionTablet, flexDirection } = attribute || {};

  const flxDirection = [
    flexDirectionMobile && FLEX_DIRECTION[flexDirectionMobile],
    flexDirectionTablet && FLEX_DIRECTION[flexDirectionTablet],
    flexDirection && FLEX_DIRECTION[flexDirection],
  ].filter(Boolean);

  return [...getAttributeScreenClasses(flxDirection)];
};

const getAlignItemsClasses = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;
  const { alignItemsMobile, alignItemsTablet, alignItems } = attribute || {};

  const aItems = [
    alignItemsMobile && ALIGN_ITEMS[alignItemsMobile] && ALIGN_ITEMS[alignItemsMobile],
    alignItemsTablet && ALIGN_ITEMS[alignItemsTablet] && ALIGN_ITEMS[alignItemsTablet],
    alignItems && ALIGN_ITEMS[alignItems] && ALIGN_ITEMS[alignItems],
  ].filter(Boolean);

  return [...getAttributeScreenClasses(aItems)];
};

const getFlexWrapClasses = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;
  const { flexWrapMobile, flexWrapTablet, flexWrap } = attribute || {};

  const aItems = [
    flexWrapMobile && FLEX_WRAP[flexWrapMobile] && FLEX_WRAP[flexWrapMobile],
    flexWrapTablet && FLEX_WRAP[flexWrapTablet] && FLEX_WRAP[flexWrapTablet],
    flexWrap && FLEX_WRAP[flexWrap] && FLEX_WRAP[flexWrap],
  ].filter(Boolean);

  return [...getAttributeScreenClasses(aItems)];
};

const getGapClasses = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;
  const {
    rowGapMobile,
    rowGapTablet,
    rowGap,

    columnGapMobile,
    columnGapTablet,
    columnGap,

    verticalGapMobile,
    verticalGapTablet,
    verticalGap,

    horizontalGapMobile,
    horizontalGapTablet,
    horizontalGap,
  } = attribute || {};

  const gapYClasses = [
    rowGapMobile && `gap-y-[${rowGapMobile}]`,
    rowGapTablet && `gap-y-[${rowGapTablet}]`,
    rowGap && `gap-y-[${rowGap}]`,
  ].filter(Boolean);

  const vGapClasses = [
    verticalGapMobile && `gap-y-[${verticalGapMobile}]`,
    verticalGapTablet && `gap-y-[${verticalGapTablet}]`,
    verticalGap && `gap-y-[${verticalGap}]`,
  ].filter(Boolean);

  const gapXClasses = [
    columnGapMobile && `gap-x-[${columnGapMobile}]`,
    columnGapTablet && `gap-x-[${columnGapTablet}]`,
    columnGap && `gap-x-[${columnGap}]`,
  ].filter(Boolean);

  const hGapClasses = [
    horizontalGapMobile && `gap-x-[${horizontalGapMobile}]`,
    horizontalGapTablet && `gap-x-[${horizontalGapTablet}]`,
    horizontalGap && `gap-x-[${horizontalGap}]`,
  ].filter(Boolean);

  return [
    ...getAttributeScreenClasses(gapYClasses),
    ...getAttributeScreenClasses(gapXClasses),
    ...getAttributeScreenClasses(vGapClasses),
    ...getAttributeScreenClasses(hGapClasses),
  ];
};

const getOverFlowClasses = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;
  const {
    overflowYMobile,
    overflowYTablet,
    overflowY,

    overflowXMobile,
    overflowXTablet,
    overflowX,
  } = attribute || {};

  const overFlowYClasses = [
    overflowYMobile && `overflow-y-${overflowYMobile}`,
    overflowYTablet && `overflow-y-${overflowYTablet}`,
    overflowY && `overflow-y-${overflowY}`,
  ].filter(Boolean);

  const overFlowXClasses = [
    overflowXMobile && `overflow-x-${overflowXMobile}`,
    overflowXTablet && `overflow-x-${overflowXTablet}`,
    overflowX && `overflow-x-${overflowX}`,
  ].filter(Boolean);

  return [
    ...getAttributeScreenClasses(overFlowYClasses),
    ...getAttributeScreenClasses(overFlowXClasses),
  ];
};

export const getContainerClasses = (block: ParsedBlock) => {
  const classes = [
    ...getDisplayClasses(block),
    ...getFlexDirectionClasses(block),
    ...getAlignItemsClasses(block),
    ...getJustifyContentClasses(block),
    ...getFlexWrapClasses(block),
    ...getGapClasses(block),
    ...getColorClasses(block),
    ...getOverFlowClasses(block),
    ...getSizingClasses(block),
    ...getSpacingClasses(block),
    ...getTypographyClasses(block),
    ...getBackgroundClasses(block),
  ];
  return cn(classes);
};

export const getGridClasses = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;
  const {
    verticalAlignmentMobile,
    verticalAlignmentTablet,
    verticalAlignment,

    horizontalAlignmentMobile,
    horizontalAlignmentTablet,
    horizontalAlignment,
  } = attribute || {};

  const vAlignmentClasses = [
    verticalAlignmentMobile && GRID_V_ALIGNMENT[verticalAlignmentMobile],
    verticalAlignmentTablet && GRID_V_ALIGNMENT[verticalAlignmentTablet],
    verticalAlignment && GRID_V_ALIGNMENT[verticalAlignment],
  ].filter(Boolean);

  const hAlignmentClasses = [
    horizontalAlignmentMobile && GRID_H_ALIGNMENT[horizontalAlignmentMobile],
    horizontalAlignmentTablet && GRID_H_ALIGNMENT[horizontalAlignmentTablet],
    horizontalAlignment && GRID_H_ALIGNMENT[horizontalAlignment],
  ].filter(Boolean);

  const classes = [
    ...getAttributeScreenClasses(vAlignmentClasses),
    ...getAttributeScreenClasses(hAlignmentClasses),
  ];

  return cn(classes);
};

export const getBlockSettings = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;
  const {
    widthMobile,
    widthTablet,
    width,

    heightMobile,
    heightTablet,
    height,
  } = attribute || {};

  const widthValues = [
    widthMobile && `w-[${widthMobile}]`,
    widthTablet && `w-[${widthTablet}]`,
    width && `w-[${width}]`,
  ].filter(Boolean);

  const heightValues = [
    heightMobile && `h-[${heightMobile}]`,
    heightTablet && `h-[${heightTablet}]`,
    height && `h-[${height}]`,
  ].filter(Boolean);

  const classes = [
    ...getAttributeScreenClasses(widthValues),
    ...getAttributeScreenClasses(heightValues),
  ];

  return cn(classes);
};

export const getImageClasses = (block: ParsedBlock) => {
  // const attribute = block.attrs as BlockAttributes;
  const blockSettings = getBlockSettings(block);

  return cn(blockSettings);
};

export const parseToTailwindClasses = (block: ParsedBlock) => {
  return cn(getContainerClasses(block));
};

export const isBlockA = (block: ParsedBlock, blockLabel: string) => {
  const attribute = block.attrs as BlockAttributes;
  if (
    'generateblocks/container' === block.blockName &&
    (blockLabel === attribute.blockLabel || blockLabel === attribute?.metadata?.name)
  ) {
    return true;
  }

  return false;
};

export const isBlockNameA = (block: ParsedBlock, blockLabel: string) => {
  const attribute = block.attrs as BlockAttributes;
  if (blockLabel === attribute?.metadata?.name || blockLabel === attribute.blockLabel) {
    return true;
  }

  return false;
};

export const getBlockName = (block: ParsedBlock) => {
  const { metadata, blockLabel } = block.attrs as BlockAttributes;
  return metadata?.name ?? blockLabel ?? block.blockName;
};

export const getBlockByName = (blocks: ParsedBlock[], name: string) =>
  blocks.find((block) => getBlockName(block) === name);

export const isMobileAccordion = (block: ParsedBlock) => {
  return isBlockA(block, 'MobileAccordion');
};

export const isAccordion = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;

  if ('accordion' === attribute.variantRole) {
    return true;
  }
  return false;
};

export const isAccordionItem = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;

  if ('accordion-item' === attribute.variantRole) {
    return true;
  }
  return false;
};

export const getAttributeValue = (
  attributes: HtmlDataAttributes[],
  attributeName: string
): string | undefined => {
  const attribute = attributes.find((attr) => attr.attribute === attributeName);
  return attribute?.value;
};

export const getMenuItemSpacing = (block: ParsedBlock) => {
  const attribute = block.attrs as BlockAttributes;
  const { menuTextPadding } = attribute || {};

  const classes = [];

  for (const pos in menuTextPadding) {
    const positionValue = get(menuTextPadding, pos, '');
    if (positionValue !== '') {
      classes.push(`p${pos[0]}-[${positionValue}]`);
    }
  }

  return classes;
};

export const getBackgroundClasses = (block: ParsedBlock) => {
  const classes = [];

  const attribute = block.attrs as BlockAttributes;

  if (attribute?.bgImage) {
    const { image } = attribute.bgImage;

    if (image?.url) {
      // eslint-disable-next-line quotes
      classes.push("bg-[url('" + image.url + "')]");
    }
  }

  if (attribute?.bgOptions) {
    const { position, size, repeat } = attribute.bgOptions || {};

    classes.push(BACKGROUND_POSITION[String(position)]);
    classes.push(BACKGROUND_REPEAT[String(repeat)]);
    classes.push(BACKGROUND_SIZE[String(size)]);
  }

  if (attribute?.backgroundColor) {
    classes.push(`bg-[${attribute.backgroundColor}]`);
  }

  if (attribute?.backgroundColorHover) {
    classes.push(`hover:bg-[${attribute.backgroundColorHover}]`);
  }

  return classes;
};

export const getBorderClasses = (block: ParsedBlock): string[] => {
  const classes: string[] = [];
  const tailwindClasses: { [key: string]: boolean } = {};

  const attribute = block.attrs as BlockAttributes;

  if (attribute?.borders) {
    const {
      borderTopRightRadius,
      borderTopLeftRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopColor,
      borderRightColor,
      borderBottomColor,
      borderLeftColor,
      borderTopWidth,
      borderRightWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderTopColorHover,
      borderRightColorHover,
      borderBottomColorHover,
      borderLeftColorHover,
    } = attribute.borders;

    // Border widths
    const borderWidths: { [key: string]: string } = {};
    if (borderTopWidth) {
      borderWidths.top = borderTopWidth;
    }
    if (borderRightWidth) {
      borderWidths.right = borderRightWidth;
    }
    if (borderBottomWidth) {
      borderWidths.bottom = borderBottomWidth;
    }
    if (borderLeftWidth) {
      borderWidths.left = borderLeftWidth;
    }

    const uniqueBorderWidths = [...new Set(Object.values(borderWidths))];

    if (uniqueBorderWidths.length === 1) {
      tailwindClasses[`border-[${uniqueBorderWidths[0]}]`] = true;
    } else if (
      borderWidths.top === borderWidths.bottom &&
      borderWidths.left === borderWidths.right
    ) {
      if (typeof borderWidths.top !== 'undefined')
        tailwindClasses[`border-y-[${borderWidths.top}]`] = true;

      if (typeof borderWidths.left !== 'undefined')
        tailwindClasses[`border-x-[${borderWidths.left}]`] = true;
    } else {
      if (borderWidths.top) {
        tailwindClasses[`border-t-[${borderWidths.top}]`] = true;
      }
      if (borderWidths.right) {
        tailwindClasses[`border-r-[${borderWidths.right}]`] = true;
      }
      if (borderWidths.bottom) {
        tailwindClasses[`border-b-[${borderWidths.bottom}]`] = true;
      }
      if (borderWidths.left) {
        tailwindClasses[`border-l-[${borderWidths.left}]`] = true;
      }
    }

    // Border colors
    const borderColors: { [key: string]: string } = {};
    if (borderTopColor) {
      borderColors.top = borderTopColor;
    }
    if (borderRightColor) {
      borderColors.right = borderRightColor;
    }
    if (borderBottomColor) {
      borderColors.bottom = borderBottomColor;
    }
    if (borderLeftColor) {
      borderColors.left = borderLeftColor;
    }

    const uniqueBorderColors = [...new Set(Object.values(borderColors))];
    if (uniqueBorderColors.length === 1) {
      tailwindClasses[`border-[${uniqueBorderColors[0]}]`] = true;
    } else if (
      borderColors.top === borderColors.bottom &&
      borderColors.left === borderColors.right
    ) {
      if (typeof borderColors.top !== 'undefined')
        tailwindClasses[`border-y-[${borderColors.top}]`] = true;

      if (typeof borderColors.left !== 'undefined')
        tailwindClasses[`border-x-[${borderColors.left}]`] = true;
    } else {
      if (borderColors.top) {
        tailwindClasses[`border-t-[${borderColors.top}]`] = true;
      }
      if (borderColors.right) {
        tailwindClasses[`border-r-[${borderColors.right}]`] = true;
      }
      if (borderColors.bottom) {
        tailwindClasses[`border-b-[${borderColors.bottom}]`] = true;
      }
      if (borderColors.left) {
        tailwindClasses[`border-l-[${borderColors.left}]`] = true;
      }
    }

    // Hover border colors
    const hoverBorderColors: { [key: string]: string } = {};
    if (borderTopColorHover) {
      hoverBorderColors.top = borderTopColorHover;
    }
    if (borderRightColorHover) {
      hoverBorderColors.right = borderRightColorHover;
    }
    if (borderBottomColorHover) {
      hoverBorderColors.bottom = borderBottomColorHover;
    }
    if (borderLeftColorHover) {
      hoverBorderColors.left = borderLeftColorHover;
    }

    const uniqueHoverBorderColors = [...new Set(Object.values(hoverBorderColors))];
    if (uniqueHoverBorderColors.length === 1) {
      tailwindClasses[`hover:border-[${uniqueHoverBorderColors[0]}]`] = true;
    } else if (
      hoverBorderColors.top === hoverBorderColors.bottom &&
      hoverBorderColors.left === hoverBorderColors.right
    ) {
      if (typeof hoverBorderColors.top !== 'undefined')
        tailwindClasses[`hover:border-y-[${hoverBorderColors.top}]`] = true;

      if (typeof hoverBorderColors.left !== 'undefined')
        tailwindClasses[`hover:border-x-[${hoverBorderColors.left}]`] = true;
    } else {
      if (hoverBorderColors.top) {
        tailwindClasses[`hover:border-t-[${hoverBorderColors.top}]`] = true;
      }
      if (hoverBorderColors.right) {
        tailwindClasses[`hover:border-r-[${hoverBorderColors.right}]`] = true;
      }
      if (hoverBorderColors.bottom) {
        tailwindClasses[`hover:border-b-[${hoverBorderColors.bottom}]`] = true;
      }
      if (hoverBorderColors.left) {
        tailwindClasses[`hover:border-l-[${hoverBorderColors.left}]`] = true;
      }
    }

    // Border radius
    const radius: { [key: string]: string } = {};
    if (borderTopLeftRadius) {
      radius.tl = borderTopLeftRadius;
    }
    if (borderTopRightRadius) {
      radius.tr = borderTopRightRadius;
    }
    if (borderBottomLeftRadius) {
      radius.bl = borderBottomLeftRadius;
    }
    if (borderBottomRightRadius) {
      radius.br = borderBottomRightRadius;
    }

    const uniqueRadius = [...new Set(Object.values(radius))];
    if (uniqueRadius.length === 1) {
      tailwindClasses[`rounded-[${uniqueRadius[0]}]`] = true;
    } else if (radius.tl === radius.tr && radius.bl === radius.br) {
      if (typeof radius.tl !== 'undefined') tailwindClasses[`rounded-t-[${radius.tl}]`] = true;
      if (typeof radius.bl !== 'undefined') tailwindClasses[`rounded-b-[${radius.bl}]`] = true;
    } else {
      if (radius.tl) {
        tailwindClasses[`rounded-tl-[${radius.tl}]`] = true;
      }
      if (radius.tr) {
        tailwindClasses[`rounded-tr-[${radius.tr}]`] = true;
      }
      if (radius.bl) {
        tailwindClasses[`rounded-bl-[${radius.bl}]`] = true;
      }
      if (radius.br) {
        tailwindClasses[`rounded-br-[${radius.br}]`] = true;
      }
    }

    return Object.keys(tailwindClasses);
  }

  return classes;
};

export const formatDate = (unixTimestamp: number, format: string): string => {
  const date: Date = new Date(unixTimestamp * 1000);

  // Extract parts of the date
  const day = date.getDate(); // Day of the month
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()]; // Short month name
  const year = date.getFullYear(); // Full year

  // Replace format string with actual date values
  const formattedDate = format
    .replace('M', month)
    .replace('j', day.toString())
    .replace('Y', year.toString());

  return formattedDate;
};

type HTMLAttributes = { attribute: string; value: any }[];

export const convertAttributes = (attrs: { htmlAttributes: HTMLAttributes }) => {
  const convertedHtmlAttrs = attrs?.htmlAttributes.reduce((acc, { attribute, value }) => {
    const camelCaseKey = attribute
      .replace(/^data-/, '')
      .replace(/-([a-z])/g, (_, char) => char.toUpperCase());
    acc[camelCaseKey] = value;
    return acc;
  }, {} as Record<string, any>);

  return Object.assign({}, attrs, convertedHtmlAttrs);
};

export const findBlock = (blocks: ParsedBlock[], blockName: string): ParsedBlock | undefined => {
  if (!blocks) return undefined;
  for (const block of blocks) {
    const name = get(block, 'attrs.metadata.name');
    if (name === blockName) {
      return block;
    } else if (block.innerBlocks) {
      const matchedBlock = findBlock(block.innerBlocks, blockName);
      if (matchedBlock) {
        return matchedBlock;
      }
    }
  }
  return undefined;
};

export const getHeadingTag = (level: number): keyof JSX.IntrinsicElements => {
  const validLevels = [1, 2, 3, 4, 5, 6];
  const selectedLevel = validLevels.includes(level) ? level : 6;
  return `h${selectedLevel}` as keyof JSX.IntrinsicElements;
};
