/** @type {import('next').NextConfig} */
const nextConfig = {

}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({})

/** module.exports = nextConfig */

module.exports = withBundleAnalyzer({
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/webp'],
    domains: ['strapi.farhienza-haikal.my.id'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapi.farhienza-haikal.my.id',
        port: '443',
        pathname: '/upload/**',
      },
    ],
  },
})

