/* eslint-disable no-console */
import * as fs from 'fs';
import path from 'path';
import theme from '@public/theme.json';

const gridItemWidths = ['25', '33', '50', '66', '75', '100']; // this is what is provider by generate press block settins GRID ITEM WIDTH (%)
const gridItemWidthsClasses = gridItemWidths
  .flatMap((i) => [`w-[${i}%]`, `md:w-[${i}%]`, `lg:w-[${i}%]`])
  .map((item) => `'${item}'`)
  .join(',');

const safeListPattern = /(mb|mt|ml|mr)-\d*/;

const themeColors = Object.entries(theme.colorClasses)
  .map(([key, value]) => `'${key}': '${value}'`)
  .join(',\n');

const tailwindConfig = `module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/site.json',
    './src/styles/styles.css',
    './public/menu.json',
    './public/single-product.json',
    './public/single-post.json',
    './public/page.json',
    './public/footer.json',
    './public/header.json',
    './public/styles/styles.css',
    './public/homepage.json',
    './public/page/*.json',
  ],
  theme: {
    extend: {
      animation: {
        fade: 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
      },
      colors: {
        'brand-icons': 'var(--colors-brandIcons)',
        'brand-primary': 'var(--colors-brandPrimary)',
        'brand-secondary': 'var(--colors-brandSecondary)',
        'brand-tertiary': 'var(--colors-brandTertiary)',
        'brand-font': 'var(--colors-brandFont)',
        'brand-links': 'var(--colors-brandLinks)',
        'brand-hover-links': 'var(--colors-brandHoverLinks)',
        'brand-button-background': 'var(--colors-brandButtonBackground)',
        'brand-button-text': 'var(--colors-brandButtonText)',
        'brand-hover-button-background': 'var(--colors-brandHoverButtonBackground)',
        'brand-hover-button-text': 'var(--colors-brandHoverButtonText)',
        'brand-wishlist-background': 'var(--colors-brandWishlistBackground)',
        'brand-wishlist-icon-fill': 'var(--colors-brandWishlistIconFill)',
        'brand-wishlist-icon-stroke': 'var(--colors-brandWishlistIconStroke)',
        'brand-wishlist-hover-background': 'var(--colors-brandWishlistHoverBackground)',
        'brand-wishlist-hover-icon-fill': 'var(--colors-brandWishlistHoverIconFill)',
        'brand-wishlist-hover-icon-stroke': 'var(--colors-brandWishlistHoverIconStroke)',
        'contrast-3': '#655B51',
        ${themeColors}
      },
      fontFamily: {
        sans: ['var(--font-site-font)'],
      },
    },
  },
  safelist: [
    {
      pattern: ${safeListPattern},
    },
    ${gridItemWidthsClasses}
  ],
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
};`;

export default async function execute() {
  try {
    console.log('recreating/update tailwind config');
    const tailwindPath = path.join(process.cwd(), 'tailwind.config.js');
    fs.writeFileSync(tailwindPath, `${tailwindConfig}`, {
      encoding: 'utf-8',
    });
  } catch (error) {
    console.error('Error recreating/update tailwind config:', error);
  }
}
