/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const i18n = {
  locales: ['en_US', 'zh-hk'],
  defaultLocale: 'en_US',
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: isProd ? '/campaigns/resortoverview/' : undefined,
  images: {
    domains: [
      'localhost', 
      'https://hkdl-preview.opencreative.com/trade', 
      'https://hkdl-preview.opencreative.com', 
      'https://hkdl-preview.opencreative.com/campaigns/resortoverview',
      'hongkongdisneyland.com'
    ],
    unoptimized: true
  }
}

if(!isProd) nextConfig.i18n = i18n;

module.exports = nextConfig
