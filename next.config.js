let path;

if (process.env.NODE_ENV === 'development' && !process.env.VERCEL) {
  path = require('path');
}

/** @type {import('next').NextConfig} */
const envParsedURL = new URL(process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL);

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
      },
      {
        protocol: 'http',
        hostname: '**',
        port: '',
      },
      {
        protocol: envParsedURL.protocol.replace(':', ''),
        hostname: envParsedURL.hostname,
        port: envParsedURL.port,
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/wp-content/uploads/:path*',
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-content/uploads/:path*`,
        permanent: true,
      },
      {
        source: '/wp-content/plugins/:path*',
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-content/plugins/:path*`,
        permanent: true,
      },
      {
        source: '/my-account/:path*',
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/my-account/:path*`,
        permanent: true,
      },
      {
        source: '/wp-json/:path*',
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/:path*`,
        permanent: true,
      },
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'wc-ajax',
          },
        ],
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/:path*`,
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // These rewrites are checked after headers/redirects
        // and before all files including _next/public files which
        // allows overriding page files
        {
          source: '/:path*',
          destination: '/:path*',
        },
        {
          source: '/robots.txt',
          destination: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/robots.txt`,
        },
      ],
      afterFiles: [
        // These rewrites are checked after pages/public files
        // are checked but before dynamic routes
      ],
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: '/:path*',
          destination: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/:path*/`,
        },
      ],
    };
  },
  async headers() {
    return [
      {
        //cache all images, fonts, etc. in the public folder
        //Note: Next.js default is 'public, max-age=0' which cases many reloads on Safari!
        //Note: we use version hashes and therefore can use immutable
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|mp4|ttf|otf|woff|woff2)',

        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  staticPageGenerationTimeout: 60 * 5,
  trailingSlash: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    if (process.env.NODE_ENV === 'development' && !process.env.VERCEL) {
      config.cache = false; // Disable cache when in local development
      config.watchOptions = {
        ignored: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, '.next/cache'),
          path.resolve(__dirname, 'public'),
        ],
      };
    }
    return config;
  },
};

module.exports = nextConfig;
