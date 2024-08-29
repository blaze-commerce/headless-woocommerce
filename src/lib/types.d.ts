declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CHECKOUT_URL: string;
      NEXT_PUBLIC_LIVE_URL: string;
      NEXT_PUBLIC_REVIEW_SERVICE: string;
      NEXT_PUBLIC_STORE_ID: string;
      NEXT_PUBLIC_TYPESENSE_HOST: string;
      NEXT_PUBLIC_WORDPRESS_SITE_URL: string;
      NEXT_PUBLIC_SHOP_NAME: string;
      NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY: string;
      NEXT_PUBLIC_COOKIE_DOMAIN: string;
    }
  }

  interface Window {
    __CLIENT_ENV__: {
      NEXT_PUBLIC_CHECKOUT_URL: string;
      NEXT_PUBLIC_LIVE_URL: string;
      NEXT_PUBLIC_REVIEW_SERVICE: string;
      NEXT_PUBLIC_STORE_ID: string;
      NEXT_PUBLIC_TYPESENSE_HOST: string;
      NEXT_PUBLIC_WORDPRESS_SITE_URL: string;
      NEXT_PUBLIC_SHOP_NAME: string;
      KLAVIYO_PUBLIC_KEY: string;
      NEXT_PUBLIC_COOKIE_DOMAIN: string;
    };
  }
}

export {};
