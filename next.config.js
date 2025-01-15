/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'img.clerk.com',
      'img.google.com',
      'images.pexels.com',
      'a0.muscache.com',
      // Add other domains if needed
      // 'example.com',
      // 'images.unsplash.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/7.x/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: '</next/static/media/your-font-file.woff2>; rel=preload; as=font; crossorigin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig