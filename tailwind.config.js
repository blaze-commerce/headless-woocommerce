/* eslint-disable quotes */
module.exports = {
  "content": [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/site.json",
    "./src/styles/styles.css",
    "./public/menu.json",
    "./public/single-product.json",
    "./public/single-post.json",
    "./public/page.json",
    "./public/footer.json",
    "./public/header.json",
    "./public/styles/styles.css",
    "./public/homepage.json",
    "./public/page/*.json"
  ],
  "theme": {
    "extend": {
      "animation": {
        "fade": "fadeIn 1s ease-in-out"
      },
      "keyframes": {
        "fadeIn": {
          "from": {
            "opacity": "0"
          },
          "to": {
            "opacity": "1"
          }
        }
      },
      "colors": {
        "brand-icons": "var(--colors-brandIcons)",
        "brand-primary": "var(--colors-brandPrimary)",
        "brand-secondary": "var(--colors-brandSecondary)",
        "brand-tertiary": "var(--colors-brandTertiary)",
        "brand-font": "var(--colors-brandFont)",
        "brand-links": "var(--colors-brandLinks)",
        "brand-hover-links": "var(--colors-brandHoverLinks)",
        "brand-button-background": "var(--colors-brandButtonBackground)",
        "brand-button-text": "var(--colors-brandButtonText)",
        "brand-hover-button-background": "var(--colors-brandHoverButtonBackground)",
        "brand-hover-button-text": "var(--colors-brandHoverButtonText)",
        "brand-wishlist-background": "var(--colors-brandWishlistBackground)",
        "brand-wishlist-icon-fill": "var(--colors-brandWishlistIconFill)",
        "brand-wishlist-icon-stroke": "var(--colors-brandWishlistIconStroke)",
        "brand-wishlist-hover-background": "var(--colors-brandWishlistHoverBackground)",
        "brand-wishlist-hover-icon-fill": "var(--colors-brandWishlistHoverIconFill)",
        "brand-wishlist-hover-icon-stroke": "var(--colors-brandWishlistHoverIconStroke)",
        "contrast-3": "#655B51",
        "primary": "var(--primary)"
      },
      "fontFamily": {
        "sans": [
          "var(--font-site-font)"
        ]
      }
    }
  },
  "safelist": [
    {
      "pattern": {}
    },
    "w-[25%]",
    "md:w-[25%]",
    "lg:w-[25%]",
    "w-[33%]",
    "md:w-[33%]",
    "lg:w-[33%]",
    "w-[50%]",
    "md:w-[50%]",
    "lg:w-[50%]",
    "w-[66%]",
    "md:w-[66%]",
    "lg:w-[66%]",
    "w-[75%]",
    "md:w-[75%]",
    "lg:w-[75%]",
    "w-[100%]",
    "md:w-[100%]",
    "lg:w-[100%]"
  ],
  "corePlugins": {
    "aspectRatio": false
  },
  "plugins": [
    null,
    {
      "config": {
        "theme": {
          "aspectRatio": {
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10",
            "11": "11",
            "12": "12",
            "13": "13",
            "14": "14",
            "15": "15",
            "16": "16"
          }
        },
        "variants": {
          "aspectRatio": [
            "responsive"
          ]
        }
      }
    }
  ]
};