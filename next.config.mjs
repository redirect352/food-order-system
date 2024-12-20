import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  sassOptions: {
    prependData: `@use "./_mantine.scss" as *;`,
    silenceDeprecations: ['legacy-js-api'],
  },
  images:{
    remotePatterns:[
      process.env.NODE_ENV === 'development' ? {
        protocol: 'http',
        hostname: '192.168.1.100',
        pathname: '/images/**',
      }
      :
      {
        protocol: 'http',
        hostname: '192.168.1.100',
        pathname: '/images/**',
      }
    ]
  }
});
