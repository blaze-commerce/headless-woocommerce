/* eslint-disable no-console */
import * as fs from 'fs';
import path from 'path';
import wpTheme from '@public/wp-theme.json';
import { slugify } from '@src/scripts/utils';

const defaultColors = [
  {
    color: '#ffffff',
    name: 'background',
    slug: 'custom-background',
  },
  {
    color: '#1a1410',
    name: 'foreground',
    slug: 'custom-foreground',
  },
  {
    color: '#ffffff',
    name: 'card',
    slug: 'custom-card',
  },
  {
    color: '#1a1410',
    name: 'card-foreground',
    slug: 'custom-card-foreground',
  },
  {
    color: '#ffffff',
    name: 'popover',
    slug: 'custom-popover',
  },
  {
    color: '#1a1410',
    name: 'popover-foreground',
    slug: 'custom-popover-foreground',
  },
  {
    color: '#0056d3',
    name: 'primary',
    slug: 'custom-primary',
  },
  {
    color: '#e6f3ff',
    name: 'primary-foreground',
    slug: 'custom-primary-foreground',
  },
  {
    color: '#eff5fa',
    name: 'secondary',
    slug: 'custom-secondary',
  },
  {
    color: '#2e2a28',
    name: 'secondary-foreground',
    slug: 'custom-secondary-foreground',
  },
  {
    color: '#eff5fa',
    name: 'muted',
    slug: 'custom-muted',
  },
  {
    color: '#72767b',
    name: 'muted-foreground',
    slug: 'custom-muted-foreground',
  },
  {
    color: '#eff5fa',
    name: 'accent',
    slug: 'custom-accent',
  },
  {
    color: '#2e2a28',
    name: 'accent-foreground',
    slug: 'custom-accent-foreground',
  },
  {
    color: '#ff4d4d',
    name: 'destructive',
    slug: 'custom-destructive',
  },
  {
    color: '#e6f3ff',
    name: 'destructive-foreground',
    slug: 'custom-destructive-foreground',
  },
  {
    color: '#dbe4f0',
    name: 'border',
    slug: 'custom-border',
  },
  {
    color: '#dbe4f0',
    name: 'input',
    slug: 'custom-input',
  },
  {
    color: '#0056d3',
    name: 'ring',
    slug: 'custom-ring',
  },
];

type ColorItem = {
  color: string;
  name: string;
  slug: string;
};

const mergeColors = (defaultColors: ColorItem[], userColors: ColorItem[]): ColorItem[] => {
  // Create a map from the user's colors for quick lookup by slug
  const userColorMap = new Map(userColors.map((color) => [color.slug, color]));

  // Merge the arrays, overwriting default colors with user colors when slugs match
  const mergedColors = defaultColors.map(
    (defaultColor) => userColorMap.get(defaultColor.slug) || defaultColor
  );

  // Include any additional user colors that are not in the defaultColors
  const extraUserColors = userColors.filter(
    (userColor) => !defaultColors.some((defaultColor) => defaultColor.slug === userColor.slug)
  );

  // Combine both arrays
  return [...mergedColors, ...extraUserColors];
};

export default async function execute() {
  try {
    const wpThemeColors = 'theme' in wpTheme.color.palette ? wpTheme.color.palette.theme : [];
    const wpCustomThemeColors =
      'custom' in wpTheme.color.palette && wpTheme.color.palette && wpTheme.color.palette.custom
        ? (wpTheme.color.palette?.custom as ColorItem[])
        : [];

    const mergedThemeColors = mergeColors(
      wpThemeColors,
      wpCustomThemeColors.map((item) => ({
        ...item,
        slug: item.slug.startsWith('custom-') ? item.slug.replace('custom-', '') : item.slug,
      }))
    );
    const themeColors = mergeColors(defaultColors, mergedThemeColors as ColorItem[]);

    const themeObject = {
      colorVars: themeColors.reduce((acc, { color, name }) => {
        acc[`--${slugify(name)}`] = color;
        return acc;
      }, {} as Record<string, string>),
      colorClasses: themeColors.reduce((acc, { name }) => {
        acc[`${slugify(name)}`] = `var(--${name})`;
        return acc;
      }, {} as Record<string, string>),
      fontFamilies: wpTheme.typography?.fontFamilies?.custom.reduce((acc, { slug }) => {
        acc[`${slug}`] = `var(--font-${slug})`;
        return acc;
      }, {} as Record<string, string>),
    };

    const pageFilePath = path.join(process.cwd(), 'public', 'theme.json');
    fs.writeFileSync(pageFilePath, JSON.stringify(themeObject), {
      encoding: 'utf-8',
    });
  } catch (error) {
    console.error('Error formatting theme config:', error);
  }
}
