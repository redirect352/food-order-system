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
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL ?? 'http',
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOST,
        pathname: process.env.NEXT_PUBLIC_IMAGE_PATHNAME,
      }
    ]
  }
});
