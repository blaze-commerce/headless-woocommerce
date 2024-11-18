module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/site.json',
    './src/styles/styles.css',
    './public/menu.json',
    './public/product.json',
    './public/footer.json',
    './public/header.json',
    './public/styles/*.css',
    './public/homepage.json',
    './public/page/*.json',
    './public/*.json',
  ],
  theme: {
    container: {
      screens: {
        sm: '540px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1600px',
        '4xl': '1750px',
      },
    },
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
        'brand-primary-light': 'var(--colors-brandPrimary)',
        'brand-second-grey': 'var(--colors-brandPrimary)',
        'sub-title': 'var(--colors-subTitle)',
        'contrast-3': '#655B51',
        'primary': 'var(--primary)',
'primary-foreground': 'var(--primary-foreground)',
'destructive': 'var(--destructive)',
'destructive-foreground': 'var(--destructive-foreground)',
'muted': 'var(--muted)',
'muted-foreground': 'var(--muted-foreground)',
'secondary': 'var(--secondary)',
'secondary-foreground': 'var(--secondary-foreground)',
'border': 'var(--border)'
      },
      fontFamily: {
        'roboto': ['var(--font-roboto)'],
'play': ['var(--font-play)'],
'primary': ['var(--font-roboto)'],
'secondary': ['var(--font-play)']
      },
    },
  },
  safelist: [
    {
      pattern: /(mb|mt|ml|mr)-\d*/,
    },
    'w-[25%]','md:w-[25%]','lg:w-[25%]','w-[33%]','md:w-[33%]','lg:w-[33%]','w-[50%]','md:w-[50%]','lg:w-[50%]','w-[66%]','md:w-[66%]','lg:w-[66%]','w-[75%]','md:w-[75%]','lg:w-[75%]','w-[100%]','md:w-[100%]','lg:w-[100%]'
  ],
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
};