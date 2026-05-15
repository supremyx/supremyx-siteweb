/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: true,
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Powered-By',
            value: 'Next.js',
          },
        ],
      },
    ]
  },
}

export default nextConfig
