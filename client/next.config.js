/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/webp'],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/product', destination: '/products/hair-remover', permanent: false },
      { source: '/product/:slug', destination: '/products/:slug', permanent: true },
    ];
  },
};

module.exports = nextConfig;
